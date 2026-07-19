#!/usr/bin/env node

/**
 * SFK Ferry Timetable Updater
 *
 * This script helps with AI-assisted timetable extraction and updates.
 * It can parse OCR text, generate an AI prompt, and update route files from AI JSON.
 *
 * Usage:
 *   node timetable-updater.js --route f1 --file raw-text.txt --action parse
 *   node timetable-updater.js --route f1 --file raw-text.txt --action prompt
 *   node timetable-updater.js --route f1 --file timetable-ai.json --action update --day sunday
 */

const fs = require('fs');
const path = require('path');

const ROUTES = {
    f1: {
        file: 'kiel-laboe-route.js',
        stationNames: {
            'kiel-bahnhof': 'Bahnhof',
            seegarten: 'Seegarten',
            reventlou: 'Reventlou',
            moenkeberg: 'Mönkeberg',
            moeltenort: 'Möltenort',
            friedrichsort: 'Friedrichsort',
            falkenstein: 'Falkenstein',
            laboe: 'Laboe'
        }
    },
    f2: {
        file: 'sfk-f2-route.js',
        stationNames: {
            reventlou: 'Reventlou',
            dietrichsdorf: 'Dietrichsdorf',
            wellingdorf: 'Wellingdorf'
        }
    }
};

const TIME_PATTERN = /\b(\d{1,2}[:.]\d{2})\b/g;

function normalizeText(text) {
    return text
        .normalize('NFKD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/[\u00A0\t]+/g, ' ')
        .replace(/ +/g, ' ')
        .trim();
}

function normalizeStationKey(name) {
    return normalizeText(name)
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/ +/g, ' ')
        .trim();
}

