export function qs(sel, root = document) {
    return root.querySelector(sel);
}

export function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
}

export function escapeHtml(str = "") {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function debounce(fn, delay = 350) {
    let t = null;
    return (...args) => {
        if (t) clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

export function normalizeCountryName(area) {
    // TheMealDB "Area" values aren’t always exact country names.
    // Handle common mismatches safely.
    const map = new Map([
        ["American", "United States"],
        ["British", "United Kingdom"],
        ["Canadian", "Canada"],
        ["Chinese", "China"],
        ["Croatian", "Croatia"],
        ["Dutch", "Netherlands"],
        ["Egyptian", "Egypt"],
        ["French", "France"],
        ["Greek", "Greece"],
        ["Indian", "India"],
        ["Irish", "Ireland"],
        ["Italian", "Italy"],
        ["Jamaican", "Jamaica"],
        ["Japanese", "Japan"],
        ["Kenyan", "Kenya"],
        ["Malaysian", "Malaysia"],
        ["Mexican", "Mexico"],
        ["Moroccan", "Morocco"],
        ["Polish", "Poland"],
        ["Portuguese", "Portugal"],
        ["Russian", "Russia"],
        ["Spanish", "Spain"],
        ["Thai", "Thailand"],
        ["Tunisian", "Tunisia"],
        ["Turkish", "Turkey"],
        ["Vietnamese", "Vietnam"],
    ]);

    return map.get(area) ?? area;
}

export function buildIngredientsList(meal) {
    // TheMealDB stores ingredients as strIngredient1..20 and measures strMeasure1..20
    const items = [];
    for (let i = 1; i <= 20; i += 1) {
        const ing = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
            items.push({
                ingredient: ing.trim(),
                measure: (meas || "").trim(),
            });
        }
    }
    return items;
}
