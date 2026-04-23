/* Shared nav + footer injection so every page stays consistent.
   If you change nav links or the footer, edit this file only. */

function injectNav(activePage) {
  const nav = `
    <div class="container">
      <a class="nav-logo" href="index.html">mirazhossain.com</a>
      <ul class="nav-links">
        <li><a href="research.html" class="${activePage==='research'?'active':''}">research</a></li>
        <li><a href="writing.html" class="${activePage==='writing'?'active':''}">writing</a></li>
        <li><a href="academic.html" class="${activePage==='academic'?'active':''}">academic</a></li>
        <li><a href="credentials.html" class="${activePage==='credentials'?'active':''}">credentials</a></li>
        <li><a href="services.html" class="${activePage==='services'?'active':''}">services</a></li>
        <li><a href="about.html" class="${activePage==='about'?'active':''}">about</a></li>
        <li><a href="pdfs/miraz_cv.pdf" target="_blank">cv ↓</a></li>
      </ul>
    </div>`;
  const navEl = document.querySelector('nav');
  if (navEl) navEl.innerHTML = nav;
}

function injectFooter() {
  const footer = `
    <div class="container">
      <p class="footer-text">© 2026 Md. Miraz Hossain · Dhaka, Bangladesh</p>
      <div class="footer-links">
        <a href="mailto:miraz8395@gmail.com">email</a>
        <a href="https://linkedin.com/in/miraz-hossain" target="_blank">linkedin</a>
        <a href="pdfs/miraz_cv.pdf" target="_blank">cv ↓</a>
      </div>
    </div>`;
  const footerEl = document.querySelector('footer');
  if (footerEl) footerEl.innerHTML = footer;
}

// Auto-init on every page that includes this script
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || '';
  injectNav(page);
  injectFooter();
});
