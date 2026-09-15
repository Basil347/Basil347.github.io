# Basil Mathew Cibi — Portfolio

A responsive portfolio built with HTML, CSS, and vanilla JavaScript. There are no dependencies, build steps, tracking scripts, third-party fonts, or backend services. All content and links work without JavaScript; JavaScript adds a collapsible mobile menu, section highlighting, subtle entrance animations, and the current footer year.

The visual theme uses sapphire blue, navy text, soft gradient backgrounds, rounded buttons, and white cards with subtle shadows. Featured projects sit side by side on desktop and stack on phones. Theme colors and shared shadow/radius values are defined at the top of `style.css`.

### Dark mode and animations

Use the moon/sun button in the header to switch between light and dark mode. Dark mode is the default for every visitor, regardless of system appearance; an explicit selection is saved in your browser under `basil-theme` and restored on your next visit. Clear this site’s browser storage to return to the dark default. Switching still works when storage is blocked, but the selection cannot persist. The page also carries `data-theme="dark"` on the `<html>` element, so JavaScript-disabled visitors get the dark theme too (the toggle stays hidden for them).

Buttons and card icons jump gently on hover, project graphics lift, and sections enter with a small bounce. Your name floats gently up and down in a continuous six-second loop, alongside the animated solar-system artwork and floating hero labels. Your system’s reduced-motion preference disables these animations, including when you change that preference with the page open. The name animation is also disabled when printing.

To customize these effects, search `style.css` for `name-float`, `element-jump`, `label-float`, and `enter`. Change the negative pixel values for jump height or the animation durations for speed. Dark colors are grouped under `:root[data-theme="dark"]`; dark surface overrides follow that block. The short script in the document head applies the theme before the first paint, and `script.js` handles the toggle and saving your choice.

## Files

```text
index.html                 Content, navigation, links, and sharing metadata
style.css                  Colors, typography, layouts, and responsive styles
script.js                  Accessible mobile menu and progressive enhancements
assets/
  favicon.svg              BMC browser icon
  insightforge.svg          Decorative project illustration
  hospital-bot.svg          Decorative project illustration
  resume.pdf               Downloadable resume, copied without modification
resume/                    Your original supplied resume (preserved)
```

## 1. Preview in VS Code

1. Open VS Code, choose **File → Open Folder**, and select this portfolio folder.
2. Open `index.html`. For the simplest preview, open this file directly in a browser.
3. For automatic refreshing while you edit, install the **Live Server** extension by Ritwick Dey in VS Code. Right-click `index.html` and choose **Open with Live Server**.
4. Save changes and check the browser. Use its device toolbar to preview narrow phone widths as well as desktop sizes.

If Python 3 is installed, you can also open the VS Code terminal in this folder and run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

On Windows, use `py -m http.server 8000 --bind 127.0.0.1` if `python3` is unavailable. Open <http://localhost:8000>. Press **Ctrl+C** in the terminal to stop the server. This is only a local preview, not publication.

## 2. Edit content, screenshots, and project links

- Edit text directly in `index.html`. Search for the section IDs: `about`, `experience`, `projects`, `skills`, `education`, and `contact`.
- Change the color variables at the top of `style.css` to adjust the palette. Fonts use the visitor’s system font and need no network requests.
- The dates and education wording reflect the supplied information. Keep them accurate when updating your experience.
- The footer year updates automatically with JavaScript. Update its fallback text in `index.html` annually for visitors who disable JavaScript.

### Add real project screenshots

The current graphics are abstract illustrations, visibly labeled as decorative. They are not application screenshots.

1. Save an optimized screenshot in `assets/`, for example `insightforge-screenshot.webp`. Use a short filename without spaces. Aim for a file under about 300 KB when practical.
2. Search `index.html` for `SCREENSHOT`. Replace the corresponding `<img>` source and use a description of the actual visible screen as its `alt` text. Update `width` and `height` to the image’s actual dimensions.
3. Update the `<figcaption>` to accurately describe the screenshot and remove “Decorative illustration.” For example, if the image actually shows model evaluation, use “InsightForge — model evaluation.”
4. Add `screenshot` to that figure’s classes and append this CSS to remove the decorative blending and allow the image to scale naturally:

```css
.project-visual.screenshot {
  height: auto;
  padding: 60px 16px 48px;
}
.project-visual.screenshot img {
  height: auto;
  object-fit: contain;
  mix-blend-mode: normal;
  border-radius: 8px;
}
```

Review the result on desktop and mobile. Decorative images intentionally have empty `alt` attributes; actual informative screenshots should have meaningful alt text.

### Add project source-code or demo URLs

Search for `PROJECT URLS` in `index.html`. Once you have a real, tested URL, add an anchor there using the `text-link` class, descriptive text such as **View InsightForge source code**, and the actual URL in `href`. For new tabs, add `target="_blank" rel="noopener noreferrer"` and indicate that a new tab opens.

