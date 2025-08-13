// Route Generator for Ferry Timetables
// This makes it easy to adapt the website to different ferry routes

class FerryRouteGenerator {
    constructor(routeData) {
        this.routeData = routeData;
        this.container = null;
    }

    // Generate the complete HTML structure
    generateHTML() {
        const html = `
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.routeData.name} - Nächste Abfahrten</title>
                <link rel="stylesheet" href="styles.css">
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <header>
                        <div class="device-info">iPhone 13 mini - 3</div>
                        <h1>${this.routeData.name}</h1>
                    </header>

                    <div class="current-time">
                        <div class="time-display">
                            <span id="current-time">--:--</span>
                            <span class="time-label">Aktuelle Zeit</span>
                        </div>
                    </div>

                    <div class="route-container">
                        ${this.generateStationsHTML()}
                    </div>

                    <div class="schedule-info">
                        <h3>Fahrplan-Info</h3>
                        <div class="schedule-details">
                            ${this.generateScheduleInfoHTML()}
                        </div>
                    </div>

                    <footer>
                        <p>${this.routeData.name} - Fahrplan-Website</p>
                    </footer>
                </div>

                <script src="script.js"></script>
            </body>
            </html>
        `;
        return html;
    }

    // Generate HTML for all stations
    generateStationsHTML() {
        let stationsHTML = '';
        
        this.routeData.stations.forEach((station, index) => {
            stationsHTML += this.generateStationHTML(station, index);
        });
        
        return stationsHTML;
    }

    // Generate HTML for a single station
    generateStationHTML(station, index) {
        const isMainStation = station.isMain || index === 0;
        const mainStationClass = isMainStation ? 'main-station' : '';
        
        return `
            <div class="station-item ${mainStationClass}" id="${station.id}">
                <div class="station-info">
                    <div class="station-name">${station.name}</div>
                    <div class="next-arrival" id="${station.id}-arrival">in 5min</div>
                </div>
                <div class="departure-times-station" id="${station.id}-departures" style="display: none;">
                    <h4>Nächste Abfahrten</h4>
                    <div class="time-list">
                        <div class="time-item" id="${station.id}-departure-1">--:--</div>
                        <div class="time-item" id="${station.id}-departure-2">--:--</div>
                        <div class="time-item" id="${station.id}-departure-3">--:--</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate schedule information
    generateScheduleInfoHTML() {
        let scheduleHTML = '';
        
        Object.entries(this.routeData.scheduleInfo).forEach(([day, info]) => {
            scheduleHTML += `
                <div class="schedule-section">
                    <h4>${day}</h4>
                    <p>${info}</p>
                </div>
            `;
        });
        
        return scheduleHTML;
    }

    // Generate the JavaScript data structure
    generateJavaScriptData() {
        const jsData = {
            weekdays: {},
            saturday: {}
        };

        this.routeData.stations.forEach(station => {
            jsData.weekdays[station.id] = {
                departures: station.weekdayDepartures,
                arrivals: station.weekdayArrivals || station.weekdayDepartures
            };
            
            jsData.saturday[station.id] = {
                departures: station.saturdayDepartures,
                arrivals: station.saturdayArrivals || station.saturdayDepartures
            };
        });

        return `const ferrySchedule = ${JSON.stringify(jsData, null, 2)};`;
    }

    // Generate a complete route configuration file
    generateRouteConfig() {
        return `// Route Configuration for ${this.routeData.name}
const routeConfig = {
    name: "${this.routeData.name}",
    description: "${this.routeData.description || ''}",
    stations: ${JSON.stringify(this.routeData.stations, null, 2)},
    scheduleInfo: ${JSON.stringify(this.routeData.scheduleInfo, null, 2)}
};

export default routeConfig;`;
    }
}

// Example usage for creating new routes:
// const generator = new FerryRouteGenerator(routeData);
// const html = generator.generateHTML();
// const jsData = generator.generateJavaScriptData();
// const routeConfig = generator.generateRouteConfig();
