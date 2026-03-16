# ConnectME Website Update Summary
**Date:** March 2026

The following is a comprehensive list of all codebase changes, updates, and optimizations added to the repository:

## Content & Text Rebranding
- **Tosibox to Tosi Rebrand:** Executed a global find-and-replace across the entire frontend `src` folder. Replaced all occurrences of "Tosibox", "Tosibox Lock", "Tosibox Key", "Tosibox HUB", and "Tosibox Control" with "Tosi", "Tosi Lock", "Tosi Key", "Tosi HUB", and "Tosi Control". This covered `serviceData.js`, `productData.js`, `blogdata1.js`, and all component files.
- **Removed "Applications" Section:** Deleted the applications array (including "Schools and educational facilities", "Shopping malls", etc.) directly from the AQI Monitoring solution section in `serviceData.js`.
- **Text Corrections:**
  - Fixed the spacing typo for "VIA Riyadh Mall" in `ongoingProjects.js`.
  - Corrected the capitalization for "Dubai Hills Park - IoT Street Lighting" in `ongoingProjects.js`.
  - Fixed the text clipping and overlapping issues on the "Meters. Billing." tagline on the dark mode Landing Page.
  - Adjusted Contact page styling so long email strings (e.g., `sales@connectme.biz`) properly wrap on zoomed screens instead of overflowing.

## Image & Asset Updates
- **Global Favicon Update:** Automatically generated and updated all `<link rel="icon">` code across `index.html` and manifest files to point to the new Connect ME logos instead of generic Vite icons.
- **Tosibox Image Filenames:** Manually renamed the physical image files in `src/assets/products` from containing "Tosibox" to "Tosi" to ensure the build path updates wouldn't result in broken image links.
- **Replaced Tosi HUB image:** Created and replaced the legacy Tosibox hub image with a new `Tosi_hub.png` explicitly.
- **About Page Founders:** Converted new profile photos for Prasanna and Mohamed Nasim V.M. to web-optimized `.webp` formats (with high-quality compression for Prasanna). Updated `about.jsx` to render these new headshots.
- **Services Page Migration:** Ported five new utility service images from the Desktop into the `src/assets` folder. Rebuilt the fallback logic to route to these new images across `serviceData.js` and `servicesPage1.jsx`.

## New Features & Pages
- **Privacy Policy Page:** Created a new, fully styled `PrivacyPolicy.jsx` component routing to `/privacy-policy`. 
- **Cookie Consent Integration:** Updated the `CookieConsent.jsx` banner so the privacy policy link natively targets the newly created `/privacy-policy` route.
- **App Routing:** Added the new `<Route path="/privacy-policy" element={<PrivacyPolicy />} />` to the main `App.jsx` router.

## Performance & Build Optimizations
- **Vite Setup:** Refactored `vite.config.js` with manual chunks (`vendor`, `react-router`, `icons`) to drastically reduce the size of the JavaScript bundles, improving initial load times.
- **Asset Compression:** Executed a custom Python script checking the global asset bounds of `src/assets` and compressed over **31 large images** from PNG/JPEG into lossless/lossy WebP files, dropping the total build payload by multiple megabytes.
- **Production Dist Compilation:** Re-ran `npm run build` after every step to ensure the underlying `dist` code being pushed to production environments matched the development frontend.
