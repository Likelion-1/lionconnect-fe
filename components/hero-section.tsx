"use client";

import { Sparkles, ChevronDown, Search } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeroSection() {
  const develop_jobs = [
    "프론트엔드 개발자",
    "백엔드 개발자",
    "UI/UX 기획자",
    "클라우드 엔지니어",
    "데이터 분석가",
  ];
  const navItems = [
    { name: "프론트엔드 개발자", href: "/" },
    { name: "백엔드 개발자", href: "/" },
    { name: "UI/UX 기획자", href: "/" },
    { name: "클라우드 엔지니어", href: "/" },
    { name: "데이터 분석가", href: "/" },
  ];
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJobIndex((prevIndex) => (prevIndex + 1) % develop_jobs.length);
    }, 2000); // 10초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden mb-8 mt-10 bg-white flex items-center justify-center min-h-[45vh]">
      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl lg:text-5xl font-semibold leading-tight mb-8 drop-shadow-sm">
            <div className="flex items-center justify-center gap-4">
              <Search size={48} className="text-gray-700 flex-shrink-0" />
              <span className="text-gray-700">
                지금{" "}
                <span className="text-[#FF6E15] font-bold">
                  {develop_jobs[currentJobIndex]}
                </span>{" "}
                찾고 계신가요?
              </span>
            </div>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="w-[140px] h-[40px] border border-[#E5E5E5] rounded-[20px] text-md text-[#525151] hover:text-[#FF6E15] hover:bg-[#FFF7ED] transition-colors flex items-center justify-center"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
