// Kiel Bahnhof to Laboe Route Configuration
// Based on the public transport timetable, valid 04.05.2026 - 06.09.2026

const kielLaboeRoute = {
    name: "F1",
    description: "Kiel Bahnhof → Laboe",
    InOperation: {
        "weekday": true,
        "saturday": true,
        "sunday": true,
        "publicHolidays": true
    },
    stations: [
        {
            id: "kiel-bahnhof",
            name: "Bahnhof",
            isMain: true,
            weekdayDepartures: [8.10, 9.05, 11.05, 12.00, 13.00, 14.25, 15.50, 17.30, 18.50],
            saturdayDepartures: [8.55, 9.40, 10.40, 12.05, 13.30, 14.40, 15.15, 16.30, 18.34],
            sundayDepartures: [8.55, 9.40, 10.40, 12.05, 13.30, 14.40, 15.15, 16.30, 18.34]
        },
        {
            id: "seegarten",
            name: "Seegarten",
            weekdayDepartures: [8.17, 9.12, 11.12, 12.07, 13.07, 14.32, 15.57, 17.37, 18.57],
            saturdayDepartures: [9.02, 9.47, 10.47, 12.12, 13.37, 14.47, 15.22, 16.37, 18.41],
            sundayDepartures: [9.02, 9.47, 10.47, 12.12, 13.37, 14.47, 15.22, 16.37, 18.41]
        },
        {
            id: "reventlou",
            name: "Reventlou",
            weekdayDepartures: [8.25, 9.20, 11.20, 12.15, 13.15, 14.40, 16.05, 17.45, 19.05],
            saturdayDepartures: [9.10, 9.55, 10.55, 12.20, 13.45, 14.55, 15.30, 16.45, 18.49],
            sundayDepartures: [9.10, 9.55, 10.55, 12.20, 13.45, 14.55, 15.30, 16.45, 18.49]
        },
        {
            id: "moenkeberg",
            name: "Mönkeberg",
            weekdayDepartures: [8.37, 9.32, 11.32, 12.27, 13.27, 14.52, 16.17, 17.57, 19.17],
            saturdayDepartures: [9.22, 10.07, 11.07, 12.32, 13.57, 15.07, 15.42, 16.57, 19.01],
            sundayDepartures: [9.22, 10.07, 11.07, 12.32, 13.57, 15.07, 15.42, 16.57, 19.01]
        },
        {
            id: "moeltenort",
            name: "Möltenort",
            weekdayDepartures: [6.46, 8.50, 9.45, 11.45, 12.40, 13.59, 15.05, 16.30, 18.10, 19.30],
            saturdayDepartures: [9.35, 10.20, 11.20, 12.45, 14.10, 15.20, 15.55, 17.10, 19.14],
            sundayDepartures: [9.35, 10.20, 11.20, 12.45, 14.10, 15.20, 15.55, 17.10, 19.14]
        },
        {
            id: "friedrichsort",
            name: "Friedrichsort",
            weekdayDepartures: [6.05, 6.55, 8.59, 9.54, 11.54, 12.49, 13.50, 15.14, 16.39, 18.19, 19.39],
            saturdayDepartures: [9.44, 11.29, 12.54, 14.19, 15.29, 16.04, 17.19, 19.23],
            sundayDepartures: [9.44, 11.29, 12.54, 14.19, 15.29, 16.04, 17.19, 19.23]
        },
        {
            id: "falkenstein",
            name: "Falckenstein",
            weekdayDepartures: [10.06, 12.06, 13.01, 14.15, 15.26, 16.51, 18.31, 19.51],
            saturdayDepartures: [9.56, 10.41, 11.41, 13.06, 14.31, 15.41, 16.16, 19.35],
            sundayDepartures: [9.56, 10.41, 11.41, 13.06, 14.31, 15.41, 16.16, 19.35]
        },
        {
            id: "laboe",
            name: "Laboe",
            weekdayDepartures: [],
            weekdayArrivals: [6.21, 7.11, 9.15, 10.14, 12.14, 13.09, 14.23, 15.34, 16.59, 18.39, 19.59],
            saturdayDepartures: [],
            saturdayArrivals: [10.04, 10.49, 11.49, 13.14, 14.39, 15.49, 16.24, 17.35, 19.43],
            sundayDepartures: [],
            sundayArrivals: [10.04, 10.49, 11.49, 13.14, 14.39, 15.49, 16.24, 17.35, 19.43]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 6:05 Uhr | Späteste Ankunft: 19:59 Uhr",
        "Samstag, Sonntag, Feiertag": "Früheste Abfahrt: 8:55 Uhr | Späteste Ankunft: 19:43 Uhr"
    },
    validity: {
        from: "04.05.2026",
        to: "06.09.2026"
    }
};
