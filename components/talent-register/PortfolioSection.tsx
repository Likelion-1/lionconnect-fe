"use client";

import React from "react";

interface Portfolio {
  image: File | null;
  imageUrl: string;
  name: string;
  summary: string;
  period: string;
  role: string;
  url: string;
  isRepresentative: boolean;
}

interface PortfolioSectionProps {
  portfolios: Portfolio[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  onPortfolioChange: (
    idx: number,
    field: keyof Portfolio,
    value: string | boolean
  ) => void;
  onAddPortfolio: () => void;
  onRemovePortfolio: (idx: number) => void;
  onSubmit: () => void;
}

export default function PortfolioSection({
  portfolios,
  onImageChange,
  onPortfolioChange,
  onAddPortfolio,
  onRemovePortfolio,
  onSubmit,
}: PortfolioSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-semibold text-xl mb-4">포트폴리오</h2>
      {portfolios.map((portfolio, idx) => (
        <div
          key={idx}
          className="relative bg-[#FAFAF9] rounded-2xl border border-[#E5E5E5] p-6 mb-8 drop-shadow-sm"
        >
          {/* 삭제 버튼 */}
          {portfolios.length > 1 && (
            <button
              type="button"
              onClick={() => onRemovePortfolio(idx)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
              aria-label="포트폴리오 삭제"
            >
              -
            </button>
          )}
          {/* 대표 이미지 */}
          <div className="mb-6">
            <h3 className="font-semibold text-base mb-1">대표 이미지</h3>
            <p className="text-gray-500 text-sm mb-2">
              가이드 사진과 같은 프로젝트 대표 이미지를 등록해주세요
            </p>
            <div className="flex gap-4">
              {portfolio.imageUrl && (
                <img
                  src={portfolio.imageUrl}
                  alt="대표 이미지 미리보기"
                  className="w-32 h-32 object-cover rounded-xl border border-[#E5E5E5] bg-white"
                />
              )}
              <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-[#E5E5E5] rounded-xl cursor-pointer bg-white text-gray-400 hover:bg-orange-50 transition">
                <span className="text-2xl mb-2">⬆️</span>
                <span className="text-xs">대표 이미지 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImageChange(e, idx)}
                />
              </label>
            </div>
          </div>
          {/* 프로젝트명 */}
          <div className="mb-4">
            <h3 className="font-semibold text-base mb-1">프로젝트명</h3>
            <input
              type="text"
              value={portfolio.name}
              onChange={(e) => onPortfolioChange(idx, "name", e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="프로젝트명을 입력해주세요"
            />
          </div>
          {/* 프로젝트 한 줄 소개 */}
          <div className="mb-4">
            <h3 className="font-semibold text-base mb-1">
              프로젝트 한 줄 소개
            </h3>
            <input
              type="text"
              value={portfolio.summary}
              onChange={(e) =>
                onPortfolioChange(idx, "summary", e.target.value)
              }
              className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="한 줄 소개를 입력해주세요"
            />
          </div>
          {/* 프로젝트 기간 & 담당 역할 */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1">프로젝트 기간</h3>
              <input
                type="text"
                value={portfolio.period}
                onChange={(e) =>
                  onPortfolioChange(idx, "period", e.target.value)
                }
                className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="2025.00.~2025.00"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1">담당 역할</h3>
              <input
                type="text"
                value={portfolio.role}
                onChange={(e) => onPortfolioChange(idx, "role", e.target.value)}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="프론트엔드"
              />
            </div>
          </div>
          {/* 프로젝트 포트폴리오 URL */}
          <div className="mb-4">
            <h3 className="font-semibold text-base mb-1">
              프로젝트 포트폴리오 URL
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              프로젝트가 가장 잘 나타날 수 있는 포트폴리오 URL을 기입해주세요
            </p>
            <input
              type="text"
              value={portfolio.url}
              onChange={(e) => onPortfolioChange(idx, "url", e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="URL을 입력해주세요"
            />
          </div>

          {/* 대표 포트폴리오 설정 */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`representative-${idx}`}
                checked={portfolio.isRepresentative}
                onChange={(e) =>
                  onPortfolioChange(idx, "isRepresentative", e.target.checked)
                }
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label
                htmlFor={`representative-${idx}`}
                className="text-sm font-medium text-gray-700"
              >
                대표 포트폴리오로 설정
              </label>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              대표 포트폴리오는 이력서에서 가장 먼저 보여집니다
            </p>
          </div>
        </div>
      ))}
      {/* + 버튼 */}
      <button
        type="button"
        onClick={onAddPortfolio}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-orange-500 text-2xl hover:bg-orange-50 transition self-center"
        aria-label="포트폴리오 추가"
      >
        +
      </button>

      {/* 포트폴리오 저장 버튼 */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          포트폴리오 저장
        </button>
      </div>
    </div>
  );
}
