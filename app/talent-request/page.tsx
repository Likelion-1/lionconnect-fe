"use client";

import React, { useState } from "react";
import {
  TalentRequestService,
  TalentRequestData,
} from "@/lib/services/talentRequestService";

export default function TalentRequestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    job_description: "",
    required_stack: [] as string[],
    career_level: [] as string[],
    employment_type: [] as string[],
    message: "",
  });
  const [newStack, setNewStack] = useState("");

  // 기술 스택 추가
  const addStack = () => {
    if (newStack.trim() && !formData.required_stack.includes(newStack.trim())) {
      setFormData((prev) => ({
        ...prev,
        required_stack: [...prev.required_stack, newStack.trim()],
      }));
      setNewStack("");
    }
  };

  // 기술 스택 제거
  const removeStack = (stack: string) => {
    setFormData((prev) => ({
      ...prev,
      required_stack: prev.required_stack.filter((s) => s !== stack),
    }));
  };

  // 경력 수준 토글
  const toggleCareerLevel = (level: string) => {
    setFormData((prev) => ({
      ...prev,
      career_level: prev.career_level.includes(level)
        ? prev.career_level.filter((l) => l !== level)
        : [...prev.career_level, level],
    }));
  };

  // 고용 수준 토글
  const toggleEmploymentType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      employment_type: prev.employment_type.includes(type)
        ? prev.employment_type.filter((t) => t !== type)
        : [...prev.employment_type, type],
    }));
  };

  // 연결 요청 제출
  const handleSubmit = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // 필수 필드 검증
      if (!formData.position) {
        alert("채용 포지션을 선택해주세요.");
        return;
      }

      const requestData: TalentRequestData = {
        message: formData.message || undefined,
        position: formData.position,
        job_description: formData.job_description || undefined,
        required_stack:
          formData.required_stack.length > 0
            ? formData.required_stack.join(", ")
            : undefined,
        career_level:
          formData.career_level.length > 0
            ? formData.career_level.join(", ")
            : undefined,
        employment_type:
          formData.employment_type.length > 0
            ? formData.employment_type.join(", ")
            : undefined,
      };

      const response = await TalentRequestService.submitTalentRequest(
        requestData
      );

      if (response.success) {
        alert("인재 요청이 성공적으로 등록되었습니다!");
        // 폼 초기화
        setFormData({
          position: "",
          job_description: "",
          required_stack: [],
          career_level: [],
          employment_type: [],
          message: "",
        });
      } else {
        alert(`요청 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("인재 요청 제출 중 오류 발생:", error);
      alert("요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">인재 요청</h1>
          <p className="text-gray-600">필요한 인재를 요청하고 매칭받아보세요</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* 기본 정보 섹션 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-900">기본 정보</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 채용 포지션 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  채용 포지션 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                >
                  <option value="">선택해주세요</option>
                  <option value="frontend">프론트엔드 개발자</option>
                  <option value="backend">백엔드 개발자</option>
                  <option value="fullstack">풀스택 개발자</option>
                  <option value="designer">UI/UX 디자이너</option>
                  <option value="pm">프로덕트 매니저</option>
                  <option value="data">데이터 엔지니어</option>
                </select>
              </div>

              {/* 직무 설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  직무 설명
                </label>
                <input
                  type="text"
                  value={formData.job_description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      job_description: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                  placeholder="예: React 기반 웹앱 개발"
                />
              </div>
            </div>
          </div>

          {/* 기술 스택 섹션 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-900">
                필수 기술 스택
              </h2>
            </div>

            <div className="space-y-4">
              {/* 선택된 기술 스택 */}
              {formData.required_stack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.required_stack.map((stack, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-200"
                    >
                      {stack}
                      <button
                        onClick={() => removeStack(stack)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
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
                    </span>
                  ))}
                </div>
              )}

              {/* 기술 스택 입력 */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newStack}
                  onChange={(e) => setNewStack(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addStack()}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                  placeholder="예: React, TypeScript, Node.js"
                />
                <button
                  onClick={addStack}
                  className="px-6 py-3 bg-[#FF6E15] text-white rounded-lg hover:bg-[#E55A0A] transition-colors font-medium text-sm"
                >
                  추가
                </button>
              </div>
            </div>
          </div>

          {/* 조건 섹션 */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-900">채용 조건</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 경력 수준 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  희망 경력 수준
                </label>
                <div className="space-y-3">
                  {["신입", "경력1-3년", "경력3-5년", "경력5년 이상"].map(
                    (level) => (
                      <label
                        key={level}
                        className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#FF6E15] border-gray-300 rounded focus:ring-[#FF6E15] focus:ring-2"
                          checked={formData.career_level.includes(level)}
                          onChange={() => toggleCareerLevel(level)}
                        />
                        <span>{level}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* 고용 형태 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  고용 형태
                </label>
                <div className="space-y-3">
                  {["정규직", "계약직", "인턴", "프리랜서"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#FF6E15] border-gray-300 rounded focus:ring-[#FF6E15] focus:ring-2"
                        checked={formData.employment_type.includes(type)}
                        onChange={() => toggleEmploymentType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 메시지 섹션 */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
              <h2 className="text-xl font-semibold text-gray-900">
                연결 요청 메시지
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                메시지 (선택사항)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors resize-none"
                rows={4}
                placeholder="연결 요청 시 전달할 메시지를 입력해주세요"
              />
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-8 py-3 text-white font-semibold rounded-lg transition-colors text-sm flex items-center gap-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FF6E15] hover:bg-[#E55A0A]"
            }`}
            type="button"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                요청 중...
              </>
            ) : (
              <>
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                인재 요청 등록
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
