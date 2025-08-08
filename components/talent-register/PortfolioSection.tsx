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
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-800">포트폴리오</h2>
          </div>
          <button
            type="button"
            onClick={onAddPortfolio}
            className="w-10 h-10 text-[#FF6E15] hover:text-[#E55A0A] transition-colors flex items-center justify-center"
            aria-label="포트폴리오 추가"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
        {/* 안내 메시지 */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>안내:</strong> 포트폴리오 정보를 입력하고 저장해주세요.
          </p>
        </div>
      </div>

      {/* 포트폴리오 카드들 */}
      {portfolios.map((portfolio, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* 삭제 버튼 */}
          {portfolios.length > 1 && (
            <button
              type="button"
              onClick={() => onRemovePortfolio(idx)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="포트폴리오 삭제"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* 포트폴리오 번호 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
              {idx + 1}
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              포트폴리오 {idx + 1}
            </h3>
          </div>

          {/* 대표 이미지 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              대표 이미지
            </label>
            <p className="text-gray-600 text-sm mb-4">
              가이드 사진과 같은 프로젝트 대표 이미지를 등록해주세요
            </p>
            <div className="flex gap-6">
              {portfolio.imageUrl && (
                <div className="relative group">
                  <img
                    src={portfolio.imageUrl}
                    alt="대표 이미지 미리보기"
                    className="w-40 h-40 object-cover rounded-xl border border-gray-200"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
                    <div className="text-white text-center">
                      <svg
                        className="w-6 h-6 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs">이미지 변경</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onImageChange(e, idx)}
                    />
                  </label>
                </div>
              )}
              <label className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl cursor-pointer hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    대표 이미지 업로드
                  </span>
                </div>
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트명
            </label>
            <input
              type="text"
              value={portfolio.name}
              onChange={(e) => onPortfolioChange(idx, "name", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
              placeholder="프로젝트명을 입력해주세요"
            />
          </div>

          {/* 프로젝트 한 줄 소개 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 한 줄 소개
            </label>
            <input
              type="text"
              value={portfolio.summary}
              onChange={(e) =>
                onPortfolioChange(idx, "summary", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
              placeholder="한 줄 소개를 입력해주세요"
            />
          </div>

          {/* 프로젝트 기간 & 담당 역할 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                프로젝트 기간
              </label>
              <input
                type="text"
                value={portfolio.period}
                onChange={(e) =>
                  onPortfolioChange(idx, "period", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="2025.01~2025.03"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                담당 역할
              </label>
              <input
                type="text"
                value={portfolio.role}
                onChange={(e) => onPortfolioChange(idx, "role", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="프론트엔드"
              />
            </div>
          </div>

          {/* 프로젝트 포트폴리오 URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 포트폴리오 URL
            </label>
            <p className="text-gray-600 text-sm mb-3">
              프로젝트가 가장 잘 나타날 수 있는 포트폴리오 URL을 기입해주세요
            </p>
            <input
              type="text"
              value={portfolio.url}
              onChange={(e) => onPortfolioChange(idx, "url", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
              placeholder="https://example.com"
            />
          </div>

          {/* 대표 포트폴리오 설정 */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`representative-${idx}`}
                checked={portfolio.isRepresentative}
                onChange={(e) =>
                  onPortfolioChange(idx, "isRepresentative", e.target.checked)
                }
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={`representative-${idx}`}
                className="text-sm font-medium text-gray-700"
              >
                대표 포트폴리오로 설정
              </label>
            </div>
            <p className="text-gray-600 text-xs mt-2 ml-7">
              대표 포트폴리오는 이력서에서 가장 먼저 보여집니다
            </p>
          </div>
        </div>
      ))}

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="px-6 py-3 bg-[#FFF7ED] text-[#FF6E15] rounded-lg font-medium hover:bg-[#FF6E15] hover:text-white transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          포트폴리오 저장
        </button>
      </div>
    </div>
  );
}