function normalizeTimeToken(token) {
    if (!token) return null;
    const value = token.replace('.', ':').trim();
    const match = value.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (Number.isNaN(hours) || Number.isNaN(minutes) || minutes >= 60 || hours < 0 || hours > 23) return null;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function parseTimeTableText(rawText) {
    const text = normalizeText(rawText);
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const timetable = {};

    lines.forEach(line => {
        const timeMatches = [...line.matchAll(TIME_PATTERN)].map(match => normalizeTimeToken(match[1])).filter(Boolean);
        if (timeMatches.length === 0) return;

        const firstTimeRegex = /\b(\d{1,2}[:.]\d{2})\b/;
        const firstTimeMatch = firstTimeRegex.exec(line);
        if (!firstTimeMatch) return;

        const firstTimeIndex = firstTimeMatch.index;
        let station = line.slice(0, firstTimeIndex).trim();
        station = station.replace(/(abfahrt|ankunft|fahrplan|plan|fahre?plan)/gi, '').trim();
        station = station.replace(/[\-–—]+$/, '').trim();
        if (!station) return;

        const key = normalizeStationKey(station);
        timetable[key] = timeMatches;
    });

    return timetable;
}

function generateAiPrompt(route, rawText) {
    const stationNames = Object.values(ROUTES[route].stationNames);
    return `I have OCR output from a ferry timetable for the ${route.toUpperCase()} route. Parse the raw text below and return a JSON object with the exact station names and departure times in HH:MM format. Only include stations from this route and nothing else.\n\nRoute stations:\n${stationNames.join(', ')}\n\nRaw text:\n${rawText}\n\nReturn valid JSON only, for example:\n{\n  "Bahnhof": ["08:55", "09:40"],\n  "Seegarten": ["09:02", "09:47"]\n}\n`;
}

function formatTimetableForDisplay(timetable) {
    let output = '\n=== Extracted Timetable ===\n';
    Object.entries(timetable).forEach(([station, times]) => {
        output += `${station.padEnd(20)} ${times.join(' | ')}\n`;
    });
    return output;
}

function findBestStationMatch(parsed, route) {
    const stationNames = Object.values(ROUTES[route].stationNames);
    const parsedKeys = Object.keys(parsed);
    const matches = {};

    stationNames.forEach(displayName => {
        const normalizedDisplay = normalizeStationKey(displayName);
        const exact = parsedKeys.find(key => key === normalizedDisplay);
        if (exact) {
            matches[displayName] = parsed[exact];
            return;
        }

        const fuzzy = parsedKeys.find(key => key.includes(normalizedDisplay) || normalizedDisplay.includes(key));
        if (fuzzy) {
            matches[displayName] = parsed[fuzzy];
            return;
        }

        const tokenMatch = parsedKeys.find(key => normalizedDisplay.split(' ').every(part => key.includes(part)));
        if (tokenMatch) {
            matches[displayName] = parsed[tokenMatch];
            return;
        }

        matches[displayName] = [];
    });

    return matches;
}

function validateTimetable(timetable) {
    const errors = [];
    const warnings = [];

    const keys = Object.keys(timetable);
    if (keys.length === 0) {
        errors.push('No timetable data found');
        return { errors, warnings, valid: false };
    }

    Object.entries(timetable).forEach(([station, times]) => {
        if (!Array.isArray(times) || times.length === 0) {
            warnings.push(`${station}: No times found`);
            return;
        }
        let prevMinutes = null;
        times.forEach(time => {
            if (!/^\d{2}:\d{2}$/.test(time)) {
                errors.push(`${station}: Invalid time ${time}`);
                return;
            }
            const [h, m] = time.split(':').map(Number);
            const minutes = h * 60 + m;
            if (prevMinutes !== null && minutes <= prevMinutes) {
                warnings.push(`${station}: Times not strictly increasing`);
            }
            prevMinutes = minutes;
        });
    });

    return { errors, warnings, valid: errors.length === 0 };
}

function timeStringToDecimal(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return Number(`${hours}.${String(minutes).padStart(2, '0')}`);
}

function updateRouteFile(routeFile, route, dayType, timetable) {
    let content = fs.readFileSync(routeFile, 'utf8');
    const stationMap = ROUTES[route].stationNames;

    Object.entries(timetable).forEach(([displayName, times]) => {
        const routeStationId = Object.keys(stationMap).find(key => stationMap[key] === displayName);
        if (!routeStationId) {
            console.warn(`⚠️  Station not found in route config: ${displayName}`);
            return;
        }

        const departureField = `${dayType}Departures`;
        const escapedId = routeStationId.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const pattern = new RegExp(`(id:\\s*"${escapedId}"[\\s\\S]*?${departureField}: )\\[[^\\]]*\\]`);
        const replacement = `$1[${times.map(timeStringToDecimal).join(', ')}]`;

        if (pattern.test(content)) {
            content = content.replace(pattern, replacement);
        } else {
            console.warn(`⚠️  Could not find ${departureField} block for station ${displayName}`);
        }
    });

    return content;
}

function parseArguments() {
    const args = process.argv.slice(2);
    const opts = {};
    for (let i = 0; i < args.length; i += 2) {
        opts[args[i].replace(/^--/, '')] = args[i + 1];
    }
    return opts;
}

function main() {
    const options = parseArguments();
    const action = options.action || 'parse';

    if (!options.route || !options.file) {
        console.error('Usage: node timetable-updater.js --route f1 --file input.txt [--action parse|prompt|update] [--day sunday]');
        process.exit(1);
    }

    const route = options.route.toLowerCase();
    if (!ROUTES[route]) {
        console.error(`Unknown route: ${route}`);
        process.exit(1);
    }

    const inputFile = path.resolve(options.file);
    if (!fs.existsSync(inputFile)) {
        console.error(`File not found: ${inputFile}`);
        process.exit(1);
    }

    const rawText = fs.readFileSync(inputFile, 'utf8');

    if (action === 'prompt') {
        const prompt = generateAiPrompt(route, rawText);
        const promptFile = path.join(path.dirname(inputFile), `ai-prompt-${route}.txt`);
        fs.writeFileSync(promptFile, prompt, 'utf8');
        console.log(`AI prompt written to ${promptFile}`);
        return;
    }

    if (action === 'parse') {
        const parsed = parseTimeTableText(rawText);
        console.log(formatTimetableForDisplay(parsed));
        const matches = findBestStationMatch(parsed, route);
        console.log('\n=== Suggested Station Matches ===\n');
        Object.entries(matches).forEach(([station, times]) => {
            console.log(`${station.padEnd(16)} ${times.length ? times.join(' | ') : '<no match>'}`);
        });
        return;
    }

    if (action === 'update') {
        const dayType = options.day || 'sunday';
        const allowed = ['weekday', 'saturday', 'sunday'];
        if (!allowed.includes(dayType)) {
            console.error(`Invalid day: ${dayType}. Allowed: ${allowed.join(', ')}`);
            process.exit(1);
        }

        let timetable;
        try {
            timetable = JSON.parse(rawText);
        } catch (err) {
            console.error('Input must be valid JSON for update action');
            process.exit(1);
        }

        const validation = validateTimetable(timetable);
        if (!validation.valid) {
            console.error('Invalid timetable JSON:');
            validation.errors.forEach(e => console.error(`  - ${e}`));
            process.exit(1);
        }

        const routeFile = path.join(__dirname, ROUTES[route].file);
        if (!fs.existsSync(routeFile)) {
            console.error(`Route file not found: ${routeFile}`);
            process.exit(1);
        }

        const backupFile = `${routeFile}.backup.${Date.now()}`;
        fs.copyFileSync(routeFile, backupFile);
        console.log(`Backup created: ${backupFile}`);

        const updatedContent = updateRouteFile(routeFile, route, dayType, timetable);
        fs.writeFileSync(routeFile, updatedContent, 'utf8');
        console.log(`Updated ${routeFile} for ${dayType}`);
        return;
    }

    console.error(`Unknown action: ${action}`);
    process.exit(1);
}

if (require.main === module) {
    main();
}

module.exports = {
    parseTimeTableText,
    normalizeTimeToken: normalizeTimeToken,
    generateAiPrompt,
    validateTimetable
};
