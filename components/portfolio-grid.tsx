"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PortfolioGrid() {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const portfolios = [
    {
      id: 1,
      name: "토도동",
      description: "실시간 스포츠 경기 일정 및 결과 확인 서비스",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/424813598-d05c50a7-1dd4-4ac4-8d45-862a733af004.gif-gzhQcLJ0bzFB2N1hjlrJQWQETvEHca.jpeg",
      developer: "김종훈",
      role: "프론트엔드",
    },
    {
      id: 2,
      name: "LEGo",
      description: "프론트엔드 기술 스택 학습 플랫폼",
      image: "/images/Frame 51.png",
      developer: "윤주상",
      role: "프론트엔드",
    },
    {
      id: 3,
      name: "여기있개",
      description: "반려견을 찾아주는 통합 플랫폼",
      image: "/images/Frame 52.png",
      developer: "김종윤",
      role: "프론트엔드",
    },
    {
      id: 4,
      name: "꿀트립",
      description: "위치 기반 여행 도슨트 & 꿀팁 가이드 웹앱",
      image: "/images/Frame 51.png",
      developer: "빈운기",
      role: "프론트엔드",
    },
    {
      id: 5,
      name: "Fungle",
      description: "누구나 웹 소설을 연재할 수 있는 서비스",
      image: "/images/Frame 52.png",
      developer: "김종훈",
      role: "프론트엔드",
    },
  ];

  return (
    <div className="relative py-4">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="relative flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] w-[280px] h-[240px] overflow-hidden group cursor-pointer rounded-[10px]"
              >
                <Image
                  src={portfolio.image || "/placeholder.svg"}
                  alt={portfolio.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Default overlay with project info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1 truncate">
                      {portfolio.name}
                    </h3>
                    <p className="text-gray-200 text-sm truncate leading-tight">
                      {portfolio.description}
                    </p>
                  </div>
                </div>

                {/* Hover overlay with user profile and info */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <div className="text-center">
                    {/* User profile image */}
                    <div className="w-[67px] h-[67px] rounded-full overflow-hidden mx-auto mb-3">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="User profile"
                        width={67}
                        height={67}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* User name and role */}
                    <p className="text-white font-bold text-sm mb-2">
                      {portfolio.developer} | {portfolio.role}
                    </p>

                    {/* Project name and description */}
                    <p className="text-white text-sm font-pretendard">
                      {portfolio.name} ({portfolio.description})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors shadow-sm"
            aria-label="이전 슬라이드"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-colors shadow-sm"
            aria-label="다음 슬라이드"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
