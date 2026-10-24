// Charge la police Inter depuis /config/www/fonts/ (100 % local, aucun CDN).
// À déclarer dans frontend: extra_module_url (voir theme-README.md).
const css = `
@font-face { font-family: "Inter"; font-style: normal; font-weight: 100 900; font-display: swap;
  src: url("/local/fonts/InterVariable.woff2") format("woff2"); }
@font-face { font-family: "Inter"; font-style: italic; font-weight: 100 900; font-display: swap;
  src: url("/local/fonts/InterVariable-Italic.woff2") format("woff2"); }`;
const s = document.createElement("style");
s.textContent = css;
document.head.appendChild(s);
