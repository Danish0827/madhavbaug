import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import type { Product } from "@/lib/products";

/**
 * Catalogue product card — used on the products listing grid and in the
 * related-products strip on a single product page. The whole card links to the
 * internal detail page; images are optional (some products have none).
 */
export default function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`;
  const primaryCat = product.categories.find((c) => c.slug !== "uncategorized");

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        {product.image ? (
          <Image
            src={product.image.medium}
            alt={product.image.alt || product.title}
            width={1000}
            height={1000}
            className="object-contain transition-transform duration-300 "
            
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-purple/40">
            <Package className="h-12 w-12" />
            <span className="px-4 text-center text-xs font-medium">{product.title}</span>
          </div>
        )}
        {primaryCat && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-brand-purple shadow-sm backdrop-blur">
            {primaryCat.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base leading-snug text-ink line-clamp-2 group-hover:text-brand-purple">
          {product.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-brand-purple">
          View Details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
