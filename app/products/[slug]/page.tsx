import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, Package, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import ProductCard from "@/components/products/ProductCard";
import { fetchProductBySlug } from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

const LOCATOR = "/clinic-hospital-locator";

const PROSE =
  "text-sm leading-relaxed text-gray-600 lg:text-base [&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:space-y-2.5 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[9px] [&_li]:before:h-2 [&_li]:before:w-2 [&_li]:before:rounded-full [&_li]:before:bg-brand-purple";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await fetchProductBySlug(slug).catch(() => null);
  if (!p) return { title: "Product | Madhavbaug" };
  const plain = p.description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return {
    title: `${p.title} | Madhavbaug`,
    description: plain.slice(0, 160) || `${p.title} - a Madhavbaug wellness product.`,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = await fetchProductBySlug(slug).catch(() => null);
  if (!p) notFound();

  const primaryCat = p.categories.find((c) => c.slug !== "uncategorized");

  return (
    <>
      <Navbar />
      <main>
        {/* ---------- Breadcrumb ---------- */}
        <section className="border-b border-gray-100 bg-surface-lav/50 px-5 pt-28 pb-5 sm:px-8 lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto flex w-full container flex-wrap items-center gap-2 text-sm"
          >
            <Link href="/" className="text-brand-purple hover:underline">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <Link href="/products" className="text-brand-purple hover:underline">Products</Link>
            {primaryCat && (
              <>
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                <Link
                  href={`/products?category=${primaryCat.slug}`}
                  className="text-brand-purple hover:underline"
                >
                  {primaryCat.name}
                </Link>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-ink">{p.title}</span>
          </nav>
        </section>

        {/* ---------- Product hero ---------- */}
        <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mx-auto grid w-full container items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[30px] bg-surface-lav ring-1 ring-black/5">
              {p.image ? (
                <Image
                  src={p.image.large}
                  alt={p.image.alt || p.title}
                  fill
                  priority
                  className="object-contain p-8"
                  sizes="(max-width:1024px) 100vw, 600px"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-brand-purple/40">
                  <Package className="h-20 w-20" />
                  <span className="px-6 text-center text-sm font-medium">{p.title}</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:pt-4">
              {p.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.categories
                    .filter((c) => c.slug !== "uncategorized")
                    .map((c) => (
                      <Link
                        key={c.id}
                        href={`/products?category=${c.slug}`}
                        className="rounded-full bg-brand-purple/[0.08] px-3 py-1 text-xs font-medium text-brand-purple transition-colors hover:bg-brand-purple/15"
                      >
                        {c.name}
                      </Link>
                    ))}
                </div>
              )}

              <h1 className="font-display mt-4 text-3xl leading-tight text-ink lg:text-[38px]">
                {p.title}
              </h1>

              {p.description ? (
                <div
                  className={`mt-5 ${PROSE}`}
                  dangerouslySetInnerHTML={{ __html: p.description }}
                />
              ) : (
                <p className="mt-5 text-sm leading-relaxed text-gray-600">
                  A Madhavbaug wellness product. Speak to our doctors to see if it fits your care plan.
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <ShoppingBag className="h-4 w-4" /> Buy Now
                </a>
                <Link
                  href={LOCATOR}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-purple/40 px-6 py-3.5 text-sm font-semibold text-brand-purple transition-colors hover:bg-brand-purple/5"
                >
                  Book a Consultation <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-gray-400">
                Please consult a Madhavbaug doctor before starting any new product or diet plan.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Related products ---------- */}
        {p.related.length > 0 && (
          <section className="bg-surface-lav px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <div className="mx-auto w-full container">
              <div className="mb-10 text-center">
                <div className="flex justify-center">
                  <SectionLabel>You May Also Like</SectionLabel>
                </div>
                <h2 className="font-display mt-4 text-2xl text-ink lg:text-[32px]">
                  Related Products
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {p.related.slice(0, 8).map((r) => (
                  <ProductCard key={r.id} product={r} />
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
