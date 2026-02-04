export async function loadPartials() {
    const headerEl = document.getElementById("app-header");
    const footerEl = document.getElementById("app-footer");

    if (headerEl) {
        headerEl.innerHTML = await fetch("/src/partials/header.html").then((r) => r.text());
    }

    if (footerEl) {
        footerEl.innerHTML = await fetch("/src/partials/footer.html").then((r) => r.text());
    }
}
