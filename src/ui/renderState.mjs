const statusEl = document.getElementById("status");

export function setStatus(message) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
}
