"use client";
import Image from "next/image";

export default function TalentDetailPage() {
  return (
    <div className="min-h-screen flex flex-col text-gray-900 bg-white">
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12 mt-10 relative">
        {/* 커넥트 버튼 - 오른쪽 상단 */}
        <div className="absolute top-0 right-0 z-10">
          <button className="px-6 py-2 border border-[#E5E5E5] bg-white text-orange-500 rounded-xl font-semibold text-sm hover:bg-orange-50 transition-colors">
            커넥트
          </button>
        </div>
        {/* 상단 프로필 */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <Image
            src="/images/Ellipse 4.png"
            alt="프로필"
            width={96}
            height={96}
            className="rounded-full"
          />
          <div className="text-xl font-bold">
            이름 <span className="font-normal">| 프론트엔드 개발자</span>
          </div>
          <div className="text-gray-500 text-sm">
            0000.00.00(만 00세) &nbsp;·&nbsp; 010-0000-0000 &nbsp;·&nbsp;
            test@test.com
          </div>
          <div className="text-base text-center text-gray-700 mt-2">
            AI와 함께 생각하고 함께 만들어가는 개발자 김종윤입니다.
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 기본정보 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">기본정보</div>
          <div className="flex flex-row gap-8 text-md">
            <div>
              <div className="text-black-500 font-semibold">학력</div>
              <div className="text-gray-500 font-medium">2022.02~2026.02</div>
            </div>
            <div className="px-10">
              <div className="font-semibold">멋사대학교 4.0/4.5</div>
              <div className="text-gray-500">컴퓨터공학부</div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 포트폴리오 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">포트폴리오</div>
          <div className="flex flex-row gap-6">
            {/* 카드 1 */}
            <a
              href="https://www.notion.so/example1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 rounded-xl overflow-hidden bg-black border border-gray-200 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-[180px] bg-gray-100">
                <Image
                  src="/images/Frame.png"
                  alt="TriFly"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-row items-end justify-between px-4 py-3 bg-white">
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-700 truncate mb-2">
                    TriFly | 항공권 예약 사이트
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      서비스 기획
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      프론트엔드
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#757575] whitespace-nowrap">
                  2025.04 ~ 2025.05
                </span>
              </div>
            </a>
            {/* 카드 2 */}
            <a
              href="https://www.notion.so/example2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 rounded-xl overflow-hidden bg-black border border-gray-200 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-[180px] bg-gray-100">
                <Image
                  src="/images/Preview.png"
                  alt="Wish"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-row items-end justify-between px-4 py-3 bg-white">
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-700 truncate mb-2">
                    Wish | 난임 부부를 위한 AI 실내 케어 서비스
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      서비스 기획
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      프론트엔드
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#757575] whitespace-nowrap">
                  2025.04 ~ 2025.05
                </span>
              </div>
            </a>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 프로젝트 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">프로젝트</div>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">꿀트립</span>
                <span className="text-md text-gray-500">2022.02~2026.02</span>
              </div>
              <div className="text-md text-gray-500 mb-1">
                위치 기반 여행 도슨트 & 꿀팁 가이드 웹앱
              </div>
              <div className="text-md">
                기술스택: React, Next.js, TypeScript, Module CSS, Zustand,
                Prisma ORM
              </div>
              <ul className="text-md text-gray-600 list-disc list-inside mt-1">
                <li>위치 기반 장소 추천 및 일정 관리</li>
                <li>여행지별 데이터 통계, 리뷰, 사진 제공</li>
                <li>사용자 피드백 수집 기능</li>
                <li>CI/CD 파이프라인 구축 (GitHub Actions + PM2 + Nginx)</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">꿀트립</span>
                <span className="text-md text-gray-500">2022.02~2026.02</span>
              </div>
              <div className="text-md text-gray-500 mb-1">
                위치 기반 여행 도슨트 & 꿀팁 가이드 웹앱
              </div>
              <div className="text-md">
                기술스택: React, Next.js, TypeScript, Module CSS, Zustand,
                Prisma ORM
              </div>
              <ul className="text-md text-gray-600 list-disc list-inside mt-1">
                <li>위치 기반 장소 추천 및 일정 관리</li>
                <li>여행지별 데이터 통계, 리뷰, 사진 제공</li>
                <li>사용자 피드백 수집 기능</li>
                <li>CI/CD 파이프라인 구축 (GitHub Actions + PM2 + Nginx)</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 수상 및 활동 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">수상 및 활동</div>
          <div className="flex flex-col gap-2 text-md">
            <div>
              <span className="text-gray-500 mr-4 text-md">2024.12</span>
              <span className="font-semibold text-md">
                한국정보산업연합회장상
              </span>
              <span className="text-xs text-gray-500 ml-2">
                한이음 ICT멘토링 | OpenAI를 활용한 그림 일기 서비스
              </span>
            </div>
            <div>
              <span className="text-gray-500 mr-4">2022.09</span>
              <span className="font-semibold">SQL 개발자(SQLD)</span>
              <span className="text-xs text-gray-500 ml-2">
                한국데이터산업진흥원
              </span>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 교육 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-lg">교육</div>
          <div className="flex flex-row gap-8 text-md">
            <div>
              <div className="font-semibold">멋쟁이사자처럼</div>
              <div className="text-gray-500">2022.02~2026.02</div>
            </div>
            <div>
              <div className="text-gray-500 px-10">
                멋쟁이사자처럼 프론트엔드 부트캠프 00기 수료
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 기술스택 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-lg">기술 스택</div>
          <div className="flex flex-row gap-2 flex-wrap">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              Next.js
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              React
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              JavaScript
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
