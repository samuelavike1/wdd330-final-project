import headerHtml from "../partials/header.html?raw";
import footerHtml from "../partials/footer.html?raw";

export async function loadPartials() {
    const headerEl = document.getElementById("app-header");
    const footerEl = document.getElementById("app-footer");

    if (headerEl) {
        headerEl.innerHTML = headerHtml;
    }

    if (footerEl) {
        footerEl.innerHTML = footerHtml;
    }
}
