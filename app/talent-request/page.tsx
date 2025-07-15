"use client";

import React, { useState } from "react";
import {
  ConnectRequestService,
  ConnectRequestData,
} from "@/lib/services/connectRequestService";

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

      const requestData: ConnectRequestData = {
        company_user_id: 1, // TODO: 실제 company_user_id로 변경 필요
        student_user_id: 1, // TODO: 실제 student_user_id로 변경 필요
        portfolio_id: 1, // TODO: 실제 portfolio_id로 변경 필요
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

      const response = await ConnectRequestService.submitConnectRequest(
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-10 flex flex-col gap-8 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">인재 요청</h2>
        {/* 채용 포지션 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            채용 포지션
          </label>
          <select
            value={formData.position}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, position: e.target.value }))
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            <option value="">선택</option>
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="designer">디자이너</option>
            <option value="pm">PM</option>
          </select>
        </div>
        {/* 직무 설명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            직무 설명(선택)
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
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="직무 설명을 입력해주세요"
          />
        </div>
        {/* 필수 기술 스택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            필수 기술 스택
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.required_stack.map((stack, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700"
              >
                {stack}
                <button
                  onClick={() => removeStack(stack)}
                  className="ml-1 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newStack}
              onChange={(e) => setNewStack(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addStack()}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="기술 입력 후 Enter"
            />
            <button
              onClick={addStack}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              추가
            </button>
          </div>
        </div>
        {/* 경력/고용수준 */}
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-2">
              희망 경력 수준
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={formData.career_level.includes("신입")}
                  onChange={() => toggleCareerLevel("신입")}
                />
                신입
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={formData.career_level.includes("경력1-3년")}
                  onChange={() => toggleCareerLevel("경력1-3년")}
                />
                경력1-3년
              </label>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-2">
              고용 수준
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={formData.employment_type.includes("정규직")}
                  onChange={() => toggleEmploymentType("정규직")}
                />
                정규직
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={formData.employment_type.includes("계약직")}
                  onChange={() => toggleEmploymentType("계약직")}
                />
                계약직
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="accent-orange-500"
                  checked={formData.employment_type.includes("인턴")}
                  onChange={() => toggleEmploymentType("인턴")}
                />
                인턴
              </label>
            </div>
          </div>
        </div>
        {/* 연결 요청 메시지 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            연결 요청 메시지(선택)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 resize-none"
            rows={3}
            placeholder="연결 요청 시 전달할 메시지를 입력해주세요"
          />
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-6 py-2 text-white font-semibold rounded-lg shadow-sm transition text-sm ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-400 to-orange-300 hover:opacity-90"
            }`}
            type="button"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                요청 중...
              </div>
            ) : (
              "인재 요청 등록"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
