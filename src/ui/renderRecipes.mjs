export function renderRecipeCards(recipes, container) {
    container.innerHTML = "";

    recipes.forEach((r) => {
        const card = document.createElement("article");
        card.className =
            "recipe-card group overflow-hidden rounded-2xl transition";

        const media = document.createElement("div");
        media.className = "recipe-media aspect-[4/3]";

        const inner = document.createElement("div");
        inner.className = "p-4";

        const title = document.createElement("h3");
        title.className = "font-semibold leading-snug group-hover:text-[#3f8c6a] transition";
        title.textContent = r.title;

        const desc = document.createElement("p");
        desc.className = "mt-1 text-sm text-black/60";
        desc.textContent = r.summary || "Preview available after API integration.";

        const pillRow = document.createElement("div");
        pillRow.className = "mt-3 flex items-center gap-2";

        const pill = document.createElement("span");
        pill.className =
            "recipe-pill inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";
        pill.textContent = "Recipe";

        const pill2 = document.createElement("span");
        pill2.className =
            "recipe-pill recipe-pill--accent inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";
        pill2.textContent = "Nutrition next";

        pillRow.appendChild(pill);
        pillRow.appendChild(pill2);

        inner.appendChild(title);
        inner.appendChild(desc);
        inner.appendChild(pillRow);

        card.appendChild(media);
        card.appendChild(inner);

        container.appendChild(card);
    });
}
