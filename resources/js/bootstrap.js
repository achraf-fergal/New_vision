import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allow your team to quickly build robust real-time web applications.
 */

import "./echo";
/**
 * Ziggy - Route helper for JavaScript
 * Make route() function available globally
 */
if (typeof window.route === "undefined") {
    window.route = function (name, params = {}) {
        const routes = window.Ziggy?.routes || {};
        if (!routes[name]) {
            console.error(`Route "${name}" not found`);
            return "#";
        }
        return routes[name];
    };
}
