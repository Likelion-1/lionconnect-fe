"use client";

import React, { useState } from "react";
// import Header from "@/components/header"; // 이 줄 삭제

const sidebarItems = [
  "기본 정보(필수)",
  "자기소개(필수)",
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
}

const emptyPortfolio: Portfolio = {
  image: null,
  imageUrl: "",
  name: "",
  summary: "",
  period: "",
  role: "",
  url: "",
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
  contact: string;
  email: string;
  job: string;
}
const emptyBasicInfo: BasicInfo = {
  profile: null,
  profileUrl: "",
  name: "",
  contact: "",
  email: "",
  job: "",
};

export default function TalentRegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  // 자기소개 입력 상태
  const [coreIntro, setCoreIntro] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
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
    value: string
  ) => {
    setPortfolios((prev) => {
      const copy = [...prev];
      if (field === "image" || field === "imageUrl") {
        copy[idx][field] = value as any;
      } else {
        copy[idx][field] = value;
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
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* <Header /> 이 줄 삭제 */}
      {/* 헤더 아래 여백 */}
      <div className="h-8" />
      <main className="flex flex-1 container mx-auto px-6 gap-8">
        {/* 왼쪽 사이드바 */}
        <aside className="w-64 bg-white rounded-2xl border border-[#E5E5E5] drop-shadow-md p-6 flex flex-col gap-2 h-fit">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-sm">기본 정보(필수)</span>
            <span className="text-orange-500 text-xs font-bold">100%</span>
          </div>
          <ul className="text-[#929292] text-sm space-y-2">
            {sidebarItems.map((item, idx) => (
              <li
                key={item}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer px-4 py-2 rounded-xl border transition-all select-none
                  ${
                    activeIndex === idx
                      ? "bg-[#FFF7ED] border-orange-300 drop-shadow-md text-[#525151] font-semibold"
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
                      onClick={() => removePortfolio(idx)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                      aria-label="포트폴리오 삭제"
                    >
                      -
                    </button>
                  )}
                  {/* 대표 이미지 */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-base mb-1">
                      대표 이미지
                    </h3>
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
                          onChange={(e) => handleImageChange(e, idx)}
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
                      onChange={(e) =>
                        handlePortfolioChange(idx, "name", e.target.value)
                      }
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
                        handlePortfolioChange(idx, "summary", e.target.value)
                      }
                      className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="한 줄 소개를 입력해주세요"
                    />
                  </div>
                  {/* 프로젝트 기간 & 담당 역할 */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        프로젝트 기간
                      </h3>
                      <input
                        type="text"
                        value={portfolio.period}
                        onChange={(e) =>
                          handlePortfolioChange(idx, "period", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="2025.00.~2025.00"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        담당 역할
                      </h3>
                      <input
                        type="text"
                        value={portfolio.role}
                        onChange={(e) =>
                          handlePortfolioChange(idx, "role", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="프론트엔드"
                      />
                    </div>
                  </div>
                  {/* 프로젝트 포트폴리오 URL */}
                  <div className="mb-2">
                    <h3 className="font-semibold text-base mb-1">
                      프로젝트 포트폴리오 URL
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      프로젝트가 가장 잘 나타날 수 있는 포트폴리오 URL을
                      기입해주세요
                    </p>
                    <input
                      type="text"
                      value={portfolio.url}
                      onChange={(e) =>
                        handlePortfolioChange(idx, "url", e.target.value)
                      }
                      className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="URL을 입력해주세요"
                    />
                  </div>
                </div>
              ))}
              {/* + 버튼 */}
              <button
                type="button"
                onClick={addPortfolio}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-orange-500 text-2xl hover:bg-orange-50 transition self-center"
                aria-label="포트폴리오 추가"
              >
                +
              </button>
            </div>
          ) : activeIndex === 1 ? (
            // 자기소개(필수)
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-semibold text-xl mb-4">자기소개</h2>
                <div className="mb-8">
                  <h3 className="font-semibold text-base mb-2">핵심소개</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    본인의 역량을 가장 잘 드러낼 수 있는 핵심 소개를 한 줄로
                    작성해주세요!
                  </p>
                  <div className="relative">
                    <textarea
                      maxLength={100}
                      rows={3}
                      value={coreIntro}
                      onChange={(e) => setCoreIntro(e.target.value)}
                      className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF9] p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                    <span className="absolute bottom-2 right-4 text-xs text-gray-400">
                      {coreIntro.length}/100
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">자기소개</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    정량적인 지표를 강조하여 작성해주세요!
                  </p>
                  <div className="relative">
                    <textarea
                      maxLength={100}
                      rows={5}
                      value={selfIntro}
                      onChange={(e) => setSelfIntro(e.target.value)}
                      className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF9] p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder={`예시 :\n오픈소스 개발을 꿈꾸며 배움을 공유하는 프론트엔드 개발자 00입니다.\n로그인 연장 처리 과정에서 Access Token의 만료시간을 사전 감지하는 React Axios Interceptors 로직을 구현하여 개인 블로그에 문제 프로세스를 정리하였고, 약 5,000명의 조회수와 16개의 좋아요를 달성하며 배움을 공유한 경험이 있습니다.`}
                    />
                    <span className="absolute bottom-2 right-4 text-xs text-gray-400">
                      {selfIntro.length}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : activeIndex === 3 ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-xl">프로젝트</h2>
                <button
                  type="button"
                  onClick={addProject}
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
                      onClick={() => removeProject(idx)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                      aria-label="프로젝트 삭제"
                    >
                      ✕
                    </button>
                  )}
                  <div className="flex gap-8 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        프로젝트명
                      </h3>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          handleProjectChange(idx, "name", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="프로젝트명을 입력해주세요"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        프로젝트 기간
                      </h3>
                      <input
                        type="text"
                        value={project.period}
                        onChange={(e) =>
                          handleProjectChange(idx, "period", e.target.value)
                        }
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
                      onChange={(e) =>
                        handleProjectChange(idx, "summary", e.target.value)
                      }
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
                        handleProjectChange(idx, "description", e.target.value)
                      }
                      rows={3}
                      className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 mb-2 resize-none"
                      placeholder="예시 :&#10;• Redux-toolkit을 활용한 비동기 통신 및 전역 상태관리&#10;• 방문자 335명 유입 및 40여명의 유지 모집"
                    />
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        담당 역할
                      </h3>
                      <input
                        type="text"
                        value={project.role}
                        onChange={(e) =>
                          handleProjectChange(idx, "role", e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="프론트엔드"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">
                        기술 스택
                      </h3>
                      <input
                        type="text"
                        value={project.stack}
                        onChange={(e) =>
                          handleProjectChange(idx, "stack", e.target.value)
                        }
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
                      onChange={(e) =>
                        handleProjectChange(idx, "github", e.target.value)
                      }
                      className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                      placeholder="깃허브 URL을 입력해주세요"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : activeIndex === 4 ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-xl">수상 및 자격 내역</h2>
                <button
                  type="button"
                  onClick={addAward}
                  className="ml-2 text-2xl text-orange-500 hover:bg-orange-50 rounded-full w-8 h-8 flex items-center justify-center border border-[#E5E5E5]"
                >
                  +
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
          ) : activeIndex === 5 ? (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-xl">교육</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="ml-2 text-2xl text-orange-500 hover:bg-orange-50 rounded-full w-8 h-8 flex items-center justify-center border border-[#E5E5E5]"
                >
                  +
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
            <div className="flex flex-col gap-8">
              <h2 className="font-semibold text-xl mb-4">기본 정보</h2>
              <div>
                <h3 className="font-semibold text-base mb-2">프로필</h3>
                <div className="flex flex-col items-center mb-6">
                  {basicInfo.profileUrl ? (
                    <img
                      src={basicInfo.profileUrl}
                      alt="프로필 미리보기"
                      className="w-48 h-36 object-cover rounded-xl border border-[#E5E5E5] bg-gray-200"
                    />
                  ) : (
                    <label className="w-48 h-36 flex flex-col items-center justify-center border border-[#E5E5E5] bg-gray-200 rounded-xl cursor-pointer text-gray-400">
                      <span>프로필 이미지 업로드</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileChange}
                      />
                    </label>
                  )}
                </div>
              </div>
              <form className="w-full max-w-xl flex flex-col gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    value={basicInfo.name}
                    onChange={(e) =>
                      handleBasicInfoChange("name", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="이름"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">연락처</label>
                  <input
                    type="text"
                    value={basicInfo.contact}
                    onChange={(e) =>
                      handleBasicInfoChange("contact", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="연락처"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) =>
                      handleBasicInfoChange("email", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="이메일"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1">직종</label>
                  <input
                    type="text"
                    value={basicInfo.job}
                    onChange={(e) =>
                      handleBasicInfoChange("job", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E5E5E5] bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="직종"
                  />
                </div>
              </form>
            </div>
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
          <button className="w-32 h-12 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
            이력서 저장
          </button>
        </div>
      </footer>
    </div>
  );
}
