"use client";

import React from "react";

interface Project {
  name: string;
  period: string;
  summary: string;
  description: string;
  role: string;
  stack: string;
  github: string;
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
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-semibold text-xl">프로젝트</h2>
        <button
          type="button"
          onClick={onAddProject}
          className="ml-2 text-2xl text-orange-500 hover:bg-orange-50 rounded-full w-8 h-8 flex items-center justify-center border border-[#E5E5E5]"
        >
          +
        </button>
      </div>
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="relative bg-[#FAFAF9] rounded-2xl border border-[#E5E5E5] p-6 mb-8 drop-shadow-sm"
        >
          {/* 삭제 버튼 */}
          {projects.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveProject(idx)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
              aria-label="프로젝트 삭제"
            >
              ✕
            </button>
          )}
          <div className="flex gap-8 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1">프로젝트명</h3>
              <input
                type="text"
                value={project.name}
                onChange={(e) => onProjectChange(idx, "name", e.target.value)}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="프로젝트명을 입력해주세요"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1">프로젝트 기간</h3>
              <input
                type="text"
                value={project.period}
                onChange={(e) => onProjectChange(idx, "period", e.target.value)}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="2025.00.~2025.00"
              />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-base mb-1">
              프로젝트 한 줄 소개
            </h3>
            <input
              type="text"
              value={project.summary}
              onChange={(e) => onProjectChange(idx, "summary", e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="한 줄 소개를 입력해주세요"
            />
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-base mb-1">구현 내용</h3>
            <p className="text-gray-500 text-sm mb-2">
              성과+결과 중심으로 한 줄로 작성해주세요
            </p>
            <textarea
              value={project.description}
              onChange={(e) =>
                onProjectChange(idx, "description", e.target.value)
              }
              rows={3}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 mb-2 resize-none"
              placeholder="예시 :&#10;• Redux-toolkit을 활용한 비동기 통신 및 전역 상태관리&#10;• 방문자 335명 유입 및 40여명의 유지 모집"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1">담당 역할</h3>
              <input
                type="text"
                value={project.role}
                onChange={(e) => onProjectChange(idx, "role", e.target.value)}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="프론트엔드"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1">기술 스택</h3>
              <input
                type="text"
                value={project.stack}
                onChange={(e) => onProjectChange(idx, "stack", e.target.value)}
                className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="React, TypeScript, JavaScript"
              />
            </div>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold text-base mb-1">
              프로젝트 깃허브 URL
            </h3>
            <input
              type="text"
              value={project.github}
              onChange={(e) => onProjectChange(idx, "github", e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="깃허브 URL을 입력해주세요"
            />
          </div>
        </div>
      ))}

      {/* 프로젝트 저장 버튼 */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          프로젝트 저장
        </button>
      </div>
    </div>
  );
}
