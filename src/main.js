import "./style.css";

import { createAppShell } from "./src/ui/dom.js";
import { loadPartials } from "./utils/partials.mjs";
import { qs, qsa, debounce, normalizeCountryName } from "./src/lib/utils.js";
import { state } from "./src/lib/state.js";
import {
    fetchCategories,
    searchMealsByName,
    searchMealsByIngredient,
    fetchMealsByCategory,
    fetchMealDetailsById,
} from "./src/api/meals.js";
import { fetchCountryByName } from "./src/api/countries.js";
import { renderCategories, renderMeals, renderLoadingGrid, setStatus, showDetails, showDetailsLoading, hideDetails } from "./src/ui/render.js";

function mount() {
    const app = qs("#app");
    app.innerHTML = createAppShell();
}

async function loadCategories() {
    try {
        const cats = await fetchCategories();
        state.categories = cats;
        renderCategories(cats);
    } catch {
        setStatus("Could not load categories. Please refresh the page.", "error");
    }
}

function updateModeFromUI() {
    const modeSel = qs("#mode");
    state.mode = modeSel.value;
}

function updateQueryFromUI() {
    const input = qs("#query");
    state.query = input.value;
}

function setTitle(text) {
    qs("#resultsTitle").textContent = text;
}

async function runSearch({ title, loader, action, metaPrefix }) {
    const q = state.query.trim();

    if (!q) {
        setStatus("Type something to search (example: “chicken” or “pasta”).", "info");
        return;
    }

    hideDetails();
    setTitle(title);
    setStatus("");
    renderLoadingGrid();

    try {
        const meals = await action(q);
        state.meals = meals;

        if (!meals.length) {
            renderMeals([]);
            setStatus("No results found. Try a different search term.", "info");
            qs("#resultsMeta").textContent = "";
            return;
        }

        renderMeals(meals, `${metaPrefix} • ${meals.length} result(s)`);
    } catch {
        renderMeals([]);
        setStatus("Something went wrong while fetching recipes. Try again.", "error");
    } finally {
        // no-op
        void loader;
    }
}

async function searchByName() {
    await runSearch({
        title: "Results (Search by name)",
        loader: true,
        metaPrefix: "Name search",
        action: (q) => searchMealsByName(q),
    });
}

async function searchByIngredient() {
    await runSearch({
        title: "Results (Search by ingredient)",
        loader: true,
        metaPrefix: "Ingredient search",
        action: (q) => searchMealsByIngredient(q),
    });
}

async function handleCategoryClick(categoryName) {
    hideDetails();
    setStatus("");
    setTitle(`Results (Category: ${categoryName})`);
    renderLoadingGrid();

    try {
        const meals = await fetchMealsByCategory(categoryName);
        state.meals = meals;

        if (!meals.length) {
            renderMeals([]);
            setStatus("No meals found for this category.", "info");
            qs("#resultsMeta").textContent = "";
            return;
        }

        renderMeals(meals, `Category • ${meals.length} result(s)`);
    } catch {
        renderMeals([]);
        setStatus("Could not load category meals. Please try again.", "error");
    }
}

async function getCountry(area) {
    const normalized = normalizeCountryName(area);
    if (state.countryCache.has(normalized)) return state.countryCache.get(normalized);

    const country = await fetchCountryByName(normalized);
    state.countryCache.set(normalized, country);
    return country;
}

async function openMealDetails(idMeal) {
    setStatus("");
    showDetailsLoading();
    try {
        const full = await fetchMealDetailsById(idMeal);
        if (!full) {
            setStatus("Could not load recipe details.", "error");
            return;
        }

        let country = null;
        if (full.strArea) {
            try {
                country = await getCountry(full.strArea);
            } catch {
                country = null;
            }
        }
        state.selectedMeal = full;
        state.selectedCountry = country;

        showDetails(full, country);

        // Add back button handler (inside details view)
        const backBtn = qs("#btnBack");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                hideDetails();
            });
        }
    } catch {
        setStatus("Error loading details. Please try again.", "error");
    }
}

function bindEvents() {
    // Home button
    const homeBtn = qs("#btnHome");
    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            hideDetails();
            setStatus("");
            setTitle("Results");
            qs("#resultsMeta").textContent = "";
        });
    }

    // Search submit
    qs("#searchForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        updateModeFromUI();
        updateQueryFromUI();

        if (state.mode === "ingredient") await searchByIngredient();
        else await searchByName();
    });

    // Optional: debounced input (does not auto-search; just clears messages)
    qs("#query").addEventListener(
        "input",
        debounce(() => {
            if (qs("#status")?.textContent) setStatus("");
        }, 250)
    );

    // Category clicks (event delegation)
    qs("#categories").addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-category]");
        if (!btn) return;
        const cat = btn.getAttribute("data-category");
        if (!cat) return;
        await handleCategoryClick(cat);
    });

    // Recipe card click (event delegation)
    qs("#grid").addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-meal-id]");
        if (!btn) return;
        const id = btn.getAttribute("data-meal-id");
        if (!id) return;
        await openMealDetails(id);
    });

    // Refresh categories button
    qs("#btnRandomCat").addEventListener("click", async () => {
        await loadCategories();
    });

    // Keyboard: Escape closes details if open
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            hideDetails();
        }
    });
}

async function init() {
    mount();
    await loadPartials();
    bindEvents();
    await loadCategories();

    // Initial friendly state
    setStatus("Search for a meal (name) or ingredient, or browse categories above.", "info");
    renderMeals([]);
}

init();
