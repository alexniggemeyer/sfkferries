// Example: How to create a new ferry route easily
// This shows how to adapt the website to different ferry routes

// Example Route: Kiel-Holtenau to Laboe
const kielLaboeRoute = {
    name: "Kiel-Laboe",
    description: "Kiel-Holtenau ↔ Laboe Fährverbindung",
    stations: [
        {
            id: "kiel-holtenau",
            name: "Kiel-Holtenau",
            isMain: true,
            weekdayDepartures: [6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00, 13.00, 14.00, 15.00, 16.00, 17.00, 18.00, 19.00, 20.00, 21.00],
            saturdayDepartures: [8.00, 9.00, 10.00, 11.00, 12.00, 13.00, 14.00, 15.00, 16.00, 17.00, 18.00, 19.00]
        },
        {
            id: "laboe",
            name: "Laboe",
            weekdayDepartures: [6.30, 7.30, 8.30, 9.30, 10.30, 11.30, 12.30, 13.30, 14.30, 15.30, 16.30, 17.30, 18.30, 19.30, 20.30, 21.30],
            saturdayDepartures: [8.30, 9.30, 10.30, 11.30, 12.30, 13.30, 14.30, 15.30, 16.30, 17.30, 18.30, 19.30]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 6:00 Uhr | Späteste Ankunft: 21:30 Uhr",
        "Samstag": "Früheste Abfahrt: 8:00 Uhr | Späteste Ankunft: 19:30 Uhr",
        "Sonntag": "Kein Fährbetrieb"
    }
};

// Example Route: Flensburg to Sønderborg (International)
const flensburgSonderborgRoute = {
    name: "Flensburg-Sønderborg",
    description: "Deutsch-Dänische Fährverbindung",
    stations: [
        {
            id: "flensburg",
            name: "Flensburg",
            isMain: true,
            weekdayDepartures: [7.00, 9.00, 11.00, 13.00, 15.00, 17.00, 19.00],
            saturdayDepartures: [8.00, 10.00, 12.00, 14.00, 16.00, 18.00],
            sundayDepartures: [10.00, 12.00, 14.00, 16.00]
        },
        {
            id: "sonderborg",
            name: "Sønderborg",
            weekdayDepartures: [7.45, 9.45, 11.45, 13.45, 15.45, 17.45, 19.45],
            saturdayDepartures: [8.45, 10.45, 12.45, 14.45, 16.45, 18.45],
            sundayDepartures: [10.45, 12.45, 14.45, 16.45]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 7:00 Uhr | Späteste Ankunft: 19:45 Uhr",
        "Samstag": "Früheste Abfahrt: 8:00 Uhr | Späteste Ankunft: 18:45 Uhr",
        "Sonntag": "Früheste Abfahrt: 10:00 Uhr | Späteste Ankunft: 16:45 Uhr"
    }
};

// How to use the generator for any route:

// 1. Create your route data
const myRoute = {
    name: "Meine Fährlinie",
    description: "Beschreibung der Route",
    stations: [
        {
            id: "station1",
            name: "Station 1",
            isMain: true, // Optional: marks as main station
            weekdayDepartures: [6.00, 7.00, 8.00], // Times in decimal format (6.00 = 6:00)
            saturdayDepartures: [8.00, 9.00, 10.00],
            // Optional: if arrivals are different from departures
            weekdayArrivals: [6.30, 7.30, 8.30],
            saturdayArrivals: [8.30, 9.30, 10.30]
        },
        {
            id: "station2",
            name: "Station 2",
            weekdayDepartures: [6.15, 7.15, 8.15],
            saturdayDepartures: [8.15, 9.15, 10.15]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 6:00 Uhr | Späteste Ankunft: 8:30 Uhr",
        "Samstag": "Früheste Abfahrt: 8:00 Uhr | Späteste Ankunft: 10:30 Uhr",
        "Sonntag": "Kein Fährbetrieb"
    }
};

// 2. Generate the website
const generator = new FerryRouteGenerator(myRoute);

// 3. Get the generated files
const html = generator.generateHTML();
const jsData = generator.generateJavaScriptData();
const routeConfig = generator.generateRouteConfig();

// 4. Save the files or use them directly
console.log("HTML generated:", html);
console.log("JavaScript data:", jsData);
console.log("Route config:", routeConfig);

// To adapt to a new route, just:
// 1. Copy the route-generator.js file
// 2. Create your route data object
// 3. Generate the HTML and JavaScript
// 4. Update the script.js file with the new data
// 5. Done! Your new route is ready
