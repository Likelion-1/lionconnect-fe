"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search, ChevronRight } from "lucide-react";

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

const DUMMY_PROJECTS = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: `김멋사${i + 1}`,
  role: "프론트엔드",
  intro: "클린아키텍처를 설계하며 코딩하는 개발자입니다.",
  projectImg: i % 2 === 0 ? "/images/Frame.png" : "/images/Preview.png",
  projectName: "토도동",
  projectDesc: "농구 경기를 볼 수 있는 서비스 입니다.",
  points: [
    "Redux Hooks를 활용한 000개선",
    "클린아키텍처를 적용하여 코드 효율 달성",
    "Vercel을 활용한 배포",
  ],
}));

export default function TalentSearchPage() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async () => {
    try {
      console.log("커넥트 요청 데이터:", formData);
      // TODO: API 호출 로직 추가
      alert("커넥트 요청이 성공적으로 전송되었습니다!");
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
    } catch (error) {
      console.error("커넥트 요청 실패:", error);
      alert("커넥트 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < DUMMY_PROJECTS.length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + 8, DUMMY_PROJECTS.length)
            );
            setLoading(false);
          }, 600);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount]);

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
                "프론트엔드",
                "백엔드",
                "클라우드 엔지니어링",
                "데이터분석",
                "게임 개발",
                "UI/UX",
                "안드로이드",
                "iOS",
              ].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    i === 3
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
            {DUMMY_PROJECTS.slice(0, visibleCount).map((item) => (
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
