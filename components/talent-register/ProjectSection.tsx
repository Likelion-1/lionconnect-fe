"use client";

import React from "react";

interface Project {
  name: string;
  period: string;
  summary: string;
  description: string;
  role: string;
  stack: string;
}

interface ProjectSectionProps {
  projects: Project[];
  onProjectChange: (idx: number, field: keyof Project, value: string) => void;
  onAddProject: () => void;
  onRemoveProject: (idx: number) => void;
  onSubmit: () => void;
}

export default function ProjectSection({
  projects,
  onProjectChange,
  onAddProject,
  onRemoveProject,
  onSubmit,
}: ProjectSectionProps) {
  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-800">프로젝트</h2>
          </div>
          <button
            type="button"
            onClick={onAddProject}
            className="w-10 h-10 text-[#FF6E15] hover:text-[#E55A0A] transition-colors flex items-center justify-center"
            aria-label="프로젝트 추가"
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
      </div>

      {/* 프로젝트 카드들 */}
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* 삭제 버튼 */}
          {projects.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveProject(idx)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="프로젝트 삭제"
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

          {/* 프로젝트 번호 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
              {idx + 1}
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              프로젝트 {idx + 1}
            </h3>
          </div>

          {/* 프로젝트명과 기간 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                프로젝트명
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => onProjectChange(idx, "name", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="프로젝트명을 입력해주세요"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                프로젝트 기간
              </label>
              <input
                type="text"
                value={project.period}
                onChange={(e) => onProjectChange(idx, "period", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="2025.01~2025.03"
              />
            </div>
          </div>

          {/* 프로젝트 한 줄 소개 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 한 줄 소개
            </label>
            <input
              type="text"
              value={project.summary}
              onChange={(e) => onProjectChange(idx, "summary", e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
              placeholder="한 줄 소개를 입력해주세요"
            />
          </div>

          {/* 구현 내용 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              구현 내용
            </label>
            <p className="text-gray-600 text-sm mb-3">
              성과+결과 중심으로 한 줄로 작성해주세요
            </p>
            <textarea
              value={project.description}
              onChange={(e) =>
                onProjectChange(idx, "description", e.target.value)
              }
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors resize-none"
              placeholder="예시:&#10;• Redux-toolkit을 활용한 비동기 통신 및 전역 상태관리&#10;• 방문자 335명 유입 및 40여명의 유지 모집"
            />
          </div>

          {/* 담당 역할과 기술 스택 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                담당 역할
              </label>
              <input
                type="text"
                value={project.role}
                onChange={(e) => onProjectChange(idx, "role", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="프론트엔드"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                기술 스택
              </label>
              <input
                type="text"
                value={project.stack}
                onChange={(e) => onProjectChange(idx, "stack", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="React, TypeScript, JavaScript"
              />
            </div>
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
          프로젝트 저장
        </button>
      </div>
    </div>
  );
}
