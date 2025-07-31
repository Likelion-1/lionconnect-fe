"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { ConnectRequestService } from "@/lib/services/connectRequestService";
import { useSearchParams } from "next/navigation";

interface ConnectFormData {
  career_level: string;
  company_name: string;
  company_representative_email: string;
  company_representative_name: string;
  company_representative_phone: string;
  employment_type: string;
  job_description: string;
  message: string;
  position: string;
  required_stack: string;
  user_id: number;
}

const DUMMY_PROJECTS = [
  // 프론트엔드
  {
    id: 1,
    name: "김프론트",
    role: "프론트엔드",
    intro: "React와 TypeScript를 활용한 모던 웹 개발자입니다.",
    projectImg: "/images/Frame.png",
    projectName: "토도동",
    projectDesc: "농구 경기를 볼 수 있는 서비스 입니다.",
    points: [
      "Redux Hooks를 활용한 000개선",
      "클린아키텍처를 적용하여 코드 효율 달성",
      "Vercel을 활용한 배포",
    ],
  },
  {
    id: 2,
    name: "이리액트",
    role: "프론트엔드",
    intro: "사용자 경험을 중시하는 프론트엔드 개발자입니다.",
    projectImg: "/images/Preview.png",
    projectName: "쇼핑몰",
    projectDesc: "온라인 쇼핑몰 플랫폼입니다.",
    points: [
      "Vue.js를 활용한 SPA 개발",
      "반응형 웹 디자인 구현",
      "성능 최적화",
    ],
  },
  {
    id: 3,
    name: "박웹",
    role: "프론트엔드",
    intro: "Next.js와 Tailwind CSS를 활용한 개발자입니다.",
    projectImg: "/images/Frame.png",
    projectName: "블로그",
    projectDesc: "개인 블로그 플랫폼입니다.",
    points: ["SSR/SSG 구현", "SEO 최적화", "다크모드 지원"],
  },

  // 백엔드
  {
    id: 4,
    name: "최백엔드",
    role: "백엔드",
    intro: "Spring Boot와 JPA를 활용한 백엔드 개발자입니다.",
    projectImg: "/images/Preview.png",
    projectName: "API 서버",
    projectDesc: "RESTful API 서버입니다.",
    points: ["Spring Security 구현", "JWT 인증 시스템", "데이터베이스 설계"],
  },
  {
    id: 5,
    name: "정서버",
    role: "백엔드",
    intro: "Node.js와 Express를 활용한 백엔드 개발자입니다.",
    projectImg: "/images/Frame.png",
    projectName: "채팅 서버",
    projectDesc: "실시간 채팅 서버입니다.",
    points: ["Socket.io 구현", "Redis 캐싱", "마이크로서비스 아키텍처"],
  },
  {
    id: 6,
    name: "한API",
    role: "백엔드",
    intro: "Python Django를 활용한 백엔드 개발자입니다.",
    projectImg: "/images/Preview.png",
    projectName: "관리 시스템",
    projectDesc: "회사 관리 시스템입니다.",
    points: ["Django REST Framework", "PostgreSQL 연동", "AWS 배포"],
  },

  // 클라우드 엔지니어링
  {
    id: 7,
    name: "김클라우드",
    role: "클라우드 엔지니어링",
    intro: "AWS와 Docker를 활용한 클라우드 엔지니어입니다.",
    projectImg: "/images/Frame.png",
    projectName: "인프라 구축",
    projectDesc: "클라우드 인프라 구축 프로젝트입니다.",
    points: ["AWS EC2, S3 활용", "Docker 컨테이너화", "CI/CD 파이프라인 구축"],
  },
  {
    id: 8,
    name: "이도커",
    role: "클라우드 엔지니어링",
    intro: "Kubernetes와 Terraform을 활용한 DevOps 엔지니어입니다.",
    projectImg: "/images/Preview.png",
    projectName: "오케스트레이션",
    projectDesc: "쿠버네티스 클러스터 관리 시스템입니다.",
    points: ["K8s 클러스터 관리", "Terraform IaC", "모니터링 시스템 구축"],
  },

  // 데이터분석
  {
    id: 9,
    name: "박데이터",
    role: "데이터분석",
    intro: "Python과 Pandas를 활용한 데이터 분석가입니다.",
    projectImg: "/images/Frame.png",
    projectName: "데이터 분석",
    projectDesc: "고객 데이터 분석 프로젝트입니다.",
    points: [
      "Pandas, NumPy 활용",
      "시각화 라이브러리 사용",
      "머신러닝 모델 개발",
    ],
  },
  {
    id: 10,
    name: "최분석",
    role: "데이터분석",
    intro: "R과 Tableau를 활용한 데이터 사이언티스트입니다.",
    projectImg: "/images/Preview.png",
    projectName: "BI 대시보드",
    projectDesc: "비즈니스 인텔리전스 대시보드입니다.",
    points: ["R 통계 분석", "Tableau 시각화", "예측 모델링"],
  },

  // 게임 개발
  {
    id: 11,
    name: "정게임",
    role: "게임 개발",
    intro: "Unity와 C#을 활용한 게임 개발자입니다.",
    projectImg: "/images/Frame.png",
    projectName: "모바일 게임",
    projectDesc: "2D 모바일 게임입니다.",
    points: ["Unity 엔진 활용", "C# 스크립팅", "게임 로직 구현"],
  },
  {
    id: 12,
    name: "한게임",
    role: "게임 개발",
    intro: "Unreal Engine을 활용한 게임 개발자입니다.",
    projectImg: "/images/Preview.png",
    projectName: "3D 게임",
    projectDesc: "3D 액션 게임입니다.",
    points: ["Unreal Engine 5", "블루프린트 시스템", "3D 모델링 연동"],
  },

  // UI/UX
  {
    id: 13,
    name: "김디자인",
    role: "UI/UX",
    intro: "Figma와 Adobe XD를 활용한 UI/UX 디자이너입니다.",
    projectImg: "/images/Frame.png",
    projectName: "앱 디자인",
    projectDesc: "모바일 앱 UI/UX 디자인입니다.",
    points: ["Figma 프로토타이핑", "사용자 리서치", "디자인 시스템 구축"],
  },
  {
    id: 14,
    name: "이UX",
    role: "UI/UX",
    intro: "사용자 경험을 중시하는 UX 디자이너입니다.",
    projectImg: "/images/Preview.png",
    projectName: "웹사이트 리뉴얼",
    projectDesc: "기업 웹사이트 UX 개선 프로젝트입니다.",
    points: ["사용자 인터뷰", "퍼소나 설계", "A/B 테스트"],
  },

  // 안드로이드
  {
    id: 15,
    name: "박안드로이드",
    role: "안드로이드",
    intro: "Kotlin과 Android Studio를 활용한 안드로이드 개발자입니다.",
    projectImg: "/images/Frame.png",
    projectName: "모바일 앱",
    projectDesc: "안드로이드 네이티브 앱입니다.",
    points: ["Kotlin 개발", "MVVM 아키텍처", "Google Play 배포"],
  },
  {
    id: 16,
    name: "최모바일",
    role: "안드로이드",
    intro: "React Native를 활용한 크로스 플랫폼 개발자입니다.",
    projectImg: "/images/Preview.png",
    projectName: "하이브리드 앱",
    projectDesc: "React Native 크로스 플랫폼 앱입니다.",
    points: ["React Native", "JavaScript/TypeScript", "iOS/Android 동시 개발"],
  },

  // iOS
  {
    id: 17,
    name: "정iOS",
    role: "iOS",
    intro: "Swift와 Xcode를 활용한 iOS 개발자입니다.",
    projectImg: "/images/Frame.png",
    projectName: "iOS 앱",
    projectDesc: "iOS 네이티브 앱입니다.",
    points: ["Swift 개발", "UIKit/SwiftUI", "App Store 배포"],
  },
  {
    id: 18,
    name: "한애플",
    role: "iOS",
    intro: "iOS 생태계에 특화된 개발자입니다.",
    projectImg: "/images/Preview.png",
    projectName: "iOS 게임",
    projectDesc: "iOS 게임 앱입니다.",
    points: ["SpriteKit 활용", "게임 로직 구현", "인앱 결제 시스템"],
  },

  // 추가 데이터 (기존 30개 유지)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: 19 + i,
    name: `김멋사${19 + i}`,
    role: [
      "프론트엔드",
      "백엔드",
      "클라우드 엔지니어링",
      "데이터분석",
      "게임 개발",
      "UI/UX",
      "안드로이드",
      "iOS",
    ][i % 8],
    intro: "클린아키텍처를 설계하며 코딩하는 개발자입니다.",
    projectImg: i % 2 === 0 ? "/images/Frame.png" : "/images/Preview.png",
    projectName: "토도동",
    projectDesc: "농구 경기를 볼 수 있는 서비스 입니다.",
    points: [
      "Redux Hooks를 활용한 000개선",
      "클린아키텍처를 적용하여 코드 효율 달성",
      "Vercel을 활용한 배포",
    ],
  })),
];

