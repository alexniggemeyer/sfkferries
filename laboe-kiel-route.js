// Laboe to Kiel Bahnhof Route Configuration
// Based on the public transport timetable

const laboeKielRoute = {
    name: "F1",
    description: "Laboe → Kiel Bahnhof",
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
            weekdayDepartures: [5.42, 6.20, 7.15, 9.30, 10.30, 12.35, 13.20, 14.45, 15.45, 17.45, 18.40, 20.40],
            saturdayDepartures: [10.26, 11.30, 13.00, 14.20, 15.45, 17.05, 18.30],
            sundayDepartures: [10.26, 11.30, 13.00, 14.20, 15.45, 17.05, 18.30]
        },
        {
            id: "friedrichsort",
            name: "Friedrichsort",
            weekdayDepartures: [6.02, 6.40, 7.40, 9.46, 10.46, 12.51, 13.36, 15.01, 16.01, 18.01, 18.56, 20.56],
            saturdayDepartures: [11.46, 13.16, 14.36, 16.01, 17.21, 18.46],
            sundayDepartures: [11.46, 13.16, 14.36, 16.01, 17.21, 18.46]
        },
        {
            id: "moeltenort",
            name: "Möltenort",
            weekdayDepartures: [5.55, 6.33, 6.50, 7.29, 7.50, 9.55, 10.55, 13.00, 13.45, 15.10, 16.10, 18.10, 19.05, 21.05],
            saturdayDepartures: [10.40, 11.55, 13.25, 14.45, 16.10, 17.30, 18.55],
            sundayDepartures: [10.40, 11.55, 13.25, 14.45, 16.10, 17.30, 18.55]
        },
        {
            id: "moenkeberg",
            name: "Mönkeberg",
            weekdayDepartures: [7.03, 8.03, 10.08, 11.08, 13.13, 13.58, 15.23, 16.23, 18.23, 19.18, 21.18],
            saturdayDepartures: [10.53, 12.08, 13.42, 14.58, 16.23, 17.43, 19.08],
            sundayDepartures: [10.53, 12.08, 13.42, 14.58, 16.23, 17.43, 19.08]
        },
        {
            id: "bellevue",
            name: "Bellevue",
            weekdayDepartures: [7.11, 8.11, 10.16, 11.16, 13.21, 14.06, 15.31, 16.31, 18.31, 19.26, 21.26],
            saturdayDepartures: [12.16, 13.46, 15.06, 16.31, 17.51, 19.16],
            sundayDepartures: [12.16, 13.46, 15.06, 16.31, 17.51, 19.16]
        },
        {
            id: "reventlou",
            name: "Reventlou",
            weekdayDepartures: [7.20, 8.20, 10.25, 11.25, 13.30, 14.15, 15.40, 16.40, 18.40, 19.35, 21.35],
            saturdayDepartures: [11.05, 12.25, 13.55, 15.15, 16.40, 18.00, 19.25],
            sundayDepartures: [11.05, 12.25, 13.55, 15.15, 16.40, 18.00, 19.25]
        },
        {
            id: "seegarten",
            name: "Seegarten",
            weekdayDepartures: [7.28, 8.28, 10.33, 11.33, 13.38, 14.23, 15.48, 16.48, 18.48, 19.42, 21.42],
            saturdayDepartures: [11.13, 12.33, 14.03, 15.22, 16.48, 18.08, 19.33],
            sundayDepartures: [11.13, 12.33, 14.03, 15.22, 16.48, 18.08, 19.33]
        },
        {
            id: "kiel-bahnhof",
            name: "Bahnhof",
            weekdayDepartures: [7.35, 8.35, 10.40, 11.40, 13.45, 14.30, 15.55, 16.55, 18.55, 19.50, 21.50],
            saturdayDepartures: [11.20, 12.40, 14.10, 15.30, 16.55, 18.15, 19.40],
            sundayDepartures: [11.20, 12.40, 14.10, 15.30, 16.55, 18.15, 19.40]
        }
    ],
    scheduleInfo: {
        "Montag - Freitag": "Früheste Abfahrt: 5:42 Uhr | Späteste Ankunft: 21:50 Uhr",
        "Samstag, Sonntag, Feiertag": "Früheste Abfahrt: 10:26 Uhr | Späteste Ankunft: 19:40 Uhr"
    }
};
