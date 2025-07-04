// src/lib/gtag.js

// Your GA4 Measurement ID
export const GA_TRACKING_ID = "G-360522071";

// Track page views
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track specific events (optional)
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
