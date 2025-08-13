# 🚢 SFK F2 Ferry Timetable Website

A modern, responsive website that displays real-time ferry departure times for the Schwentine-Fährlinie F2 route, serving the stations Reventlou, Dietrichsdorf, and Wellingdorf.

## ✨ Features

- **Real-time Updates**: Shows current time and calculates next ferry departures
- **Interactive Stations**: Click any station to see next 3 departure times
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Route Generator System**: Easy to adapt for other ferry routes
- **Modern UI**: Beautiful ferry-themed design with glassmorphism effects

## 🚉 Stations

- **Reventlou** (Main Station) - Shows departure countdown
- **Dietrichsdorf** - Shows departure countdown  
- **Wellingdorf** - Shows departure countdown

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free Hosting)

Deploy your website for free using GitHub Pages:

1. **Create a GitHub repository** and upload your files
2. **Enable GitHub Pages** in repository settings
3. **Your site will be live** at `https://username.github.io/repository-name`

📖 **Detailed Guide**: [GitHub Pages Deployment Guide](GITHUB_PAGES_DEPLOYMENT.md)

### Option 2: Docker Container

Deploy using Docker for local or production hosting:

1. **Build the container**: `docker-compose build`
2. **Start the service**: `docker-compose up -d`
3. **Access at**: `http://localhost:8080`

📖 **Detailed Guide**: [Docker Deployment Guide](DEPLOYMENT.md)

## 🛠️ Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/sfk-f2-ferry-website.git
   cd sfk-f2-ferry-website
   ```

2. **Open `index.html`** in your browser

3. **Or use a local server**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

### Docker Deployment

```bash
# Make script executable
chmod +x deploy.sh

# Deploy automatically
./deploy.sh

# Or manually
docker-compose up -d
```

## 🔧 Customization

### Adding New Routes

The website uses a route generator system that makes it easy to adapt to other ferry routes:

1. **Create route configuration** in a new JavaScript file
2. **Update the HTML** to load your route
3. **Customize styling** in CSS if needed

Example:
```javascript
const myRoute = {
    name: "My Ferry Line",
    stations: [
        {
            id: "station1",
            name: "Station Name",
            weekdayDepartures: [6.00, 7.00, 8.00],
            saturdayDepartures: [8.00, 9.00, 10.00]
        }
    ]
};
```

### Modifying Styles

- **Colors**: Update CSS variables in `styles.css`
- **Layout**: Modify the HTML structure and CSS grid/flexbox
- **Animations**: Customize CSS transitions and keyframes

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🏗️ Project Structure

```
sfk-fahrplan_v2/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and animations
├── script.js               # Main JavaScript functionality
├── route-generator.js      # Route generator system
├── sfk-f2-route.js         # SFK F2 route configuration
├── .github/workflows/      # GitHub Actions for auto-deployment
├── Dockerfile              # Docker container definition
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx server configuration
├── deploy.sh               # Automated Docker deployment
├── DEPLOYMENT.md           # Docker deployment guide
└── GITHUB_PAGES_DEPLOYMENT.md # GitHub Pages guide
```

## 🔄 Updates

The website automatically updates:
- **Current time**: Every second
- **Ferry times**: Every minute
- **Deployment**: Automatically when you push to GitHub

## 📊 Data Source

All timetable data is based on the official Schwentine-Fährlinie F2 schedule, valid from February 1, 2024.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Make your changes**
4. **Commit**: `git commit -m 'Add feature'`
5. **Push**: `git push origin feature-name`
6. **Create a Pull Request**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you need help:
1. **Check the deployment guides** above
2. **Review the troubleshooting sections**
3. **Open an issue** on GitHub
4. **Check the Actions tab** for deployment status

---

**Happy Sailing! 🚢⚓**

*Built with ❤️ for ferry passengers*
