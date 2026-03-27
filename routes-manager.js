// Routes Manager - Handles multiple ferry routes and switching
class RoutesManager {
    constructor() {
        this.routes = {
            'sfk-f2': sfkF2Route,
            'kiel-laboe': kielLaboeRoute,
            'laboe-kiel': laboeKielRoute
        };
        this.currentRoute = 'sfk-f2'; // Default route
        this.generator = null;
    }

    // Initialize the routes manager
    init() {
        this.generator = new FerryRouteGenerator(this.routes[this.currentRoute]);
        this.setupRouteSelector();
        this.loadRoute(this.currentRoute);
    }

    // Setup the route selector UI
    setupRouteSelector() {
        const header = document.querySelector('header');
        const routeSelector = document.createElement('div');
        routeSelector.className = 'route-selector';
        routeSelector.innerHTML = `
            <div class="route-tabs">
                <button class="route-tab ${this.currentRoute === 'sfk-f2' ? 'active' : ''}" data-route="sfk-f2">
                    <span class="route-name">SFK F2</span>
                    <span class="route-desc">Schwentine-Fährlinie</span>
                </button>
                <button class="route-tab ${this.currentRoute === 'kiel-laboe' ? 'active' : ''}" data-route="kiel-laboe">
                    <span class="route-name">Kiel → Laboe</span>
                    <span class="route-desc">Bahnhof nach Laboe</span>
                </button>
                <button class="route-tab ${this.currentRoute === 'laboe-kiel' ? 'active' : ''}" data-route="laboe-kiel">
                    <span class="route-name">Laboe → Kiel</span>
                    <span class="route-desc">Laboe nach Bahnhof</span>
                </button>
            </div>
        `;

        // Insert after the header title
        const title = header.querySelector('h1');
        title.parentNode.insertBefore(routeSelector, title.nextSibling);

        // Add event listeners
        const tabs = routeSelector.querySelectorAll('.route-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const routeId = e.currentTarget.dataset.route;
                this.switchRoute(routeId);
            });
        });
    }

    // Switch to a different route
    switchRoute(routeId) {
        if (routeId === this.currentRoute) return;

        // Update active tab
        document.querySelectorAll('.route-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.route === routeId);
        });

        this.currentRoute = routeId;
        this.loadRoute(routeId);
    }

    // Load a specific route
    loadRoute(routeId) {
        const route = this.routes[routeId];
        if (!route) {
            console.error(`Route ${routeId} not found`);
            return;
        }

        console.log('Loading route:', routeId, route);

        if (!route.stations || !Array.isArray(route.stations)) {
            console.error(`Route ${routeId} has no valid stations array:`, route);
            return;
        }

        try {
            this.generator = new FerryRouteGenerator(route);

            // Update route container
            const routeContainer = document.getElementById('route-container');
            if (routeContainer) {
                routeContainer.innerHTML = this.generator.generateStationsHTML();
            }

            // Update schedule details
            const scheduleDetails = document.getElementById('schedule-details');
            if (scheduleDetails) {
                scheduleDetails.innerHTML = this.generator.generateScheduleInfoHTML();
            }

            // Update page title and footer
            const routeName = document.getElementById('route-name');
            const footerText = document.getElementById('footer-text');

            if (routeName) {
                routeName.textContent = route.name;
            }

            if (footerText) {
                footerText.textContent = `${route.name} - Fahrplan-Website`;
            }

            // Generate the JavaScript data structure for the main script
            const jsData = this.generator.generateJavaScriptData();
            // console.log('Generated JS data:', jsData);

            window.ferrySchedule = JSON.parse(jsData.replace('const ferrySchedule = ', '').replace(';', ''));
            console.log('Parsed ferry schedule:', window.ferrySchedule);
            console.log('Sample station data:', window.ferrySchedule[Object.keys(window.ferrySchedule)[0]]);

            // Initialize the main app functionality
            if (typeof initializeApp === 'function') {
                console.log('Calling initializeApp...');
                initializeApp();
            } else {
                console.error('initializeApp function not found');
            }

            // Reinitialize the main script functionality
            if (typeof initializeMainScript === 'function') {
                initializeMainScript();
            }
        } catch (error) {
            console.error('Error loading route:', error);
        }
    }

    // Get current route data
    getCurrentRoute() {
        return this.routes[this.currentRoute];
    }

    // Get current route ID
    getCurrentRouteId() {
        return this.currentRoute;
    }
}
