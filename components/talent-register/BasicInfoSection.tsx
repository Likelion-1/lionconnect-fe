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
    <div className="flex flex-col gap-8">
      <h2 className="font-semibold text-xl mb-4">기본 정보</h2>
      <div>
        <h3 className="font-semibold text-base mb-2">프로필</h3>
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            {basicInfo.profileUrl ? (
              <div className="relative">
                <img
                  src={basicInfo.profileUrl}
                  alt="프로필 미리보기"
                  className="w-48 h-36 object-cover rounded-lg border border-[#E5E5E5] bg-gray-200"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-sm font-medium">
                    이미지 변경
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onProfileChange}
                  />
                </label>
              </div>
            ) : (
              <label className="w-48 h-36 flex flex-col items-center justify-center border border-[#E5E5E5] bg-gray-200 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-100 transition-colors">
                <svg
                  className="w-8 h-8 mb-2"
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
                <span className="text-sm">프로필 이미지 업로드</span>
                <span className="text-xs mt-1">JPG, PNG (최대 5MB)</span>
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
              className="mt-2 text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              이미지 제거
            </button>
          )}
        </div>
      </div>
      <form className="w-full max-w-xl flex flex-col gap-6">
        <div className="relative">
          <label className="block text-gray-700 mb-1">이름</label>
          <input
            type="text"
            value={basicInfo.name}
            onChange={(e) => onBasicInfoChange("name", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="이름"
          />
          {isFieldFilled("name") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1">전화번호</label>
          <input
            type="text"
            value={basicInfo.phone}
            onChange={(e) => onBasicInfoChange("phone", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="전화번호"
          />
          {isFieldFilled("phone") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            value={basicInfo.email}
            onChange={(e) => onBasicInfoChange("email", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="이메일"
          />
          {isFieldFilled("email") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1">희망 직무</label>
          <input
            type="text"
            value={basicInfo.job_type}
            onChange={(e) => onBasicInfoChange("job_type", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="희망 직무"
          />
          {isFieldFilled("job_type") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1">학교명</label>
          <input
            type="text"
            value={basicInfo.school}
            onChange={(e) => onBasicInfoChange("school", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="학교명"
          />
          {isFieldFilled("school") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1">전공</label>
          <input
            type="text"
            value={basicInfo.major}
            onChange={(e) => onBasicInfoChange("major", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="전공"
          />
          {isFieldFilled("major") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1">학년</label>
          <input
            type="text"
            value={basicInfo.grade}
            onChange={(e) => onBasicInfoChange("grade", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="학년"
          />
          {isFieldFilled("grade") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1">재학 기간</label>
          <input
            type="text"
            value={basicInfo.period}
            onChange={(e) => onBasicInfoChange("period", e.target.value)}
            className="w-full rounded-lg border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            placeholder="2025.00.~2025.00"
          />
          {isFieldFilled("period") && (
            <div className="absolute right-3 top-10 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </form>

      {/* 자기소개 섹션 추가 */}
      <div className="mt-8">
        <h2 className="font-semibold text-xl mb-4">자기소개</h2>
        <div className="mb-8">
          <h3 className="font-semibold text-base mb-2">간단 소개</h3>
          <p className="text-gray-500 text-sm mb-2">
            본인의 역량을 가장 잘 드러낼 수 있는 핵심 소개를 한 줄로
            작성해주세요!
          </p>
          <div className="relative">
            <textarea
              maxLength={100}
              rows={5}
              value={basicInfo.short_intro}
              onChange={(e) => onBasicInfoChange("short_intro", e.target.value)}
              className="w-full rounded-lg border border-[#E5E5E5] p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
            />
            <span className="absolute bottom-5 right-4 text-xs text-gray-400">
              {basicInfo.short_intro.length}/100
            </span>
            {isFieldFilled("short_intro") && (
              <div className="absolute top-4 right-8 text-green-500">
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
        <div>
          <h3 className="font-semibold text-base mb-2">상세 소개</h3>
          <p className="text-gray-500 text-sm mb-2">
            정량적인 지표를 강조하여 작성해주세요!
          </p>
          <div className="relative">
            <textarea
              maxLength={500}
              rows={8}
              value={basicInfo.intro}
              onChange={(e) => onBasicInfoChange("intro", e.target.value)}
              className="w-full rounded-lg border border-[#E5E5E5] p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF8234]"
              placeholder={`예시 :\n오픈소스 개발을 꿈꾸며 배움을 공유하는 프론트엔드 개발자 00입니다.\n로그인 연장 처리 과정에서 Access Token의 만료시간을 사전 감지하는 React Axios Interceptors 로직을 구현하여 개인 블로그에 문제 프로세스를 정리하였고, 약 5,000명의 조회수와 16개의 좋아요를 달성하며 배움을 공유한 경험이 있습니다.`}
            />
            <span className="absolute bottom-5 right-4 text-xs text-gray-400">
              {basicInfo.intro.length}/500
            </span>
            {isFieldFilled("intro") && (
              <div className="absolute top-4 right-8 text-green-500">
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

        {/* 기본 정보 저장 버튼 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              // 데이터 전송 전 확인 로그
              console.log("BasicInfoSection에서 전송할 데이터:", basicInfo);
              onSubmit();
            }}
            disabled={isLoading}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                저장 중...
              </div>
            ) : (
              "기본 정보 저장"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
