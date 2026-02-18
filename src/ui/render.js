import { qs } from "../lib/utils.js";
import { categoryPill, mealCard, skeletonCards, detailsView } from "./templates.js";

export function setStatus(message, type = "info") {
    const el = qs("#status");
    if (!message) {
        el.className = "hidden";
        el.innerHTML = "";
        return;
    }

    const base = "fade-in-up p-3 rounded-xl border text-sm";
    const styles =
        type === "error"
            ? "bg-red-50 border-red-200 text-red-800"
            : type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-slate-50 border-slate-200 text-slate-700";

    el.className = `${base} ${styles}`;
    el.innerHTML = message;
}

export function renderCategories(categories) {
    const wrap = qs("#categories");
    wrap.innerHTML = categories.map(categoryPill).join("");
}

export function renderMeals(meals, metaText = "") {
    qs("#resultsMeta").textContent = metaText;
    const grid = qs("#grid");
    grid.innerHTML = meals.map(mealCard).join("");
}

export function renderLoadingGrid() {
    qs("#grid").innerHTML = skeletonCards(6);
}

export function showDetailsLoading() {
    const browse = qs("#browse");
    const details = qs("#details");
    if (browse) browse.className = "hidden";
    details.className = "";
    details.innerHTML = `
    <div class="bg-white/95 border border-orange-100 rounded-3xl overflow-hidden shadow-lg p-6">
      <div class="flex items-center gap-3">
        <span class="spinner" aria-hidden="true"></span>
        <div class="text-sm text-slate-600" role="status" aria-live="polite">Loading details...</div>
      </div>
    </div>
  `;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function showDetails(meal, country) {
    const browse = qs("#browse");
    const details = qs("#details");
    if (browse) browse.className = "hidden";
    details.className = "";
    details.innerHTML = detailsView(meal, country);

    // Make details feel like a dedicated page
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function hideDetails() {
    const browse = qs("#browse");
    const details = qs("#details");
    details.className = "hidden";
    details.innerHTML = "";
    if (browse) browse.className = "grid gap-4";
}
