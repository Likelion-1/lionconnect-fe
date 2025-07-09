"use client";

import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, ChevronRight } from "lucide-react";

const DUMMY_PROJECTS = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: `김멋사${i + 1}`,
  role: "프론트엔드",
  intro: "클린아키텍처를 설계하며 코딩하는 개발자입니다.",
  projectImg: i % 2 === 0 ? "/images/Frame.png" : "/images/Preview.png",
  projectName: "토도동",
  projectDesc: "농구 경기를 볼 수 있는 서비스 입니다.",
  points: [
    "Redux Hooks를 활용한 000개선",
    "클린아키텍처를 적용하여 코드 효율 달성",
    "Vercel을 활용한 배포",
  ],
}));

export default function TalentSearchPage() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < DUMMY_PROJECTS.length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + 8, DUMMY_PROJECTS.length)
            );
            setLoading(false);
          }, 600);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount]);

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <Header />
      <main className="flex-1">
        <section className="w-full max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2 mt-8">
            인재를 둘러보고 커넥트하세요.
          </h2>
          {/* 카테고리 + 검색바 라인 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 mb-24 w-full">
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {[
                "프론트엔드",
                "백엔드",
                "클라우드 엔지니어링",
                "데이터분석",
                "게임 개발",
                "UI/UX",
                "안드로이드",
                "iOS",
              ].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    i === 3
                      ? "bg-orange-100 text-orange-500 border-orange-300"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* 검색 바 */}
            <div className="flex-1 flex justify-end min-w-[10px]">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="이름, 기술, 프로젝트 검색"
                  className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none bg-white shadow-sm pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Search size={18} />
                </span>
              </div>
            </div>
          </div>

          {/* 인재 카드 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 mb-26">
            {DUMMY_PROJECTS.slice(0, visibleCount).map((item) => (
              <Link
                key={item.id}
                href={`/talent-search/${item.id}`}
                className="w-full max-w-xl mx-auto border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow p-5 flex flex-col gap-5 cursor-pointer focus:outline-none"
              >
                {/* 상단: 프로필, 이름, 소개, 버튼 */}
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/Ellipse 4.png"
                    alt="프로필"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <span className="text-lg font-bold text-gray-900 truncate">
                      {item.name} | {item.role}
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      {item.intro}
                    </span>
                  </div>
                  <button className="px-4 py-1 border border-orange-200 bg-white text-orange-500 rounded-full font-semibold text-sm hover:bg-orange-50 transition">
                    커넥트
                  </button>
                </div>
                {/* 프로젝트 이미지 + hover 오버레이 */}
                <div className="w-full relative group">
                  <Image
                    src={item.projectImg}
                    alt="프로젝트"
                    width={600}
                    height={240}
                    className="rounded-xl w-full h-[260px] object-cover transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-black/50 flex flex-col items-start justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 text-left">
                    <span className="text-xl font-bold text-white mb-2">
                      {item.projectName}
                    </span>
                    <span className="text-white text-base mb-1">
                      {item.projectDesc}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* 무한스크롤 로더 */}
          <div
            ref={loaderRef}
            className="h-12 flex items-center justify-center"
          >
            {loading && (
              <span className="text-gray-400 mt-10">불러오는 중...</span>
            )}
          </div>

          {/* 하단 CTA */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-4 border border-[#E5E5E5] text-[#424242] rounded-full font-semibold bg-white transition-all text-lg flex items-center gap-2 hover:bg-orange-50">
              원하는 인재가 없으신가요?
              <ChevronRight size={22} className="ml-1" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
