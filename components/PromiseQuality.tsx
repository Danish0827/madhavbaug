import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";

export default function PromiseQuality() {
    return (
        <section className="bg-gradeient py-20">
            <div className="container mx-auto px-5 lg:px-8">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    {/* Left Image */}
                    <div className="relative overflow-hidden rounded-[28px] ">
                        <Image
                            src="/assets/doctor.webp"
                            alt="Doctor"
                            width={700}
                            height={520}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    {/* Right Content */}
                    <div>
                        {/* Small Heading */}
                        <div className="mb-5 flex items-center gap-2">
                            <SectionLabel>Expert Medical Team</SectionLabel>
                        </div>
                        {/* Main Heading */}
                        <h2 className="mb-10 font-display text-[42px] leading-[1.2] text-[#222]">
                            The Madhavbaug Promise of Quality
                        </h2>
                        {/* Feature 1 */}
                        <div className="mb-7 flex gap-4">
                            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C8E] shrink">
                                <CheckCircle2 className=" text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#222]">
                                    100% Safe & Natural
                                </h3>
                                <p className="mt-1 text-[16px] leading-7 text-[#666]">
                                    Made from pure, high-quality herbs with no harmful chemicals.
                                </p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="mb-10 flex gap-4">
                            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0F5C8E] shrink">
                                <CheckCircle2 className=" text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#222]">
                                    Scientifically Backed
                                </h3>
                                <p className="mt-1 text-[16px] leading-7 text-[#666]">
                                    Formulated by medical experts to ensure real health benefits.
                                </p>
                            </div>
                        </div>
                        {/* Bottom Card */}
                        <div className="flex items-center gap-5 rounded-full border border-[#eadff7] bg-[#f5eefb] px-8 py-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                                <ShieldCheck className="h-7 w-7 text-[#8f63d5]" />
                            </div>
                            <p className="text-[15px] leading-6 text-[#5b5b5b]">
                                Formulated in Ministry of AYUSH Premium Certified and
                                cGMP-compliant facilities to guarantee the highest safety,
                                purity, and clinical standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}