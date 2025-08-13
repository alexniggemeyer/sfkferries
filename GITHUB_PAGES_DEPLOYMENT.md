# 🌐 GitHub Pages Deployment Guide

This guide explains how to deploy your SFK F2 ferry timetable website to GitHub Pages for free hosting.

## 📋 Prerequisites

- **GitHub account** (free)
- **Git** installed on your computer
- **Your ferry website files** ready for deployment

## 🚀 Quick Setup

### Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New repository"** or the "+" icon
3. **Name your repository** (e.g., `sfk-f2-ferry-website`)
4. **Make it public** (required for free GitHub Pages)
5. **Don't initialize** with README, .gitignore, or license
6. **Click "Create repository"**

### Step 2: Upload Your Files

#### Option A: Using GitHub Web Interface

1. **Drag and drop** all your website files to the repository
2. **Commit the changes** with a message like "Initial website upload"
3. **Push to main branch**

#### Option B: Using Git Commands

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Copy your website files to this directory
cp /path/to/your/website/* .

# Add and commit files
git add .
git commit -m "Initial website upload"

# Push to GitHub
git push origin main
```

### Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section (left sidebar)
4. **Under "Source"**, select **"Deploy from a branch"**
5. **Choose branch**: `main` or `master`
6. **Choose folder**: `/ (root)`
7. **Click "Save"**

### Step 4: Wait for Deployment

- **GitHub will build and deploy** your site automatically
- **This usually takes 1-5 minutes**
- **You'll see a green checkmark** when deployment is complete
- **Your site will be available** at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## 🔧 Automatic Deployment with GitHub Actions

### Option 1: Use the Provided Workflow (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys your site:

1. **The workflow is already configured** in `.github/workflows/static.yml`
2. **It will run automatically** when you push changes
3. **No additional setup required**

### Option 2: Manual Workflow Creation

If you prefer to create the workflow manually:

1. **Go to your repository** → **Actions** tab
2. **Click "New workflow"**
3. **Choose "Deploy static site to Pages"**
4. **Copy the workflow content** from `.github/workflows/static.yml`
5. **Commit the workflow**

## 📁 Required Files for GitHub Pages

Make sure these files are in your repository root:

```
YOUR_REPO/
├── index.html              # Main HTML file (REQUIRED)
├── styles.css              # CSS styles
├── script.js               # Main JavaScript
├── route-generator.js      # Route generator
├── sfk-f2-route.js         # Route configuration
├── .github/workflows/      # GitHub Actions workflows
└── README.md               # Repository description
```

## 🌐 Custom Domain (Optional)

### Setting Up a Custom Domain

1. **Purchase a domain** from a domain registrar
2. **Go to repository Settings** → **Pages**
3. **Enter your domain** in the "Custom domain" field
4. **Click "Save"**
5. **Add a CNAME record** at your domain registrar:
   - **Name**: `@` or `www`
   - **Value**: `YOUR_USERNAME.github.io`
   - **TTL**: `3600` or `1 hour`

### Example CNAME Configuration

```
# For example.com
Type: CNAME
Name: @
Value: yourusername.github.io

# For www.example.com
Type: CNAME
Name: www
Value: yourusername.github.io
```

## 🔄 Updating Your Website

### Automatic Updates

1. **Make changes** to your local files
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update ferry timetable"
   git push origin main
   ```
3. **GitHub Actions will automatically** rebuild and deploy
4. **Your site updates** in 1-5 minutes

### Manual Updates

1. **Edit files directly** on GitHub
2. **Or upload new files** via the web interface
3. **Commit changes** to trigger deployment

## 📊 Monitoring Deployment

### Check Deployment Status

1. **Go to Actions tab** in your repository
2. **View workflow runs** and their status
3. **Green checkmark** = successful deployment
4. **Red X** = deployment failed (check logs)

### View Deployment Logs

1. **Click on a workflow run** in the Actions tab
2. **Expand the "Deploy to GitHub Pages"** step
3. **View detailed logs** for troubleshooting

## 🐛 Troubleshooting

### Common Issues

#### Site Not Loading
- **Check repository settings** → Pages section
- **Verify branch and folder** are correct
- **Wait 5-10 minutes** for initial deployment
- **Check Actions tab** for deployment status

#### Build Failures
- **Check workflow logs** in Actions tab
- **Verify all required files** are present
- **Check file permissions** and syntax
- **Ensure index.html** is in the root directory

#### Custom Domain Issues
- **Verify CNAME record** is correct
- **Wait 24-48 hours** for DNS propagation
- **Check domain registrar** settings
- **Ensure HTTPS** is enabled in Pages settings

### Getting Help

1. **Check GitHub Pages documentation**
2. **Review workflow logs** in Actions tab
3. **Verify file structure** matches requirements
4. **Check repository settings** and permissions

## 🎯 Best Practices

### File Organization
- **Keep all files** in the repository root
- **Use descriptive filenames** and commit messages
- **Include a README.md** explaining your project

### Performance
- **Optimize images** before uploading
- **Minimize CSS/JS** for faster loading
- **Use relative paths** in your HTML

### Security
- **Don't include sensitive data** in public repositories
- **Use HTTPS** (enabled by default on GitHub Pages)
- **Regularly update** dependencies if any

## 📈 Analytics and Monitoring

### GitHub Insights
- **View traffic** in repository Insights tab
- **Monitor page views** and unique visitors
- **Track referrers** and popular content

### External Analytics
- **Google Analytics**: Add tracking code to your HTML
- **Other services**: Most analytics services work with GitHub Pages

## 🔗 Useful Links

- [GitHub Pages Documentation](https://pages.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)

## ✅ Success Checklist

- [ ] Repository created and public
- [ ] All website files uploaded
- [ ] GitHub Pages enabled
- [ ] Site accessible at GitHub Pages URL
- [ ] GitHub Actions workflow working
- [ ] Custom domain configured (optional)
- [ ] Site updates automatically on changes

---

**Your ferry website is now live on the internet! 🚢🌐⚓**

Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
