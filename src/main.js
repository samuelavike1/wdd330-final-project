import "./style.css";
import { loadPartials } from "./utils/partials.mjs";
import { setStatus } from "./ui/renderState.mjs";
import { validateIngredients } from "./utils/validate.mjs";
import { renderRecipeCards } from "./ui/renderRecipes.mjs";

await loadPartials();

// Now query DOM after partials are loaded
const form = document.getElementById("searchForm");
const ingredientsInput = document.getElementById("ingredients");
const resultsEl = document.getElementById("results");
const formErrorEl = document.getElementById("formError");
const searchBtn = document.getElementById("searchBtn");

// State elements
const stateInitial = document.getElementById("stateInitial");
const stateLoading = document.getElementById("stateLoading");
const stateEmpty = document.getElementById("stateEmpty");
const stateError = document.getElementById("stateError");
const clearBtn = document.getElementById("clearBtn");
const retryBtn = document.getElementById("retryBtn");

function showState(which) {
    stateInitial.classList.add("hidden");
    stateLoading.classList.add("hidden");
    stateEmpty.classList.add("hidden");
    stateError.classList.add("hidden");
    if (which) which.classList.remove("hidden");
}

function setLoading(isLoading) {
    searchBtn.disabled = isLoading;
    if (isLoading) {
        searchBtn.classList.add("opacity-80", "cursor-not-allowed");
        showState(stateLoading);
        setStatus("Loading…");
    } else {
        searchBtn.classList.remove("opacity-80", "cursor-not-allowed");
        setStatus("");
    }
}

function clearError() {
    formErrorEl.textContent = "";
}

function showError(msg) {
    formErrorEl.textContent = msg;
}

function clearResults() {
    resultsEl.innerHTML = "";
}

function wireSuggestionChips() {
    document.querySelectorAll("[data-suggest]").forEach((btn) => {
        btn.addEventListener("click", () => {
            ingredientsInput.value = btn.dataset.suggest || "";
            ingredientsInput.focus();
        });
    });
}

clearBtn?.addEventListener("click", () => {
    ingredientsInput.value = "";
    clearError();
    clearResults();
    setStatus("");
    showState(stateInitial);
});

retryBtn?.addEventListener("click", () => {
    form.requestSubmit();
});

// Initial view
showState(stateInitial);
wireSuggestionChips();

// Submit handler
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    const ingredients = ingredientsInput.value.trim();
    const { valid, message } = validateIngredients(ingredients);

    if (!valid) {
        showError(message);
        clearResults();
        showState(stateInitial);
        setStatus("");
        return;
    }

    setLoading(true);
    clearResults();

    try {
        // Week 5 placeholder results (next: connect Spoonacular API)
        await new Promise((r) => setTimeout(r, 550));

        let data = [
            { id: 1, title: "Grilled Chicken Bowl", image: null, summary: "Quick protein meal" },
            { id: 2, title: "Tomato Garlic Pasta", image: null, summary: "Simple pantry pasta" },
            { id: 3, title: "Avocado Bean Salad", image: null, summary: "Fresh and filling" },
        ];

        if (ingredients.toLowerCase().includes("zzzz")) data = [];

        setLoading(false);

        if (data.length === 0) {
            showState(stateEmpty);
            setStatus("No results.");
            return;
        }

        showState(null);
        renderRecipeCards(data, resultsEl);
        setStatus(`Found ${data.length} recipes.`);
    } catch (err) {
        console.error(err);
        setLoading(false);
        clearResults();
        showState(stateError);
        setStatus("");
    }
});
