# Ikenna Joshua Salvation — Portfolio

A responsive, multi-page personal portfolio built with HTML, CSS and vanilla JavaScript.

## Files
- `index.html` — homepage
- `about.html` — background and interests
- `projects.html` — project portfolio
- `planner.html` — browser-based task planner (uses localStorage)
- `contact.html` — contact form that opens the visitor's email application
- `style.css` — shared styles for inner pages
- `home.css` — homepage styles and shared stylesheet import
- `script.js` — mobile navigation, current year and planner/contact interactions
- `images/` — add your own image assets here

## Before publishing
1. Add your portrait as `images/profile.jpg`.
2. Optionally add a project screenshot as `images/project-1.jpg`.
3. Replace `YOUR-USERNAME` in GitHub and LinkedIn links.
4. Replace `YOUR-EMAIL@example.com` in `contact.html` and the `data-recipient` attribute with the email address you want to receive enquiries at.
5. Check the project descriptions and only keep projects you are comfortable presenting publicly.

## Run locally
Open `index.html` in a browser. For a more reliable local preview, use the VS Code Live Server extension.

## Publish with GitHub Pages
1. Create a GitHub repository (for example, `my-portfolio`).
2. Upload the contents of this folder to the repository root. `index.html` must be in the root, not inside another nested folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and the `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish and open the URL it provides.

## Notes
- The planner stores tasks only in the current browser on the current device. Clearing browser site data can remove them.
- The contact form is front-end only. It prepares an email through the visitor's configured email application. For a server-side form submission, connect a form service such as Formspree and update the form handling.
- Google Fonts and Font Awesome are loaded from external CDNs, so those assets require an internet connection.