The GitHub profile link (`https://github.com/Basil347`) appears twice: in the hero next to the LinkedIn link, and in the contact panel. Update both if the profile URL ever changes. Per-project source-code links are still absent because none were supplied — add one only once you have the real, tested URL. Never use `href="#"` as a placeholder.

## 3. Replace the resume

The supplied `resume/Basil_Mathew_Cibi_1066.pdf` was copied byte for byte to `assets/resume.pdf`. The introduction’s **Download Resume** link already points to that copy.

To update it, replace `assets/resume.pdf` with your new PDF, keeping the same filename. Click the download link and open the downloaded file to confirm the content. The HTML `download` attribute suggests the filename `Basil_Mathew_Cibi_Resume.pdf`; browsers may handle PDF downloads differently.

If you rename the PDF, update the link’s `href` in `index.html`. If you remove the resume, remove the entire download anchor. To enable it later, put the PDF at `assets/resume.pdf` and add this inside `.hero-actions`:

```html
<a class="button button-secondary" href="assets/resume.pdf"
   download="Basil_Mathew_Cibi_Resume.pdf">Download Resume</a>
```

The original `resume/` folder is retained locally. Only `assets/resume.pdf` is needed for the website; you do not need to upload the original folder.

## 4. Publish with GitHub Pages

Nothing has been published automatically. When you are ready:

1. Sign in to GitHub and create a public repository, for example `portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and the complete `assets/` folder to the repository’s root. You can include this README. Ensure `index.html` is directly in the root, not inside an extra portfolio folder.
3. Commit the files to the `main` branch.
4. Open the repository’s **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/ (root)**, then save.
5. Wait for deployment to finish, then copy the actual published URL shown by GitHub Pages. Test that URL on your phone, including the resume and contact links.

These steps follow the [official GitHub Pages publishing-source guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). No build command is needed. All asset links are relative so they work under a repository subpath.

After publishing, add `<meta property="og:url" content="YOUR_ACTUAL_PUBLISHED_URL">` in the document `<head>`, replacing the example value with the real URL. Only add `og:image` and `twitter:image` when you have created and uploaded a real preview image, using its full published URL. No website URL or missing preview image is currently declared.

To make future changes, edit locally, preview, and upload or commit the updated files to the same branch. GitHub Pages redeploys from that branch.

## 5. Share your portfolio

- Copy the published website URL from GitHub Pages, rather than a local preview address or a repository URL.
- Add it to your LinkedIn profile’s website/contact information or as a link in the Featured section, with a title such as **Basil Mathew Cibi — Software Engineer Portfolio**. LinkedIn’s available editing options may vary.
- Add a clickable **Portfolio** link beside your email and LinkedIn details in your resume. Export to PDF, then test the hyperlink in the exported file.
- Include the same published URL in job applications. Check the site after replacing the resume or updating project links.

## Checks before sharing

- Test navigation, the mobile menu, Escape to close it, and keyboard focus with Tab.
- Check phone, tablet, and desktop widths for overflow and readable content.
- Try the page with JavaScript disabled: content, navigation, resume, and contact links should remain available.
- Turn on your system’s reduced-motion preference to disable animations and smooth scrolling.
- Download the resume and confirm it is your intended version.
- Check email and LinkedIn destinations. Email opens the visitor’s configured mail application; no form or backend is used.
- Inspect the browser console for errors and confirm that all assets load.

## Local verification completed

Verified in headless Google Chrome using a local HTTP server:

- No horizontal overflow at 320, 375, 390, 600, 768, 1024, and 1440 pixel viewport widths.
- All six navigation anchors resolve and leave their section visible below the sticky header.
- The mobile menu opens with Enter, closes with Escape, returns focus to its button, and moves focus to the selected section after navigation.
- The resume downloads through the browser and matches the original PDF byte for byte.
- Reduced-motion mode disables smooth scrolling and entrance animations.
- Content and mobile navigation remain available with JavaScript disabled.
- Local assets load, internal anchors resolve, IDs are unique, and there are no empty placeholder links, browser console errors, or failed HTTP responses.
- Desktop and mobile screenshots were visually reviewed. Main text and label colors were checked for contrast; the section-number color was adjusted to meet 4.5:1 against its light background.
- Email and LinkedIn link destinations match the supplied contact details.
- Both light and dark themes fit all seven tested widths. Dark text, labels, and accent buttons pass 4.5:1 contrast checks.
- The theme toggle works with Enter, follows system appearance before an explicit choice, and restores saved light/dark selections on reload. Blocked storage does not break switching or navigation.
- The jump animation runs on keyboard focus and stops when reduced motion is enabled while the page is open. Headless Chrome reports no hover-capable pointer, so pointer hover effects were reviewed in CSS rather than verified with a physical mouse.

Not tested: physical devices, Safari or Firefox, operating-system mail handling, LinkedIn availability/login, or a published GitHub Pages deployment. No email was sent and no site was published.
