"use client";

import React, { useState } from "react";
import { ResumeService, BasicInfoData } from "@/lib/services/resumeService";
import {
  PortfolioService,
  PortfolioData,
} from "@/lib/services/portfolioService";
import { AwardService, AwardData } from "@/lib/services/awardService";
import {
  EducationService,
  EducationData,
} from "@/lib/services/educationService";
import BasicInfoSection from "@/components/talent-register/BasicInfoSection";
import PortfolioSection from "@/components/talent-register/PortfolioSection";
import ProjectSection from "@/components/talent-register/ProjectSection";
// import Header from "@/components/header"; // 이 줄 삭제

const sidebarItems = [
  "기본 정보(필수)",
  "포트폴리오(필수)",
  "프로젝트(필수)",
  "수상 및 활동",
  "교육",
];

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

const emptyPortfolio: Portfolio = {
  image: null,
  imageUrl: "",
  name: "",
  summary: "",
  period: "",
  role: "",
  url: "",
  isRepresentative: false,
};

interface Project {
  name: string;
  period: string;
  summary: string;
  description: string;
  role: string;
  stack: string;
  github: string;
}

const emptyProject: Project = {
  name: "",
  period: "",
  summary: "",
  description: "",
  role: "",
  stack: "",
  github: "",
};

interface Award {
  name: string;
  date: string;
  org: string;
}
const emptyAward: Award = {
  name: "",
  date: "",
  org: "",
};

interface Education {
  org: string;
  period: string;
  name: string;
}
const emptyEducation: Education = {
  org: "",
  period: "",
  name: "",
};

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
const emptyBasicInfo: BasicInfo = {
  profile: null,
  profileUrl: "",
  name: "",
  email: "",
  phone: "",
  job_type: "",
  school: "",
  major: "",
  grade: "",
  period: "",
  short_intro: "",
  intro: "",
};

