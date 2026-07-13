/**
 * Product catalogue data layer.
 *
 * Wraps the Madhavbaug WordPress product REST API and normalises the raw
 * payloads (HTML entities in titles/category names, nullable images, HTML
 * description) into clean, typed shapes the UI can render directly. All fetches
 * run server-side (from Server Components) with short revalidation.
 *
 * Endpoints:
 *   GET /products                              -> all products
 *   GET /products/product-category            -> all categories
 *   GET /products/single/<slug>               -> one product + related
 *   GET /products/product-category/<slug>     -> products in a category
 */

const BASE = "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1/products";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Referer: "https://madhavbaug.hclient.in/",
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&#038;": "&",
  "&#38;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&#8217;": "’",
  "&#8211;": "-",
  "&#8212;": "-",
  "&nbsp;": " ",
  "&lt;": "<",
  "&gt;": ">",
};

function decodeEntities(input = ""): string {
  return input.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}

/* ------------------------------------------------------------------ types */

export type ProductImage = {
  url: string;
  medium: string;
  large: string;
  alt: string;
} | null;

export type ProductCategoryRef = { id: number; name: string; slug: string };

export type Product = {
  id: number;
  title: string;
  slug: string;
  /** Upstream WooCommerce store URL (external "Buy" target). */
  link: string;
  image: ProductImage;
  categories: ProductCategoryRef[];
};

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type ProductDetail = Product & {
  /** Rich-text HTML product description. */
  description: string;
  related: Product[];
};

/* ---------------------------------------------------------------- raw shapes */

type RawImage = {
  url?: string;
  medium?: string;
  large?: string;
  thumbnail?: string;
  alt?: string;
} | null;

type RawCategory = { id: number; name: string; slug: string; count?: number };

type RawProduct = {
  id: number;
  title: string;
  slug: string;
  link: string;
  featured_image?: RawImage;
  categories?: RawCategory[];
  product_description?: string;
  related_products?: RawProduct[];
};

/* ---------------------------------------------------------------- normalisers */

function normImage(img: RawImage): ProductImage {
  if (!img?.url) return null;
  return {
    url: img.url,
    medium: img.medium || img.url,
    large: img.large || img.url,
    alt: decodeEntities(img.alt || ""),
  };
}

function normCategoryRef(c: RawCategory): ProductCategoryRef {
  return { id: c.id, name: decodeEntities(c.name), slug: c.slug };
}

function normProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    title: decodeEntities(raw.title),
    slug: raw.slug,
    link: raw.link,
    image: normImage(raw.featured_image ?? null),
    categories: (raw.categories ?? []).map(normCategoryRef),
  };
}

/* ---------------------------------------------------------------- fetchers */

/** All products for the catalogue grid. */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(BASE, { headers: FETCH_HEADERS, next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Products returned ${res.status}`);
  const json: { data?: RawProduct[] } = await res.json();
  return (json.data ?? []).map(normProduct);
}

/** All product categories (with product counts) for the filter bar. */
export async function fetchProductCategories(): Promise<ProductCategory[]> {
  const res = await fetch(`${BASE}/product-category`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Categories returned ${res.status}`);
  const json: { data?: RawCategory[] } = await res.json();
  return (json.data ?? [])
    .map((c) => ({ id: c.id, name: decodeEntities(c.name), slug: c.slug, count: c.count ?? 0 }))
    .filter((c) => c.slug !== "uncategorized" && c.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** One product's full detail by slug (with related products). */
export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  const res = await fetch(`${BASE}/single/${encodeURIComponent(slug)}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Product returned ${res.status}`);

  const json: { success?: boolean; data?: RawProduct } = await res.json();
  const raw = json.data;
  if (!raw?.id) return null;

  return {
    ...normProduct(raw),
    description: raw.product_description ?? "",
    related: (raw.related_products ?? []).map(normProduct),
  };
}

/** Products within a single category (used for deep-linked category views). */
export async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(`${BASE}/product-category/${encodeURIComponent(slug)}`, {
    headers: FETCH_HEADERS,
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Category products returned ${res.status}`);
  const json: { data?: RawProduct[] } = await res.json();
  return (json.data ?? []).map(normProduct);
}
