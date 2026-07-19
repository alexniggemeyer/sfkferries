// Laboe - Schilksee/Strande - Laboe Route Configuration
// Based on the public transport timetable, valid 04.05.2026 - 06.09.2026

const laboeSchilkseeRoute = {
    name: "F1",
    description: "Laboe → Schilksee/Strande → Laboe",
    InOperation: {
        "weekday": true,
        "saturday": true,
        "sunday": true,
        "publicHolidays": true
    },
    stations: [
        {
            id: "laboe",
            name: "Laboe",
            isMain: true,
            weekdayDepartures: [10.24, 13.24, 18.50],
            weekdayArrivals: [11.10, 14.10, 19.36],
            saturdayDepartures: [11.04, 12.09, 16.14, 17.54],
            saturdayArrivals: [11.50, 12.55, 17.00, 18.40],
            sundayDepartures: [11.04, 12.09, 16.14, 17.54],
            sundayArrivals: [11.50, 12.55, 17.00, 18.40]
        },
        {
            id: "schilksee",
            name: "Schilksee",
            weekdayDepartures: [10.40, 13.40, 19.06],
            saturdayDepartures: [11.20, 12.25, 16.30, 18.10],
            sundayDepartures: [11.20, 12.25, 16.30, 18.10]
        },
        {
            id: "strande",
            name: "Strande",
            weekdayDepartures: [10.48, 13.48, 19.14],
            saturdayDepartures: [11.28, 12.33, 16.38, 18.18],
            sundayDepartures: [11.28, 12.33, 16.38, 18.18]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 10:24 Uhr | Späteste Ankunft: 19:36 Uhr",
        "Samstag, Sonntag, Feiertag": "Früheste Abfahrt: 11:04 Uhr | Späteste Ankunft: 18:40 Uhr"
    },
    validity: {
        from: "04.05.2026",
        to: "06.09.2026"
    }
};
