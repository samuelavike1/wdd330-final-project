export const state = {
    view: "home", // "home" | "details"
    query: "",
    mode: "name", // "name" | "ingredient"
    categories: [],
    meals: [],
    selectedMeal: null,
    selectedCountry: null,
    loading: false,
    error: "",
    countryCache: new Map(), // key: normalized country name, value: country object | null
};
