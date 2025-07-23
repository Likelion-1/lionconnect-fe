"use client";

import React, { useState, useEffect } from "react";
import {
  ResumeService,
  BasicInfoData,
  ResumeResponseData,
} from "@/lib/services/resumeService";
import {
  PortfolioService,
  PortfolioData,
  PortfolioResponseData,
} from "@/lib/services/portfolioService";
import { AwardService, AwardData } from "@/lib/services/awardService";
import {
  EducationService,
  EducationData,
} from "@/lib/services/educationService";
import { ProjectService, ProjectData } from "@/lib/services/projectService";
import { API_BASE_URL } from "@/lib/api";
import BasicInfoSection from "@/components/talent-register/BasicInfoSection";
import PortfolioSection from "@/components/talent-register/PortfolioSection";
import ProjectSection from "@/components/talent-register/ProjectSection";
// import Header from "@/components/header"; // 이 줄 삭제

const sidebarItems = [
  "기본 정보(필수)",
  "프로젝트(필수)",
  "포트폴리오(필수)",
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
}

const emptyProject: Project = {
  name: "",
  period: "",
  summary: "",
  description: "",
  role: "",
  stack: "",
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
  const [userId, setUserId] = useState<number | null>(null);
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [portfolioIds, setPortfolioIds] = useState<number[]>([]);
  const [projectIds, setProjectIds] = useState<number[]>([]);
  const [awardIds, setAwardIds] = useState<number[]>([]);
  const [educationIds, setEducationIds] = useState<number[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // 각 섹션의 저장 완료 상태
  const [savedSections, setSavedSections] = useState({
    basicInfo: false,
    projects: false,
    portfolios: false,
    awards: false,
    education: false,
  });
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

  // user_id 저장 함수
  const saveUserId = (id: number) => {
    setUserId(id);
    localStorage.setItem("userId", id.toString());
    console.log("저장된 user_id:", id);
  };

  // user_id 불러오기 함수
  const loadUserId = () => {
    const saved = localStorage.getItem("userId");
    if (saved) {
      const id = parseInt(saved);
      setUserId(id);
      console.log("불러온 user_id:", id);

      return id;
    }
    return null;
  };

  // 데이터 로드 함수
  const loadResumeData = async (resumeIdToLoad: number) => {
    try {
      setIsLoading(true);
      const response = await ResumeService.getResumeDetail(resumeIdToLoad);

      if (response.success && response.data) {
        const {
          resume,
          portfolios: loadedPortfolios,
          projects: loadedProjects,
          awards: loadedAwards,
          educations: loadedEducations,
        } = response.data;

        // 기본 정보 설정
        const profileImageUrl = resume.profile_image
          ? `${API_BASE_URL}${resume.profile_image}`
          : "";

        console.log("=== 이미지 URL 디버깅 ===");
        console.log("원본 profile_image:", resume.profile_image);
        console.log("API_BASE_URL:", API_BASE_URL);
        console.log("생성된 profileImageUrl:", profileImageUrl);
        console.log("=== 이미지 URL 디버깅 끝 ===");

        setBasicInfo({
          profile: null,
          profileUrl: profileImageUrl,
          name: resume.name || "",
          email: resume.email || "",
          phone: resume.phone || "",
          job_type: resume.job_type || "",
          school: resume.school || "",
          major: resume.major || "",
          grade: resume.grade || "",
          period: resume.period || "",
          short_intro: resume.short_intro || "",
          intro: resume.intro || "",
        });

        saveUserId(resume.user_id);
        setResumeId(resume.id);

        // 포트폴리오 데이터 설정
        if (loadedPortfolios && loadedPortfolios.length > 0) {
          console.log("=== 포트폴리오 이미지 URL 디버깅 ===");
          console.log("로드된 포트폴리오들:", loadedPortfolios);

          const formattedPortfolios = loadedPortfolios.map((portfolio: any) => {
            const portfolioImageUrl = portfolio.image
              ? `${API_BASE_URL}${portfolio.image}`
              : "";

            console.log("포트폴리오 원본 이미지:", portfolio.image);
            console.log("포트폴리오 생성된 이미지 URL:", portfolioImageUrl);

            return {
              image: null,
              imageUrl: portfolioImageUrl,
              name: portfolio.project_name || "",
              summary: portfolio.project_intro || "",
              period: portfolio.project_period || "",
              role: portfolio.role || "",
              url: portfolio.project_url || "",
              isRepresentative: portfolio.is_representative || false,
            };
          });
          console.log("=== 포트폴리오 이미지 URL 디버깅 끝 ===");

          setPortfolios(formattedPortfolios);
          setPortfolioIds(loadedPortfolios.map((p: any) => p.id));
        }

        // 프로젝트 데이터 설정
        if (loadedProjects && loadedProjects.length > 0) {
          const formattedProjects = loadedProjects.map((project: any) => ({
            name: project.project_name || "",
            period: project.project_period || "",
            summary: project.project_intro || "",
            description: project.description || "",
            role: project.role || "",
            stack: project.tech_stack || "",
            github: project.github_url || "",
          }));
          setProjects(formattedProjects);
          setProjectIds(loadedProjects.map((p: any) => p.id));
        }

        // 수상 및 활동 데이터 설정
        if (loadedAwards && loadedAwards.length > 0) {
          const formattedAwards = loadedAwards.map((award: any) => ({
            name: award.name || "",
            date: award.date ? award.date.replace(/-/g, ".") : "",
            org: award.organization || "",
          }));
          setAwards(formattedAwards);
          setAwardIds(loadedAwards.map((a: any) => a.id));
        }

        // 교육 데이터 설정
        if (loadedEducations && loadedEducations.length > 0) {
          const formattedEducations = loadedEducations.map(
            (education: any) => ({
              org: education.institution || "",
              period: education.period
                ? education.period.replace(/-/g, ".").replace(/ ~ /g, "~")
                : "",
              name: education.name || "",
            })
          );
          setEducations(formattedEducations);
          setEducationIds(loadedEducations.map((e: any) => e.id));
        }

        console.log("데이터 로드 완료:", response.data);
      } else {
        console.error("데이터 로드 실패:", response.message);
      }
    } catch (error) {
      console.error("데이터 로드 중 오류:", error);
    } finally {
      setIsLoading(false);
      setIsDataLoaded(true);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    // URL에서 resume_id 파라미터 확인
    const urlParams = new URLSearchParams(window.location.search);
    const resumeIdFromUrl = urlParams.get("resume_id");

    if (resumeIdFromUrl) {
      const resumeIdNum = parseInt(resumeIdFromUrl);
      if (!isNaN(resumeIdNum)) {
        loadResumeData(resumeIdNum);
      }
    }
  }, []);

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

      let response;
      if (resumeId) {
        // 기존 데이터가 있으면 업데이트
        response = await ResumeService.updateBasicInfo(resumeId, apiData);
      } else {
        // 새로 생성
        response = await ResumeService.submitBasicInfo(apiData);
      }

      if (response.success) {
        // 응답 데이터에서 user_id와 resume_id 저장
        if (response.data) {
          const responseData = response.data as ResumeResponseData;
          saveUserId(responseData.user_id);
          setResumeId(responseData.id);
          console.log("저장된 user_id:", responseData.user_id);
          console.log("저장된 resume_id:", responseData.id);
        }
        alert("기본 정보가 성공적으로 저장되었습니다!");
        setSavedSections((prev) => ({ ...prev, basicInfo: true }));
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

  // 프로젝트 저장 함수
  const handleSubmitProjects = async () => {
    if (isLoading) return; // 중복 요청 방지

    try {
      setIsLoading(true);

      // localStorage에서 user_id 불러오기
      const savedUserId = localStorage.getItem("userId");
      const currentUserId = savedUserId ? parseInt(savedUserId) : null;

      if (!currentUserId) {
        alert("사용자 정보를 찾을 수 없습니다. 기본 정보를 먼저 저장해주세요.");
        return;
      }

      // 프로젝트 데이터 검증
      const validProjects = projects.filter(
        (project) =>
          project.name &&
          project.period &&
          project.summary &&
          project.description &&
          project.role &&
          project.stack
      );

      if (validProjects.length === 0) {
        alert(
          "저장할 프로젝트가 없습니다. 최소 하나의 프로젝트를 입력해주세요."
        );
        return;
      }

      // 각 프로젝트를 순차적으로 저장
      for (let i = 0; i < validProjects.length; i++) {
        const project = validProjects[i];

        const projectData: ProjectData = {
          user_id: currentUserId, // localStorage에서 불러온 user_id 사용
          project_name: project.name,
          project_period: project.period,
          project_intro: project.summary,
          description: project.description,
          role: project.role,
          tech_stack: project.stack,
        };

        console.log(`프로젝트 ${i + 1} API 요청 데이터:`, projectData);

        let response;
        // 기존 프로젝트 ID가 있으면 업데이트, 없으면 새로 생성
        if (projectIds && projectIds[i]) {
          response = await ProjectService.updateProject(
            projectIds[i],
            projectData
          );
        } else {
          response = await ProjectService.submitProject(projectData);
        }

        if (!response.success) {
          alert(`프로젝트 "${project.name}" 저장 실패: ${response.message}`);
          return;
        }
      }

      alert("모든 프로젝트가 성공적으로 저장되었습니다!");
      setSavedSections((prev) => ({ ...prev, projects: true }));
    } catch (error) {
      console.error("프로젝트 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 수상 및 활동 저장 함수
  const handleSubmitAwards = async () => {
    try {
      // localStorage에서 user_id 불러오기
      const savedUserId = localStorage.getItem("userId");
      const currentUserId = savedUserId ? parseInt(savedUserId) : null;

      if (!currentUserId) {
        alert("사용자 정보를 찾을 수 없습니다. 기본 정보를 먼저 저장해주세요.");
        return;
      }

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
          user_id: currentUserId, // localStorage에서 불러온 user_id 사용
          name: award.name,
          date: formattedDate,
          organization: award.org,
        };

        console.log(`수상 및 활동 ${i + 1} API 요청 데이터:`, awardData);

        let response;
        // 기존 수상 및 활동 ID가 있으면 업데이트, 없으면 새로 생성
        if (awardIds[i]) {
          response = await AwardService.updateAward(awardIds[i], awardData);
        } else {
          response = await AwardService.submitAward(awardData);
        }

        if (!response.success) {
          alert(`수상 및 활동 "${award.name}" 저장 실패: ${response.message}`);
          return;
        }
      }

      alert("모든 수상 및 활동이 성공적으로 저장되었습니다!");
      setSavedSections((prev) => ({ ...prev, awards: true }));
    } catch (error) {
      console.error("수상 및 활동 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 교육 저장 함수
  const handleSubmitEducations = async () => {
    try {
      // localStorage에서 user_id 불러오기
      const savedUserId = localStorage.getItem("userId");
      const currentUserId = savedUserId ? parseInt(savedUserId) : null;

      if (!currentUserId) {
        alert("사용자 정보를 찾을 수 없습니다. 기본 정보를 먼저 저장해주세요.");
        return;
      }

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
          resume_id: resumeId || 1, // 저장된 resume_id 사용
          user_id: currentUserId, // localStorage에서 불러온 user_id 사용
          institution: education.org,
          period: formattedPeriod,
          name: education.name,
        };

        let response;
        // 기존 교육 ID가 있으면 업데이트, 없으면 새로 생성
        if (educationIds[i]) {
          response = await EducationService.updateEducation(
            educationIds[i],
            educationData
          );
        } else {
          response = await EducationService.submitEducation(educationData);
        }

        if (!response.success) {
          alert(`교육 "${education.name}" 저장 실패: ${response.message}`);
          return;
        }
      }

      alert("모든 교육이 성공적으로 저장되었습니다!");
      setSavedSections((prev) => ({ ...prev, education: true }));
    } catch (error) {
      console.error("교육 저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 포트폴리오 저장 함수
  const handleSubmitPortfolios = async () => {
    try {
      // localStorage에서 user_id 불러오기
      const savedUserId = localStorage.getItem("userId");
      const currentUserId = savedUserId ? parseInt(savedUserId) : null;

      if (!currentUserId) {
        alert("사용자 정보를 찾을 수 없습니다. 기본 정보를 먼저 저장해주세요.");
        return;
      }

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
      const savedPortfolioIds: number[] = [];

      for (let i = 0; i < validPortfolios.length; i++) {
        const portfolio = validPortfolios[i];

        const portfolioData: PortfolioData = {
          user_id: currentUserId, // localStorage에서 불러온 user_id 사용
          project_name: portfolio.name,
          project_intro: portfolio.summary,
          project_period: portfolio.period,
          role: portfolio.role,
          project_url: portfolio.url || undefined,
          image: portfolio.image || undefined,
          is_representative: portfolio.isRepresentative,
        };

        console.log(`포트폴리오 ${i + 1} API 요청 데이터:`, portfolioData);

        let response;
        // 기존 포트폴리오 ID가 있으면 업데이트, 없으면 새로 생성
        if (portfolioIds[i]) {
          response = await PortfolioService.updatePortfolio(
            portfolioIds[i],
            portfolioData
          );
        } else {
          response = await PortfolioService.submitPortfolio(portfolioData);
        }

        if (!response.success) {
          alert(
            `포트폴리오 "${portfolio.name}" 저장 실패: ${response.message}`
          );
          return;
        }

        // 응답에서 포트폴리오 ID 저장
        if (response.data) {
          const responseData = response.data as PortfolioResponseData;
          savedPortfolioIds.push(responseData.id);
          console.log(`포트폴리오 "${portfolio.name}" ID:`, responseData.id);
        }
      }

      // 저장된 포트폴리오 ID들을 상태에 저장
      setPortfolioIds(savedPortfolioIds);
      console.log("저장된 포트폴리오 ID들:", savedPortfolioIds);

      alert("모든 포트폴리오가 성공적으로 저장되었습니다!");
      setSavedSections((prev) => ({ ...prev, portfolios: true }));
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

      // 2. 포트폴리오 저장 (프로젝트보다 먼저 저장)
      await handleSubmitPortfolios();

      // 3. 프로젝트 저장 (포트폴리오 ID 사용)
      await handleSubmitProjects();

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

  // 로딩 중일 때 표시할 컴포넌트
  if (isLoading && !isDataLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

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
            {/* <span className="text-orange-500 text-xs font-bold">
              {basicInfoProgress}%
            </span> */}
          </div>
          <ul className="text-[#929292] text-sm space-y-2">
            {sidebarItems.map((item, idx) => {
              const isSaved =
                (idx === 0 && savedSections.basicInfo) ||
                (idx === 1 && savedSections.projects) ||
                (idx === 2 && savedSections.portfolios) ||
                (idx === 3 && savedSections.awards) ||
                (idx === 4 && savedSections.education);

              return (
                <li
                  key={item}
                  onClick={() => setActiveIndex(idx)}
                  className={`cursor-pointer px-5 py-3 rounded-xl border transition-all select-none flex items-center justify-between
                    ${
                      activeIndex === idx
                        ? "bg-[#FFF7ED] border-transparent text-[#525151] font-semibold"
                        : "border-transparent hover:bg-orange-50 hover:border-orange-100"
                    }
                  `}
                >
                  <span>{item}</span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      isSaved
                        ? "bg-[#FF6E15] border-[#FF6E15]"
                        : "bg-white border-[#E5E5E5]"
                    }`}
                  >
                    <svg
                      className={`w-3 h-3 ${
                        isSaved ? "text-white" : "text-[#E5E5E5]"
                      }`}
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
                </li>
              );
            })}
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
            <div className="space-y-8">
              {/* 헤더 섹션 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      수상 및 자격 내역
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={addAward}
                    className="w-10 h-10 text-[#FF6E15] hover:text-[#E55A0A] transition-colors flex items-center justify-center"
                    aria-label="수상 내역 추가"
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

              {/* 수상 카드들 */}
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  className="relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* 삭제 버튼 */}
                  {awards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAward(idx)}
                      className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="수상/자격 삭제"
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

                  {/* 수상 번호 */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                      {idx + 1}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                      수상 내역 {idx + 1}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        수상 및 자격증명
                      </label>
                      <input
                        type="text"
                        value={award.name}
                        onChange={(e) =>
                          handleAwardChange(idx, "name", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                        placeholder="수상 및 자격증명을 입력해주세요"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        취득일
                      </label>
                      <input
                        type="text"
                        value={award.date}
                        onChange={(e) =>
                          handleAwardChange(idx, "date", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                        placeholder="2025.03"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      기관명
                    </label>
                    <input
                      type="text"
                      value={award.org}
                      onChange={(e) =>
                        handleAwardChange(idx, "org", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="기관명을 입력해주세요"
                    />
                  </div>
                </div>
              ))}

              {/* 저장 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitAwards}
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
                  수상 내역 저장
                </button>
              </div>
            </div>
          ) : activeIndex === 4 ? (
            <div className="space-y-8">
              {/* 헤더 섹션 */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      교육
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="w-10 h-10 text-[#FF6E15] hover:text-[#E55A0A] transition-colors flex items-center justify-center"
                    aria-label="교육 추가"
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

              {/* 교육 카드들 */}
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* 삭제 버튼 */}
                  {educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="교육 삭제"
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

                  {/* 교육 번호 */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                      {idx + 1}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                      교육 {idx + 1}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        교육 기관
                      </label>
                      <input
                        type="text"
                        value={edu.org}
                        onChange={(e) =>
                          handleEducationChange(idx, "org", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                        placeholder="멋쟁이사자처럼"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        교육 기간
                      </label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) =>
                          handleEducationChange(idx, "period", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                        placeholder="2025.01~2025.03"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      교육명
                    </label>
                    <input
                      type="text"
                      value={edu.name}
                      onChange={(e) =>
                        handleEducationChange(idx, "name", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="프론트엔드 부트캠프 00기"
                    />
                  </div>
                </div>
              ))}

              {/* 저장 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitEducations}
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
                  교육 저장
                </button>
              </div>
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