export default function TalentRegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // 포트폴리오 입력 상태 (배열)
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    { ...emptyPortfolio },
  ]);
  const [projects, setProjects] = useState<Project[]>([{ ...emptyProject }]);
  const [awards, setAwards] = useState<Award[]>([{ ...emptyAward }]);
  const [educations, setEducations] = useState<Education[]>([
    { ...emptyEducation },
  ]);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({ ...emptyBasicInfo });

  // 기본정보 진행률 계산
  const calculateBasicInfoProgress = () => {
    const requiredFields = [
      "name",
      "phone",
      "email",
      "job_type",
      "school",
      "major",
      "grade",
      "period",
      "short_intro",
      "intro",
    ];

    const filledFields = requiredFields.filter((field) => {
      const value = basicInfo[field as keyof BasicInfo];
      return value && value.toString().trim() !== "";
    });

    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  const basicInfoProgress = calculateBasicInfoProgress();

  // 필드가 입력되었는지 확인하는 함수
  const isFieldFilled = (field: keyof BasicInfo) => {
    const value = basicInfo[field];
    return value && value.toString().trim() !== "";
  };

  // 대표 이미지 업로드 핸들러
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPortfolios((prev) => {
        const copy = [...prev];
        copy[idx].image = file;
        copy[idx].imageUrl = reader.result as string;
        return copy;
      });
    };
    reader.readAsDataURL(file);
  };

  // 포트폴리오 입력값 변경 핸들러
  const handlePortfolioChange = (
    idx: number,
    field: keyof Portfolio,
    value: string | boolean
  ) => {
    setPortfolios((prev) => {
      const copy = [...prev];
      if (field === "image" || field === "imageUrl") {
        copy[idx][field] = value as any;
      } else if (field === "isRepresentative") {
        copy[idx][field] = value as boolean;
      } else {
        copy[idx][field] = value as string;
      }
      return copy;
    });
  };

  // 포트폴리오 추가
  const addPortfolio = () => {
    setPortfolios((prev) => [...prev, { ...emptyPortfolio }]);
  };

  // 포트폴리오 삭제
  const removePortfolio = (idx: number) => {
    if (portfolios.length === 1) return; // 최소 1개 보장
    setPortfolios((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleProjectChange = (
    idx: number,
    field: keyof Project,
    value: string
  ) => {
    setProjects((prev) => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };
  const addProject = () => {
    setProjects((prev) => [...prev, { ...emptyProject }]);
  };
  const removeProject = (idx: number) => {
    if (projects.length === 1) return;
    setProjects((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAwardChange = (
    idx: number,
    field: keyof Award,
    value: string
  ) => {
    setAwards((prev) => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };
  const addAward = () => {
    setAwards((prev) => [...prev, { ...emptyAward }]);
  };
  const removeAward = (idx: number) => {
    if (awards.length === 1) return;
    setAwards((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEducationChange = (
    idx: number,
    field: keyof Education,
    value: string
  ) => {
    setEducations((prev) => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };
  const addEducation = () => {
    setEducations((prev) => [...prev, { ...emptyEducation }]);
  };
  const removeEducation = (idx: number) => {
    if (educations.length === 1) return;
    setEducations((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleBasicInfoChange = (
    field: keyof BasicInfo,
    value: string | File | null
  ) => {
    setBasicInfo((prev) => {
      if (field === "profile" && value === null) {
        // 프로필 이미지 제거 시
        return {
          ...prev,
          profile: null,
          profileUrl: "",
        };
      }
      return { ...prev, [field]: value };
    });
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검사 (5MB 제한)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 파일 타입 검사
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBasicInfo((prev) => ({
        ...prev,
        profile: file,
        profileUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // API 제출 함수들
  const handleSubmitBasicInfo = async () => {
    if (isLoading) return; // 중복 요청 방지

    try {
      setIsLoading(true);

      // 필수 필드 검증
      const requiredFields = [
        "name",
        "email",
        "phone",
        "job_type",
        "school",
        "major",
        "grade",
        "period",
        "short_intro",
        "intro",
      ];

      const missingFields = requiredFields.filter(
        (field) => !basicInfo[field as keyof BasicInfo]
      );

      if (missingFields.length > 0) {
        alert(`다음 필드를 입력해주세요: ${missingFields.join(", ")}`);
        return;
      }

      // API 데이터 준비
      const apiData: BasicInfoData = {
        profile_image: basicInfo.profile,
        name: basicInfo.name,
        email: basicInfo.email,
        phone: basicInfo.phone,
        job_type: basicInfo.job_type,
        school: basicInfo.school,
        major: basicInfo.major,
        grade: basicInfo.grade,
        period: basicInfo.period,
        short_intro: basicInfo.short_intro,
        intro: basicInfo.intro,
      };

      // 페이지에서 API로 전송할 데이터 확인
      console.log("talent-register/page.tsx에서 API로 전송할 데이터:", apiData);

      const response = await ResumeService.submitBasicInfo(apiData);

      if (response.success) {
        alert("기본 정보가 성공적으로 저장되었습니다!");
        // 성공 후 처리 (예: 다음 단계로 이동)
      } else {
        alert(`저장 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 프로젝트 저장 함수 (추후 구현)
  const handleSubmitProjects = async () => {
    try {
      // 프로젝트 데이터 검증 및 저장 로직
      alert("프로젝트 저장 기능은 추후 구현 예정입니다.");
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 수상 및 활동 저장 함수
  const handleSubmitAwards = async () => {
    try {
      // 수상 및 활동 데이터 검증
      const validAwards = awards.filter(
        (award) => award.name && award.date && award.org
      );

      if (validAwards.length === 0) {
        alert(
          "저장할 수상 및 활동이 없습니다. 최소 하나의 수상 및 활동을 입력해주세요."
        );
        return;
      }

      // 각 수상 및 활동을 순차적으로 저장
      for (let i = 0; i < validAwards.length; i++) {
        const award = validAwards[i];

        // 날짜 형식 변환 (YYYY.MM -> YYYY-MM)
        const formattedDate = award.date.replace(/\./g, "-");

        const awardData: AwardData = {
          resume_id: 1, // TODO: 실제 resume_id로 변경 필요
          name: award.name,
          date: formattedDate,
          organization: award.org,
        };

        const response = await AwardService.submitAward(awardData);

        if (!response.success) {
          alert(`수상 및 활동 "${award.name}" 저장 실패: ${response.message}`);
          return;
        }
      }

      alert("모든 수상 및 활동이 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("수상 및 활동 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 교육 저장 함수
  const handleSubmitEducations = async () => {
    try {
      // 교육 데이터 검증
      const validEducations = educations.filter(
        (education) => education.org && education.period && education.name
      );

      if (validEducations.length === 0) {
        alert("저장할 교육이 없습니다. 최소 하나의 교육을 입력해주세요.");
        return;
      }

      // 각 교육을 순차적으로 저장
      for (let i = 0; i < validEducations.length; i++) {
        const education = validEducations[i];

        // 기간 형식 변환 (YYYY.MM.~YYYY.MM -> YYYY-MM ~ YYYY-MM)
        const formattedPeriod = education.period
          .replace(/\./g, "-")
          .replace(/~/g, " ~ ");

        const educationData: EducationData = {
          resume_id: 1, // TODO: 실제 resume_id로 변경 필요
          institution: education.org,
          period: formattedPeriod,
          name: education.name,
        };

        const response = await EducationService.submitEducation(educationData);

        if (!response.success) {
          alert(`교육 "${education.name}" 저장 실패: ${response.message}`);
          return;
        }
      }

      alert("모든 교육이 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("교육 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 포트폴리오 저장 함수
  const handleSubmitPortfolios = async () => {
    try {
      // 포트폴리오 데이터 검증
      const validPortfolios = portfolios.filter(
        (portfolio) =>
          portfolio.name &&
          portfolio.summary &&
          portfolio.period &&
          portfolio.role
      );

      if (validPortfolios.length === 0) {
        alert(
          "저장할 포트폴리오가 없습니다. 최소 하나의 포트폴리오를 입력해주세요."
        );
        return;
      }

      // 각 포트폴리오를 순차적으로 저장
      for (let i = 0; i < validPortfolios.length; i++) {
        const portfolio = validPortfolios[i];

        const portfolioData: PortfolioData = {
          project_name: portfolio.name,
          project_intro: portfolio.summary,
          project_period: portfolio.period,
          role: portfolio.role,
          project_url: portfolio.url || undefined,
          image: portfolio.image || undefined,
          is_representative: portfolio.isRepresentative,
        };

        const response = await PortfolioService.submitPortfolio(portfolioData);

        if (!response.success) {
          alert(
            `포트폴리오 "${portfolio.name}" 저장 실패: ${response.message}`
          );
          return;
        }
      }

      alert("모든 포트폴리오가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("포트폴리오 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 전체 저장 함수 (모든 영역을 순차적으로 저장)
  const handleSubmitAll = async () => {
    try {
      // 1. 기본 정보 저장
      await handleSubmitBasicInfo();

      // 2. 프로젝트 저장 (추후 구현)
      // await handleSubmitProjects();

      // 3. 포트폴리오 저장
      await handleSubmitPortfolios();

      // 4. 수상 및 활동 저장
      await handleSubmitAwards();

      // 5. 교육 저장
      await handleSubmitEducations();

      alert("모든 정보가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("전체 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* <Header /> 이 줄 삭제 */}
      {/* 헤더 아래 여백 */}
      <div className="h-8" />
      <main className="flex flex-1 container mx-auto px-6 gap-8">
        {/* 왼쪽 사이드바 */}
        <aside className="w-64 bg-white rounded-2xl border border-[#E5E5E5] drop-shadow-md p-6 flex flex-col gap-2 h-fit">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-sm">이력서 작성</span>
            <span className="text-orange-500 text-xs font-bold">
              {basicInfoProgress}%
            </span>
          </div>
          <ul className="text-[#929292] text-sm space-y-2">
            {sidebarItems.map((item, idx) => (
              <li
                key={item}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer px-5 py-3 rounded-xl border transition-all select-none
                  ${
                    activeIndex === idx
                      ? "bg-[#FFF7ED] border-transparent text-[#525151] font-semibold"
                      : "border-transparent hover:bg-orange-50 hover:border-orange-100"
                  }
                `}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
        {/* 오른쪽 폼 */}
        <section className="flex-1 bg-white rounded-2xl border border-[#E5E5E5] drop-shadow-md p-8">
          {/* 포트폴리오(필수) 영역일 때만 아래 폼 노출 */}
          {activeIndex === 2 ? (
            <PortfolioSection
              portfolios={portfolios}
              onImageChange={handleImageChange}
              onPortfolioChange={handlePortfolioChange}
              onAddPortfolio={addPortfolio}
              onRemovePortfolio={removePortfolio}
              onSubmit={handleSubmitPortfolios}
            />
          ) : activeIndex === 1 ? (
            <ProjectSection
              projects={projects}
              onProjectChange={handleProjectChange}
              onAddProject={addProject}
              onRemoveProject={removeProject}
              onSubmit={handleSubmitProjects}
            />
          ) : activeIndex === 3 ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-xl">수상 및 자격 내역</h2>
                  <button
                    type="button"
                    onClick={addAward}
                    className="ml-2 text-2xl text-orange-500 hover:bg-orange-50 rounded-full w-8 h-8 flex items-center justify-center border border-[#E5E5E5]"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleSubmitAwards}
                  className="px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  저장
                </button>
              </div>
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  className="relative bg-[#FAFAF9] rounded-2xl border border-[#E5E5E5] p-6 mb-8 drop-shadow-sm"
                >
                  {/* 삭제 버튼 */}
                  {awards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAward(idx)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                      aria-label="수상/자격 삭제"
                    >
                      ✕
                    </button>
                  )}
                  <div className="flex gap-8 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        수상 및 자격증명
                      </h3>
                      <input
                        type="text"
                        value={award.name}
                        onChange={(e) =>
                          handleAwardChange(idx, "name", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="수상 및 자격증명을 입력해주세요"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">취득일</h3>
                      <input
                        type="text"
                        value={award.date}
                        onChange={(e) =>
                          handleAwardChange(idx, "date", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="2025.03"
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <h3 className="font-semibold text-base mb-1">기관명</h3>
                    <input
                      type="text"
                      value={award.org}
                      onChange={(e) =>
                        handleAwardChange(idx, "org", e.target.value)
                      }
                      className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="기관명을 입력해주세요"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : activeIndex === 4 ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-xl">교육</h2>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="ml-2 text-2xl text-orange-500 hover:bg-orange-50 rounded-full w-8 h-8 flex items-center justify-center border border-[#E5E5E5]"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleSubmitEducations}
                  className="px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  저장
                </button>
              </div>
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative bg-[#FAFAF9] rounded-2xl border border-[#E5E5E5] p-6 mb-8 drop-shadow-sm"
                >
                  {/* 삭제 버튼 */}
                  {educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                      aria-label="교육 삭제"
                    >
                      ✕
                    </button>
                  )}
                  <div className="mb-4 font-semibold text-base">
                    교육{idx + 1}
                  </div>
                  <div className="flex gap-8 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        교육 기관
                      </h3>
                      <input
                        type="text"
                        value={edu.org}
                        onChange={(e) =>
                          handleEducationChange(idx, "org", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="멋쟁이사자처럼"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        교육 기간
                      </h3>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) =>
                          handleEducationChange(idx, "period", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="2025.00.~2025.00"
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <h3 className="font-semibold text-base mb-1">교육명</h3>
                    <input
                      type="text"
                      value={edu.name}
                      onChange={(e) =>
                        handleEducationChange(idx, "name", e.target.value)
                      }
                      className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="프론트엔드 부트캠프 00기"
                    />
                  </div>
                  {idx < educations.length - 1 && (
                    <hr className="my-8 border-[#E5E5E5]" />
                  )}
                </div>
              ))}
            </div>
          ) : // 기본 정보 영역일 때만 아래 폼 노출
          activeIndex === 0 ? (
            <BasicInfoSection
              basicInfo={basicInfo}
              onBasicInfoChange={handleBasicInfoChange}
              onProfileChange={handleProfileChange}
              onSubmit={handleSubmitBasicInfo}
              isLoading={isLoading}
              isFieldFilled={isFieldFilled}
            />
          ) : (
            // 다른 영역은 기존 폼 또는 placeholder
            <div className="flex flex-col items-center gap-6">
              {/* 프로필 이미지 */}
              <div className="w-40 h-28 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-400">프로필</span>
              </div>
              {/* 입력 폼 */}
              <form className="w-full max-w-xl flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="이름"
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <input
                  type="text"
                  placeholder="연락처"
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <input
                  type="text"
                  placeholder="직종"
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 w-1/2"
                />
              </form>
            </div>
          )}
        </section>
      </main>
      {/* 하단 버튼 영역 */}
      <footer className="w-full flex items-center justify-between px-16 py-8 bg-white border-t border-[#E5E5E5] drop-shadow-sm mt-8">
        <button className="flex items-center gap-2 text-orange-500 font-semibold text-base">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 3v14m0 0-4-4m4 4 4-4"
              stroke="#FF9100"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="3"
              y="17"
              width="18"
              height="4"
              rx="2"
              fill="#FF9100"
              fillOpacity="0.1"
            />
          </svg>
          PDF 다운로드
        </button>
        <div className="flex gap-4">
          <button className="w-28 h-12 border border-orange-100 rounded-2xl text-orange-500 font-semibold bg-white hover:bg-orange-50 transition">
            임시 저장
          </button>
          <button
            onClick={handleSubmitAll}
            className="w-32 h-12 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            전체 저장
          </button>
        </div>
      </footer>
    </div>
  );
}
