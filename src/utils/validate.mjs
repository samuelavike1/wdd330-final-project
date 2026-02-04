export function validateIngredients(value) {
    if (!value) return { valid: false, message: "Please enter at least one ingredient." };

    // Require at least one letter or number
    const hasContent = /[a-z0-9]/i.test(value);
    if (!hasContent) {
        return { valid: false, message: "Ingredients must contain letters or numbers." };
    }

    // Example minimal length guard
    if (value.trim().length < 2) {
        return { valid: false, message: "Please enter a valid ingredient." };
    }

    return { valid: true, message: "" };
}
