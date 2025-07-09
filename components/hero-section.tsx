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
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentJobIndex(
          (prevIndex) => (prevIndex + 1) % develop_jobs.length
        );
        setIsChanging(false);
      }, 300); // 페이드 아웃 후 텍스트 변경
    }, 2000); // 2초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden mb-8 mt-10 bg-white flex items-center justify-center min-h-[45vh]">
      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl lg:text-5xl font-semibold leading-tight mb-8 drop-shadow-sm">
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-700">
                지금{" "}
                <span
                  className={`text-[#FF6E15] font-bold transition-all duration-300 ${
                    isChanging ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {develop_jobs[currentJobIndex]}
                </span>
                가 필요하신가요?
              </span>
              {/* <Search size={48} className="text-gray-800 flex-shrink-0" /> */}
            </div>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative w-[160px] h-[48px] rounded-[24px] text-sm font-medium transition-all duration-300 flex items-center justify-center overflow-hidden"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[24px] border border-gray-200/50 shadow-sm group-hover:shadow-md transition-all duration-300" />

              {/* Hover effect */}
              <div className="absolute inset-0 bg-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[24px]" />

              {/* Text */}
              <span className="relative z-10 text-gray-700 group-hover:text-gray-800 font-medium transition-colors duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
