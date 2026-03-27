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
                    <div class="departures-scrollwheel" id="${station.id}-all-departures">
                        <!-- 3 departures will be visible at a time -->
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
        let jsData = 'const ferrySchedule = {\n';

        jsData += `    "InOperation": {\n`;
        jsData += `        "weekday": ${this.routeData.InOperation.weekday},\n`;
        jsData += `        "saturday": ${this.routeData.InOperation.saturday},\n`;
        jsData += `        "sunday": ${this.routeData.InOperation.sunday},\n`;
        jsData += `        "publicHolidays": ${this.routeData.InOperation.publicHolidays}\n`;
        jsData += `    },\n`;

        this.routeData.stations.forEach(station => {
            jsData += `    "${station.id}": {\n`;
            jsData += `        "departures": [${station.weekdayDepartures.map(t => `"${t}"`).join(', ')}],\n`;

            // Only add arrivals if they exist
            if (station.weekdayArrivals && station.weekdayArrivals.length > 0) {
                jsData += `        "arrivals": [${station.weekdayArrivals.map(t => `"${t}"`).join(', ')}],\n`;
            } else {
                jsData += `        "arrivals": [${station.weekdayDepartures.map(t => `"${t}"`).join(', ')}],\n`;
            }

            // Add Saturday departures if they exist
            if (station.saturdayDepartures && station.saturdayDepartures.length > 0) {
                jsData += `        "saturdayDepartures": [${station.saturdayDepartures.map(t => `"${t}"`).join(', ')}],\n`;
            } else {
                jsData += `        "saturdayDepartures": [${station.weekdayDepartures.map(t => `"${t}"`).join(', ')}],\n`;
            }

            // Add Saturday arrivals if they exist
            if (station.saturdayArrivals && station.saturdayArrivals.length > 0) {
                jsData += `        "saturdayArrivals": [${station.saturdayArrivals.map(t => `"${t}"`).join(', ')}],\n`;
            } else {
                jsData += `        "saturdayArrivals": [${station.saturdayDepartures && station.saturdayDepartures.length > 0 ? station.saturdayDepartures.map(t => `"${t}"`).join(', ') : station.weekdayDepartures.map(t => `"${t}"`).join(', ')}],\n`;
            }

            // Add Sunday departures if they exist
            if (station.sundayDepartures && station.sundayDepartures.length > 0) {
                jsData += `        "sundayDepartures": [${station.sundayDepartures.map(t => `"${t}"`).join(', ')}],\n`;
            }

            // Add Sunday arrivals if they exist
            if (station.sundayArrivals && station.sundayArrivals.length > 0) {
                jsData += `        "sundayArrivals": [${station.sundayArrivals.map(t => `"${t}"`).join(', ')}],\n`;
            }

            jsData += `        "name": "${station.name}"\n`;
            jsData += `    }`;

            if (this.routeData.stations.indexOf(station) < this.routeData.stations.length - 1) {
                jsData += ',';
            }
            jsData += '\n';
        });

        jsData += '};';
        return jsData;
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