export default function TalentSearchPage() {
  const searchParams = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const loaderRef = useRef<HTMLDivElement>(null);

  // URL 파라미터에서 태그 가져오기
  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) {
      // 태그 매핑
      const tagMapping: { [key: string]: string } = {
        "프론트엔드 개발자": "프론트엔드",
        "백엔드 개발자": "백엔드",
        "UI/UX 기획자": "UI/UX",
        "클라우드 엔지니어": "클라우드 엔지니어링",
        "데이터 분석가": "데이터분석",
      };

      const mappedCategory = tagMapping[tag] || tag;
      setSelectedCategory(mappedCategory);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState<ConnectFormData>({
    career_level: "",
    company_name: "",
    company_representative_email: "",
    company_representative_name: "",
    company_representative_phone: "",
    employment_type: "",
    job_description: "",
    message: "",
    position: "",
    required_stack: "",
    user_id: 1,
  });

  // 카테고리 필터링된 프로젝트
  const filteredProjects =
    selectedCategory === "전체"
      ? DUMMY_PROJECTS
      : DUMMY_PROJECTS.filter((project) => project.role === selectedCategory);

  const handleInputChange = (field: keyof ConnectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConnectClick = (userId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedUserId(userId);
    setFormData((prev) => ({ ...prev, user_id: userId }));
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(4); // 카테고리 변경 시 표시 개수 초기화
  };

  const handleSubmit = async () => {
    try {
      // localStorage에서 user_id 가져오기
      const savedUserId = localStorage.getItem("userId");
      const currentUserId = savedUserId ? parseInt(savedUserId) : null;

      if (!currentUserId) {
        alert("사용자 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.");
        return;
      }

      // user_id를 현재 로그인한 사용자 ID로 설정
      const requestData = {
        ...formData,
        user_id: currentUserId,
      };

      console.log("커넥트 요청 데이터:", requestData);

      const response = await ConnectRequestService.submitConnectRequest(
        requestData
      );

      if (response.success) {
        alert(response.message);
        setIsModalOpen(false);
        setFormData({
          career_level: "",
          company_name: "",
          company_representative_email: "",
          company_representative_name: "",
          company_representative_phone: "",
          employment_type: "",
          job_description: "",
          message: "",
          position: "",
          required_stack: "",
          user_id: 1,
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("커넥트 요청 실패:", error);
      alert("커넥트 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredProjects.length
        ) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + 8, filteredProjects.length)
            );
            setLoading(false);
          }, 600);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredProjects.length]);

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      {/* 커넥트 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">커넥트 요청</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-6"
            >
              {/* 회사 정보 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  회사 정보
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      회사명 *
                    </label>
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) =>
                        handleInputChange("company_name", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="회사명을 입력해주세요"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자명 *
                    </label>
                    <input
                      type="text"
                      value={formData.company_representative_name}
                      onChange={(e) =>
                        handleInputChange(
                          "company_representative_name",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="담당자명을 입력해주세요"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자 이메일 *
                    </label>
                    <input
                      type="email"
                      value={formData.company_representative_email}
                      onChange={(e) =>
                        handleInputChange(
                          "company_representative_email",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="example@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자 연락처 *
                    </label>
                    <input
                      type="tel"
                      value={formData.company_representative_phone}
                      onChange={(e) =>
                        handleInputChange(
                          "company_representative_phone",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="010-0000-0000"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 채용 정보 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  채용 정보
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      포지션 *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) =>
                        handleInputChange("position", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="프론트엔드 개발자"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      경력 수준 *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.career_level}
                        onChange={(e) =>
                          handleInputChange("career_level", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors appearance-none pr-10"
                        required
                      >
                        <option value="">선택해주세요</option>
                        <option value="신입">신입</option>
                        <option value="신입~3년">신입~3년</option>
                        <option value="3년~5년">3년~5년</option>
                        <option value="5년~7년">5년~7년</option>
                        <option value="7년 이상">7년 이상</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      고용 형태 *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.employment_type}
                        onChange={(e) =>
                          handleInputChange("employment_type", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors appearance-none pr-10"
                        required
                      >
                        <option value="">선택해주세요</option>
                        <option value="정규직">정규직</option>
                        <option value="계약직">계약직</option>
                        <option value="인턴">인턴</option>
                        <option value="프리랜서">프리랜서</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      필요 기술스택 *
                    </label>
                    <input
                      type="text"
                      value={formData.required_stack}
                      onChange={(e) =>
                        handleInputChange("required_stack", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors"
                      placeholder="React, TypeScript"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    업무 설명 *
                  </label>
                  <textarea
                    value={formData.job_description}
                    onChange={(e) =>
                      handleInputChange("job_description", e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors resize-none"
                    placeholder="담당할 업무에 대해 설명해주세요"
                    required
                  />
                </div>
              </div>

              {/* 메시지 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  메시지 *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E15] focus:border-[#FF6E15] transition-colors resize-none"
                  placeholder="인재에게 전달할 메시지를 입력해주세요"
                  required
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#FF6E15] text-white rounded-xl font-semibold text-sm hover:bg-[#E55A0A] transition-colors"
                >
                  커넥트 요청
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="flex-1">
        <section className="w-full max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-2 mt-8">
            인재를 둘러보고 커넥트하세요.
          </h2>
          {/* 카테고리 + 검색바 라인 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 mb-24 w-full">
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {[
                "전체",
                "프론트엔드",
                "백엔드",
                "클라우드 엔지니어링",
                "데이터분석",
                "게임 개발",
                "UI/UX",
                "안드로이드",
                "iOS",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-orange-100 text-orange-500 border-orange-300"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* 검색 바 */}
            <div className="flex-1 flex justify-end min-w-[10px]">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="이름, 기술, 프로젝트 검색"
                  className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none bg-white shadow-sm pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Search size={18} />
                </span>
              </div>
            </div>
          </div>

          {/* 인재 카드 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 mb-26">
            {filteredProjects.slice(0, visibleCount).map((item) => (
              <Link
                key={item.id}
                href={`/talent-search/${item.id}`}
                className="w-full max-w-xl mx-auto border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow p-5 flex flex-col gap-5 cursor-pointer focus:outline-none"
              >
                {/* 상단: 프로필, 이름, 소개, 버튼 */}
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/Ellipse 4.png"
                    alt="프로필"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <span className="text-lg font-bold text-gray-900 truncate">
                      {item.name} | {item.role}
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      {item.intro}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleConnectClick(item.id, e)}
                    className="px-4 py-1 border border-orange-200 bg-white text-orange-500 rounded-full font-semibold text-sm hover:bg-orange-50 transition"
                  >
                    커넥트
                  </button>
                </div>
                {/* 프로젝트 이미지 + hover 오버레이 */}
                <div className="w-full relative group">
                  <Image
                    src={item.projectImg}
                    alt="프로젝트"
                    width={600}
                    height={240}
                    className="rounded-xl w-full h-[260px] object-cover transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-black/50 flex flex-col items-start justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 text-left">
                    <span className="text-xl font-bold text-white mb-2">
                      {item.projectName}
                    </span>
                    <span className="text-white text-base mb-1">
                      {item.projectDesc}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* 무한스크롤 로더 */}
          <div
            ref={loaderRef}
            className="h-12 flex items-center justify-center"
          >
            {loading && (
              <span className="text-gray-400 mt-10">불러오는 중...</span>
            )}
          </div>

          {/* 하단 CTA */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-4 border border-[#E5E5E5] text-[#424242] rounded-full font-semibold bg-white transition-all text-lg flex items-center gap-2 hover:bg-orange-50">
              원하는 인재가 없으신가요?
              <ChevronRight size={22} className="ml-1" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
