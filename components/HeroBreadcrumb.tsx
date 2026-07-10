import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LeadForm from "./lp/LeadForm";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface ButtonProps {
    label: string;
    href: string;
}

interface HeroBreadcrumbProps {
    image: string;
    imageAlt: string;
    heroTitle: string;
    heroDescription: string;
    pageTitle: string;
    breadcrumbs: BreadcrumbItem[] | null;
    primaryButton?: ButtonProps | null;
    secondaryButton?: ButtonProps | null;
}
export default function HeroBreadcrumb({
    image,
    imageAlt,
    heroTitle,
    heroDescription,
    primaryButton,
    secondaryButton,
    breadcrumbs,
    pageTitle,
}: HeroBreadcrumbProps) {
    return (
        <section className="relative pb-20 xl:pb-24">
            <div className="relative h-[90svh] min-h-[620px] w-full overflow-hidden sm:h-[700px] lg:h-170 xl:h-200 2xl:h-220">
                <Image
                    src={image}
                    alt={imageAlt}
                    width={2500}
                    height={2000}
                    className="object-cover object-left lg:object-center w-full h-full"
                />
                <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-indigo-deep via-blue-deep/95 to-transparent lg:hidden" />
                <div className="absolute inset-0">
                    <div className="container mx-auto flex h-full items-end px-5 pb-10 lg:pb-30 sm:px-8 lg:items-center lg:px-20 lg:pb-0 lg:mt-20 xl:mt-10">
                        <div className="max-w-lg xl:max-w-2xl text-white lg:ml-auto">
                            <h1 className="font-display text-[30px] leading-tight sm:text-4xl lg:text-2xl xl:text-[40px]">
                                {heroTitle}
                            </h1>
                            <div
                                className="mt-3 xl:mt-5 text-white [&_p]:mb-6 [&_p]:text-base [&_p]:lg:text-sm [&_p]:xl:text-base [&_p]:leading-7 [&_p]:text-white/90 [&_ul]:flex [&_ul]:flex-wrap [&_ul]:gap-4 [&_ul]:list-none [&_ul]:p-0 [&_ul]:m-0 [&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:rounded-full [&_li]:bg-white/15 [&_li]:backdrop-blur-sm [&_li]:px-4 [&_li]:py-2 [&_li]:lg:py-1.5 [&_li]:xl:py-3 [&_li]:lg:text-xs [&_li]:xl:text-sm [&_li]:text-sm [&_li]:font-medium [&_li]:text-white [&_li]:before:content-['✓'] [&_li]:before:flex [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:text-white"
                                dangerouslySetInnerHTML={{ __html: heroDescription }}
                            />
                            <div className="mt-6 flex flex-wrap items-center gap-3 xl:mt-8 lg:gap-4">
                                {primaryButton && (
                                    <Link
                                        href={primaryButton.href}
                                        className="inline-flex items-center group"
                                    >
                                        <span className="bg-white group-hover:bg-white/90 text-[rgb(137,47,172)] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium shadow-lg">
                                            {primaryButton.label}
                                        </span>

                                        <span className="flex h-10 items-center justify-center rounded-full bg-white/20">
                                            <ArrowUpRight className="h-full w-full rounded-full bg-white p-2 text-[rgb(137,47,172)] duration-300 group-hover:rotate-45 group-hover:bg-white/90" />
                                        </span>
                                    </Link>
                                )}
                                {secondaryButton && (
                                    <Link
                                        href={secondaryButton.href}
                                        className="inline-flex items-center group"
                                    >
                                        <span className="border bg-transparent px-5 py-2.5 text-sm font-medium text-white rounded-full group-hover:bg-white/10">
                                            {secondaryButton.label}
                                        </span>
                                        <span className="flex h-10 items-center justify-center rounded-full border">
                                            <FaWhatsapp className="h-full w-full rounded-full p-2 text-white duration-300 group-hover:rotate-[360deg] group-hover:bg-white/10" />
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Card */}
            <div className="relative top-30 lg:top-0 z-10 mx-auto -mb-10 -mt-14 w-full container px-4 lg:-mt-24">
                <div className="round bg-white px-6 py-8 text-center sm:px-10 rounded-[90px]">
                    <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
                        {breadcrumbs?.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {index > 0 && (
                                    <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                                )}

                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="text-[#7c44a8] hover:underline"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {pageTitle === "Book an Appointment" ? (
                        <>

                            <div id="book" className="scroll-mt-24">
                                <LeadForm source="Obesity Care LP" />
                            </div>
                        </>
                    ) :
                        <h2 className="font-display text-2xl text-ink sm:text-3xl lg:text-[40px] pb-10">
                            {pageTitle}
                        </h2>}
                </div>
            </div>
        </section>
    );
}