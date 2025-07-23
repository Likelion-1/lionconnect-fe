"use client";

import React from "react";
import { ResumeService, BasicInfoData } from "@/lib/services/resumeService";

interface BasicInfo {
  profile: File | null;
  profileUrl: string;
  name: string;
  email: string;
  phone: string;
  job_type: string;
  school: string;
  major: string;
  grade: string;
  period: string;
  short_intro: string;
  intro: string;
}

interface BasicInfoSectionProps {
  basicInfo: BasicInfo;
  onBasicInfoChange: (
    field: keyof BasicInfo,
    value: string | File | null
  ) => void;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  isFieldFilled: (field: keyof BasicInfo) => boolean;
}

export default function BasicInfoSection({
  basicInfo,
  onBasicInfoChange,
  onProfileChange,
  onSubmit,
  isLoading = false,
  isFieldFilled,
}: BasicInfoSectionProps) {
  return (
    <div className="space-y-8">
      {/* 프로필 섹션 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-800">프로필 정보</h2>
        </div>

        <div className="flex gap-8 items-start">
          {/* 프로필 이미지 */}
          <div className="flex-shrink-0">
            <h3 className="font-medium text-gray-700 mb-4">프로필 사진</h3>
            <div className="relative">
              {basicInfo.profileUrl ? (
                <div className="relative group">
                  <img
                    src={basicInfo.profileUrl}
                    alt="프로필 미리보기"
                    className="w-48 h-48 object-cover rounded-xl border border-gray-200"
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
                      <span className="text-sm">이미지 변경</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onProfileChange}
                    />
                  </label>
                </div>
              ) : (
                <label className="w-48 h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-3">
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      프로필 이미지 업로드
                    </span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      JPG, PNG
                      <br />
                      (최대 5MB)
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onProfileChange}
                  />
                </label>
              )}
            </div>
            {basicInfo.profileUrl && (
              <button
                onClick={() => onBasicInfoChange("profile", null)}
                className="mt-3 text-sm text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                이미지 제거
              </button>
            )}
          </div>

          {/* 기본 정보 입력 필드들 */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  이름
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={basicInfo.name}
                    onChange={(e) => onBasicInfoChange("name", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                    placeholder="이름을 입력해주세요"
                  />
                  {isFieldFilled("name") && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  전화번호
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={basicInfo.phone}
                    onChange={(e) => onBasicInfoChange("phone", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                    placeholder="010-0000-0000"
                  />
                  {isFieldFilled("phone") && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={basicInfo.email}
                  onChange={(e) => onBasicInfoChange("email", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                  placeholder="example@email.com"
                />
                {isFieldFilled("email") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                희망 직무
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={basicInfo.job_type}
                  onChange={(e) =>
                    onBasicInfoChange("job_type", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                  placeholder="프론트엔드 개발자"
                />
                {isFieldFilled("job_type") && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 학력 정보 섹션 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-800">학력 정보</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              학교명
            </label>
            <div className="relative">
              <input
                type="text"
                value={basicInfo.school}
                onChange={(e) => onBasicInfoChange("school", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="학교명을 입력해주세요"
              />
              {isFieldFilled("school") && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              전공
            </label>
            <div className="relative">
              <input
                type="text"
                value={basicInfo.major}
                onChange={(e) => onBasicInfoChange("major", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="컴퓨터공학과"
              />
              {isFieldFilled("major") && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              학년
            </label>
            <div className="relative">
              <input
                type="text"
                value={basicInfo.grade}
                onChange={(e) => onBasicInfoChange("grade", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="4학년"
              />
              {isFieldFilled("grade") && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              재학 기간
            </label>
            <div className="relative">
              <input
                type="text"
                value={basicInfo.period}
                onChange={(e) => onBasicInfoChange("period", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="2021.03~2025.02"
              />
              {isFieldFilled("period") && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 자기소개 섹션 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-800">자기소개</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-700">간단 소개</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                핵심
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              본인의 역량을 가장 잘 드러낼 수 있는 핵심 소개를 한 줄로
              작성해주세요!
            </p>
            <div className="relative">
              <textarea
                maxLength={100}
                rows={3}
                value={basicInfo.short_intro}
                onChange={(e) =>
                  onBasicInfoChange("short_intro", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder="예: 사용자 경험을 중시하는 프론트엔드 개발자입니다."
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {isFieldFilled("short_intro") && (
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="text-xs text-gray-400">
                  {basicInfo.short_intro.length}/100
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-700">상세 소개</h3>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                상세
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              정량적인 지표를 강조하여 작성해주세요!
            </p>
            <div className="relative">
              <textarea
                maxLength={500}
                rows={6}
                value={basicInfo.intro}
                onChange={(e) => onBasicInfoChange("intro", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                placeholder={`예시:\n오픈소스 개발을 꿈꾸며 배움을 공유하는 프론트엔드 개발자 00입니다.\n로그인 연장 처리 과정에서 Access Token의 만료시간을 사전 감지하는 React Axios Interceptors 로직을 구현하여 개인 블로그에 문제 프로세스를 정리하였고, 약 5,000명의 조회수와 16개의 좋아요를 달성하며 배움을 공유한 경험이 있습니다.`}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {isFieldFilled("intro") && (
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="text-xs text-gray-400">
                  {basicInfo.intro.length}/500
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            console.log("BasicInfoSection에서 전송할 데이터:", basicInfo);
            onSubmit();
          }}
          disabled={isLoading}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#FFF7ED] text-[#FF6E15] rounded-lg font-medium hover:bg-[#FF6E15] hover:text-white"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              저장 중...
            </div>
          ) : (
            <div className="flex items-center gap-2">
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
              기본 정보 저장
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
