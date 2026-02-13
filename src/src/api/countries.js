import { COUNTRIES_BASE, COUNTRIES_FIELDS } from "../lib/config.js";

async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) return null; // if not found, treat as null (no crash)
    return res.json();
}

export async function fetchCountryByName(countryName) {
    const q = encodeURIComponent(countryName);
    const url = `${COUNTRIES_BASE}/name/${q}?fullText=true&fields=${encodeURIComponent(COUNTRIES_FIELDS)}`;
    const data = await getJson(url);
    if (!data || !Array.isArray(data) || !data[0]) return null;
    return data[0];
}
