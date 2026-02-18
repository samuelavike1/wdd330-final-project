import { escapeHtml, buildIngredientsList } from "../lib/utils.js";

export function categoryPill(category) {
    const name = escapeHtml(category.strCategory);
    return `
    <button
      class="category-pill px-3 py-1.5 rounded-full border border-orange-200 text-orange-800 bg-white hover:bg-orange-50 text-sm transition"
      data-category="${name}"
      type="button"
    >
      ${name}
    </button>
  `;
}

export function mealCard(meal) {
    const title = escapeHtml(meal.strMeal);
    const img = escapeHtml(meal.strMealThumb || "");
    const id = escapeHtml(meal.idMeal);
    return `
    <article class="fade-in-up bg-white/90 border border-orange-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
      <button
        class="w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-200"
        data-meal-id="${id}"
        type="button"
        aria-label="Open details for ${title}"
      >
        <div class="aspect-[4/3] bg-orange-50 overflow-hidden">
          <img src="${img}" alt="${title}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold leading-snug">${title}</h3>
          <p class="text-sm text-slate-500 mt-1">Tap to view details</p>
        </div>
      </button>
    </article>
  `;
}

export function skeletonCards(count = 6) {
    return Array.from({ length: count })
        .map(() => `
      <div class="bg-white border border-orange-100 rounded-2xl overflow-hidden shadow-sm">
        <div class="aspect-[4/3] skeleton"></div>
        <div class="p-4 grid gap-2">
          <div class="h-4 w-3/4 skeleton rounded"></div>
          <div class="h-3 w-1/2 skeleton rounded"></div>
        </div>
      </div>
    `)
        .join("");
}

export function detailsView(meal, country) {
    const title = escapeHtml(meal.strMeal);
    const img = escapeHtml(meal.strMealThumb || "");
    const category = escapeHtml(meal.strCategory || "Unknown");
    const area = escapeHtml(meal.strArea || "Unknown");

    const ingredients = buildIngredientsList(meal)
        .map(i => `
      <li class="flex items-start justify-between gap-3">
        <span class="font-medium">${escapeHtml(i.ingredient)}</span>
        <span class="text-slate-500">${escapeHtml(i.measure)}</span>
      </li>
    `)
        .join("");

    const instructions = escapeHtml(meal.strInstructions || "")
        .split("\n")
        .filter(Boolean)
        .map(p => `<p class="leading-relaxed">${p}</p>`)
        .join("");

    const flagUrl = country?.flags?.png || country?.flags?.svg || "";
    const countryName = country?.name?.common || "";
    const region = country?.region || "";
    const subregion = country?.subregion || "";

    const countryBlock = country
        ? `
      <div class="flex items-center gap-3 p-4 border border-orange-100 rounded-2xl bg-orange-50/70">
        <img src="${escapeHtml(flagUrl)}" alt="${escapeHtml(countryName)} flag" class="w-10 h-7 object-cover rounded" />
        <div class="min-w-0">
          <p class="text-sm text-slate-500">Origin</p>
          <p class="font-semibold">${escapeHtml(countryName)} <span class="text-slate-500 font-normal">(${escapeHtml(area)})</span></p>
          <p class="text-sm text-slate-500">${escapeHtml(region)}${subregion ? ` • ${escapeHtml(subregion)}` : ""}</p>
        </div>
      </div>
    `
        : `
      <div class="p-4 border border-orange-100 rounded-2xl bg-orange-50/70">
        <p class="text-sm text-slate-500">Origin</p>
        <p class="font-semibold">${escapeHtml(area)}</p>
        <p class="text-sm text-slate-500">Country information not available for this area.</p>
      </div>
    `;

    const youtube = meal.strYoutube ? String(meal.strYoutube) : "";
    const youtubeLink = youtube
        ? `<a class="underline text-orange-600 hover:text-orange-700" href="${escapeHtml(youtube)}" target="_blank" rel="noreferrer">Watch on YouTube</a>`
        : "";

    return `
    <div class="bg-white/95 border border-orange-100 rounded-3xl overflow-hidden shadow-lg fade-in-up">
      <div class="flex items-center justify-between p-4 border-b border-orange-100 bg-white/80">
        <h2 class="text-lg font-semibold">Recipe Details</h2>
        <button id="btnBack" class="px-4 py-2 rounded-full border border-orange-200 text-orange-700 hover:bg-orange-50">
          Back
        </button>
      </div>

      <div class="grid gap-6 p-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="grid gap-4">
          <div class="aspect-[16/9] bg-orange-50 overflow-hidden rounded-2xl">
            <img src="${img}" alt="${title}" class="w-full h-full object-cover" />
          </div>

          <div>
            <h3 class="text-2xl font-semibold">${title}</h3>
            <p class="text-sm text-slate-500 mt-1">Category: <span class="font-medium text-slate-700">${category}</span></p>
            <div class="mt-2 text-sm">${youtubeLink}</div>
          </div>

          <div class="grid gap-2">
            <h4 class="text-lg font-semibold">Instructions</h4>
            <div class="grid gap-3 text-slate-700">${instructions || "<p>No instructions available.</p>"}</div>
          </div>
        </div>

        <aside class="grid gap-4">
          ${countryBlock}

          <div class="p-4 border border-orange-100 rounded-2xl bg-white">
            <h4 class="text-lg font-semibold">Ingredients</h4>
            <ul class="mt-3 grid gap-2 text-sm">${ingredients || "<li>No ingredients listed.</li>"}</ul>
          </div>
        </aside>
      </div>
    </div>
  `;
}
