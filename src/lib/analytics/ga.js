let MEASUREMENT_ID = null;

export function initGA(measurementId) {
  MEASUREMENT_ID = measurementId;
  if (!measurementId) {
    console.warn("[GA] Missing measurementId");
    return;
  }
  // inject gtag only once
  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(s);

    gtag('js', new Date());
  }
  // tắt auto page_view để tự kiểm soát theo SPA route
  window.gtag('config', measurementId, { send_page_view: false });
}

export function pageview({ path, title }) {
  if (!window.gtag || !MEASUREMENT_ID) return;
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_path: path || window.location.pathname + window.location.search,
    page_title: title || document.title,
    send_to: MEASUREMENT_ID,
  });
}

export function event(name, params = {}) {
  if (!window.gtag) return;
  window.gtag('event', name, params);
}

export function setUserId(userId) {
  if (!window.gtag || !MEASUREMENT_ID) return;
  window.gtag('config', MEASUREMENT_ID, { user_id: String(userId) });
}

export function setUserProperties(props = {}) {
  if (!window.gtag) return;
  window.gtag('set', 'user_properties', props);
}

export function setConsent({
  ad_user_data = 'denied',
  ad_personalization = 'denied',
  analytics_storage = 'granted'
} = {}) {
  if (!window.gtag) return;
  window.gtag('consent', 'update', { ad_user_data, ad_personalization, analytics_storage });
}
