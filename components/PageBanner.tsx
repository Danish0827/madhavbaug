import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageBannerProps {
    title: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
}

export default function PageBanner({
    title,
    description,
    breadcrumbs,
    backgroundImage,
}: PageBannerProps) {
    return (
        <>
            <section
                style={{ backgroundImage: `url(${backgroundImage})` }}
                className="relative h-120 bg-cover bg-center bg-no-repeat"
            />

            <div className="relative z-10 mx-auto -mt-14 -mb-10 w-full max-w-[1000px] px-4 lg:-mt-24">
                <div className="rounded-[28px] bg-white px-6 py-8 text-center  sm:px-10 lg:rounded-[91px]">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex items-center justify-center gap-2 text-sm"
                    >
                        {breadcrumbs.map((item, index) => (
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
                                    <span className="text-[#2b2b2b]">{item.label}</span>
                                )}
                            </div>
                        ))}
                    </nav>

                    <h1 className="font-display mt-3 text-3xl sm:text-4xl lg:text-[40px]">
                        {title}
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-sm text-black/70 sm:text-base">
                        {description}
                    </p>
                </div>
            </div>
        </>
    );
}