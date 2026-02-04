export function renderRecipeCards(recipes, container) {
    container.innerHTML = "";

    recipes.forEach((r) => {
        const card = document.createElement("article");
        card.className =
            "group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

        const media = document.createElement("div");
        media.className = "aspect-[4/3] bg-gradient-to-br from-[#4CAF50]/15 to-[#FF9800]/15";

        const inner = document.createElement("div");
        inner.className = "p-4";

        const title = document.createElement("h3");
        title.className = "font-semibold leading-snug group-hover:text-[#4CAF50] transition";
        title.textContent = r.title;

        const desc = document.createElement("p");
        desc.className = "mt-1 text-sm text-black/60";
        desc.textContent = r.summary || "Preview available after API integration.";

        const pillRow = document.createElement("div");
        pillRow.className = "mt-3 flex items-center gap-2";

        const pill = document.createElement("span");
        pill.className =
            "inline-flex items-center rounded-full bg-[#4CAF50]/10 px-2.5 py-1 text-xs font-medium text-[#2E7D32]";
        pill.textContent = "Recipe";

        const pill2 = document.createElement("span");
        pill2.className =
            "inline-flex items-center rounded-full bg-[#FF9800]/10 px-2.5 py-1 text-xs font-medium text-[#C77700]";
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
