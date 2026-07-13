import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";
import PageBanner from "@/components/PageBanner";
import ProductsBrowser from "@/components/products/ProductsBrowser";
import { fetchProducts, fetchProductCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products | Madhavbaug",
  description:
    "Explore Madhavbaug's range of Ayurvedic products, diet kits and wellness supplements for heart care, diabetes, digestion, immunity and more.",
};

export const revalidate = 300;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts().catch(() => []),
    fetchProductCategories().catch(() => []),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          backgroundImage="/assets/images/breadcrump/banner-1.webp"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
          title="Our Products"
          description="Ayurvedic diet kits, teas and wellness supplements - crafted to support your heart, metabolism and everyday health."
        />

        <section className="px-5 pt-24 pb-16 sm:px-8 lg:px-10 lg:pt-28">
          <ProductsBrowser products={products} categories={categories} />
        </section>

        <FinalCTA />
      </main>

      <SiteFooter />
      <FloatingActions />
    </>
  );
}
