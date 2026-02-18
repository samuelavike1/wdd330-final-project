import { MEALDB_BASE } from "../lib/config.js";

async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
}

export async function fetchCategories() {
    const data = await getJson(`${MEALDB_BASE}/categories.php`);
    return data.categories ?? [];
}

export async function searchMealsByName(query) {
    const q = encodeURIComponent(query.trim());
    const data = await getJson(`${MEALDB_BASE}/search.php?s=${q}`);
    return data.meals ?? [];
}

export async function searchMealsByIngredient(ingredient) {
    const q = encodeURIComponent(ingredient.trim());
    const data = await getJson(`${MEALDB_BASE}/filter.php?i=${q}`);
    // filter.php returns partial meals (idMeal, strMeal, strMealThumb)
    return data.meals ?? [];
}

export async function fetchMealsByCategory(category) {
    const q = encodeURIComponent(category);
    const data = await getJson(`${MEALDB_BASE}/filter.php?c=${q}`);
    return data.meals ?? [];
}

export async function fetchMealDetailsById(idMeal) {
    const q = encodeURIComponent(idMeal);
    const data = await getJson(`${MEALDB_BASE}/lookup.php?i=${q}`);
    return (data.meals && data.meals[0]) ? data.meals[0] : null;
}
