"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, PackageX, LayoutGrid } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/products";
import ProductCard from "./ProductCard";
import SearchSelect from "../ui/SearchSelect";

const PAGE_SIZE = 12;

/**
 * Client-side catalogue browser. All products + categories are fetched once on
 * the server and passed in; filtering by category and free-text search happens
 * instantly in-memory. Category is deep-linkable via ?category=<slug>.
 */
export default function ProductsBrowser({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  /* Pre-select category from the URL (?category=slug). */
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    if (c) setActive(c.trim());
  }, []);

  /* Keep the URL in sync so the filter is shareable, without a navigation. */
  useEffect(() => {
    const url = new URL(window.location.href);
    if (active) url.searchParams.set("category", active);
    else url.searchParams.delete("category");
    window.history.replaceState(null, "", url);
  }, [active]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const inCat = !active || p.categories.some((c) => c.slug === active);
      const inSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.categories.some((c) => c.name.toLowerCase().includes(q));
      return inCat && inSearch;
    });
  }, [products, active, search]);

  /* Reset the visible window whenever the filters change. */
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [active, search]);

  const shown = filtered.slice(0, visible);
  const activeName = categories.find((c) => c.slug === active)?.name;

  return (
    <div className="mx-auto w-full container">
      {/* ---------- Category dropdown + search ---------- */}
      <div className="mb-8 grid gap-3 sm:grid-cols-[minmax(0,280px)_1fr]">
        <SearchSelect
          label="All Categories"
          icon={<LayoutGrid className="h-4 w-4" />}
          value={active}
          options={categories.map((c) => ({ value: c.slug, label: `${c.name} (${c.count})` }))}
          onChange={setActive}
        />
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-[45px] w-full rounded-full border border-gray-200 bg-white pl-11 pr-10 text-sm text-gray-700 shadow-sm outline-none transition-colors placeholder:text-gray-400 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ---------- Result summary ---------- */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
          {activeName ? ` in ${activeName}` : ""}
          {search ? ` matching “${search}”` : ""}
        </p>
        {(active || search) && (
          <button
            type="button"
            onClick={() => {
              setActive("");
              setSearch("");
            }}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple hover:underline"
          >
            <X className="h-3.5 w-3.5" /> Clear filters
          </button>
        )}
      </div>

      {/* ---------- Grid ---------- */}
      {shown.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-[30px] bg-surface-lav px-6 py-20 text-center">
          <PackageX className="h-8 w-8 text-brand-purple" />
          <p className="text-sm text-gray-600">
            No products match your filter. Try another category or keyword.
          </p>
        </div>
      )}

      {/* ---------- Load more ---------- */}
      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn-gradient cursor-pointer rounded-full px-8 py-3 text-sm font-medium text-white shadow-md transition-shadow hover:shadow-lg"
          >
            Load more products
          </button>
        </div>
      )}
    </div>
  );
}

