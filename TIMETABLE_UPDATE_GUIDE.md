# Ferry Timetable Updater Guide

## Overview

The `timetable-updater.js` script helps you safely update ferry timetables from PDF source data. It:

1. **Parses** timetable text data
2. **Validates** captured times
3. **Creates backups** before any changes
4. **Shows diffs** for manual review

## Workflow

### Step 1: Extract Timetable from PDF

Download the latest PDF from SFK:
- **F1 (Fördelinie)**: https://www.sfk-kiel.de/resources/persistent/.../F1%20Sommer%20Fahrgast.pdf
- **F2 (Schwentinelinie)**: Link from their Schwentine page

### Step 2: Convert PDF to Text

**Option A: Using Online OCR** (Recommended for quick updates)
1. Go to https://www.onlineocr.net/
2. Upload PDF
3. Select output as plain text
4. Download and save as `timetable-raw.txt`

**Option B: Command Line with Tesseract**
```bash
# macOS
brew install tesseract
pdftotext F1_Sommer.pdf timetable-raw.txt

# Linux
apt-get install tesseract-ocr
pdftotext F1_Sommer.pdf timetable-raw.txt
```

### Step 3: Format Text Data

Edit the extracted text to match this format:

```
Station Name          08:55  09:40  10:40  12:05  13:30  14:40  15:15  16:30  18:34
Seegarten            09:02  09:47  10:47  12:12  13:37  14:47  15:22  16:37  18:41
Reventlou            09:10  09:55  10:55  12:20  13:45  14:55  15:30  16:45  18:49
Mönkeberg            09:22  10:07  11:07  12:32  13:57  15:07  15:42  16:57  19:01
Möltenort            09:35  10:20  11:20  12:45  14:10  15:20  15:55  17:10  19:14
Friedrichsort        09:44  11:29  12:54  14:19  15:29  16:04  17:19  19:23
Falkenstein          09:56  10:41  11:41  13:06  14:31  15:41  16:16  19:35
Laboe                10:04  10:49  11:49  13:14  14:39  15:49  16:24  17:35  19:43
```

**Pro tips:**
- Use tabs or multiple spaces to separate columns
- Include times only (no station codes or notes)
- One station per line
- Times must be in HH:MM format (24-hour)

Save as `timetable-formatted.txt`

### Step 4: Validate Extraction

```bash
node timetable-updater.js --route f1 --file timetable-formatted.txt --action parse
```

You'll see:
✅ Extracted times displayed
⚠️  Any warnings (times out of order, gaps, etc.)
✅ Validation status

### Step 4.1: Generate an AI prompt (optional)

If you want to use an AI model to cleanly parse the raw OCR output, run:

```bash
node timetable-updater.js --route f1 --file timetable-raw.txt --action prompt
```

This writes `ai-prompt-f1.txt` with a ready-made prompt for ChatGPT or another model.

### Step 5: Manual Review

Before applying changes:
1. Compare displayed times with source PDF
2. Check for missing stations
3. Verify times are in ascending order
4. Look for any OCR errors (times like "08:5" instead of "08:55")

### Step 6: Apply Updates

Once validated and, if used, AI-cleaned:
```bash
node timetable-updater.js --route f1 --file timetable-formatted.txt --action update --day sunday
```

The script will:
1. Create a timestamped backup
2. Update the route file
3. Show which stations were updated

### Step 7: Test

After updating, test the website:

```bash
# 1. Verify syntax
node -c kiel-laboe-route.js

# 2. Start a local server and test in browser
# Check that times display correctly
# Verify "Nächste Abfahrten" shows updated times
```

## Example Workflow for F1

```bash
# 1. Download and extract PDF to text
# → Save: timetable-f1-summer.txt

# 2. Validate
node timetable-updater.js --route f1 --file timetable-f1-summer.txt

# 3. If validation passes and you reviewed the times
node timetable-updater.js --route f1 --file timetable-f1-summer.txt --update

# 4. Verify
node -c kiel-laboe-route.js
git diff kiel-laboe-route.js  # Review changes

# 5. Commit
git add kiel-laboe-route.js
git commit -m "Update F1 timetable from summer schedule dated 2026-05-04"
```

## Troubleshooting

### "No times found for station: X"
- Check spelling matches exactly
- Ensure station name is on its own line
- Look for OCR errors (letters instead of numbers)

### "Times not in ascending order"
- One departure time is listed after a later time
- Check for OCR errors (58 read as 53, etc.)

### Times look wrong after update
- Stop! Use the backup created before update
- Re-check OCR extraction manually
- Try online OCR service instead of command-line

## Backup Recovery

If something went wrong:

```bash
# List recent backups
ls -la *.backup.*

# Restore the latest backup
cp kiel-laboe-route.js.backup.1234567890 kiel-laboe-route.js

# Or restore a specific backup
cp kiel-laboe-route.js.backup.1234567890 kiel-laboe-route.js
```

## Advanced: Adding New Route

To add F2 updater support, edit `timetable-updater.js`:

```javascript
ROUTES.f2 = {
    file: 'sfk-f2-route.js',
    stations: ['reventlou', 'dietrichsdorf', 'wellingdorf']
};
```

Then use:
```bash
node timetable-updater.js --route f2 --file timetable-f2.txt --update
```

## When to Update

- After each **seasonal schedule change** (posted on sfk-kiel.de)
- When you receive confirmation of new times
- Check their news page regularly: https://www.sfk-kiel.de/service/aktuelles

## Need Help?

1. **Script not parsing times?** → Check text format (use tabs, not spaces)
2. **Update failed?** → Restore backup and check error message
3. **Still having issues?** → Manually update route files (safest option)
