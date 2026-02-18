export function createAppShell() {
    return `
      <div id="app-header"></div>
  
      <main id="main" class="max-w-6xl mx-auto px-4 py-6 pb-16">
        <section class="grid gap-4">
          <div id="browse" class="grid gap-4">
            <div class="bg-white/90 border border-orange-100 rounded-2xl p-4 shadow-sm">
              <form id="searchForm" class="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div class="grid gap-2">
                  <label class="text-sm font-medium" for="query">Search recipes</label>
                  <div class="flex flex-col sm:flex-row gap-2">
                    <input
                      id="query"
                      name="query"
                      type="text"
                      placeholder="e.g., chicken, pasta, rice..."
                      class="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white"
                      autocomplete="off"
                    />

                    <div class="flex gap-2">
                      <select
                        id="mode"
                        name="mode"
                      class="px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
                        aria-label="Search mode"
                      >
                        <option value="name">By name</option>
                        <option value="ingredient">By ingredient</option>
                      </select>

                      <button
                        type="submit"
                      class="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 shadow-sm"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  <p class="text-xs text-slate-500">
                    Tip: Use ingredient search for things like “tomato” or “beef”.
                  </p>
                </div>
              </form>
            </div>

            <section class="bg-white/90 border border-orange-100 rounded-2xl p-4 shadow-sm">
              <div class="flex items-center justify-between gap-3">
                <h2 class="text-lg font-semibold">Categories</h2>
                <button id="btnRandomCat" class="text-sm px-3 py-2 rounded-full border border-orange-200 text-orange-700 hover:bg-orange-50">
                  Refresh
                </button>
              </div>
              <div id="categories" class="mt-3 flex flex-wrap gap-2"></div>
            </section>

            <section class="grid gap-3">
              <div class="flex items-center justify-between gap-3">
                <h2 id="resultsTitle" class="text-lg font-semibold">Results</h2>
                <p id="resultsMeta" class="text-sm text-slate-500"></p>
              </div>

              <div id="status" class="hidden"></div>
              <div id="grid" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>
            </section>
          </div>

          <section id="details" class="hidden"></section>
        </section>
      </main>
  
      <div id="app-footer"></div>
    `;
}
