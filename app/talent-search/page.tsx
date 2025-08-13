"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { Search, ChevronRight } from "lucide-react";
import { ConnectRequestService } from "@/lib/services/connectRequestService";
import { TalentService, Talent } from "@/lib/services/talentService";
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

function TalentSearchContent() {
  const searchParams = useSearchParams();
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
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

  const loadTalents = useCallback(
    async (reset: boolean = false) => {
      console.log(
        `Loading talents: skip=${reset ? 0 : skip}, limit=10, reset=${reset}`
      );
      setLoading(true);

      try {
        const currentSkip = reset ? 0 : skip;
        const data = await TalentService.getTalents(currentSkip, 10);
        console.log(`Received ${data.length} talents:`, data);

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setTalents((prev) => {
            if (reset) {
              console.log(`Resetting talents, new count: ${data.length}`);
              return data;
            } else {
              // 중복 제거 로직 추가
              const existingIds = new Set(prev.map((t) => t.user_id));
              const uniqueNewData = data.filter(
                (t) => !existingIds.has(t.user_id)
              );

              if (uniqueNewData.length === 0) {
                console.log("No new unique talents found");
                setHasMore(false);
                return prev;
              }

              const newTalents = [...prev, ...uniqueNewData];
              console.log(
                `Total talents after update: ${newTalents.length} (added ${uniqueNewData.length} new)`
              );
              return newTalents;
            }
          });
          setSkip((prev) => (reset ? 10 : prev + 10));
        }
      } catch (error) {
        console.error("Failed to load talents:", error);
      } finally {
        // 로딩 상태를 약간 지연시켜 깜빡임 방지
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    },
    [] // 의존성 제거
  );

  // 초기 데이터 로드 (한 번만 실행)
  useEffect(() => {
    if (!isInitialized) {
      console.log("Initial data load");
      setIsInitialized(true);
      loadTalents(true);
    }
  }, [isInitialized]); // loadTalents 의존성 제거

  // 필터 변경 시 데이터 리셋 (디바운스 적용)
  useEffect(() => {
    if (!isInitialized) return;

    const timeoutId = setTimeout(() => {
      console.log("Filter changed, resetting data");
      setTalents([]);
      setSkip(0);
      setHasMore(true);
      loadTalents(true);
    }, 500); // 500ms 디바운스로 증가

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]); // isInitialized 의존성 제거

  // 뒤로가기 시 데이터 복원 (필요한 경우에만)
  useEffect(() => {
    if (isInitialized && talents.length === 0) {
      console.log("Restoring data after navigation");
      loadTalents(true);
    }
  }, [isInitialized, talents.length]); // talents.length만 의존성으로

  // 브라우저 뒤로가기/앞으로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      // 뒤로가기/앞으로가기 시 데이터가 있으면 새로고침하지 않음
      if (talents.length > 0) {
        console.log("Navigation detected, keeping existing data");
        return;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [talents.length]);

  // 검색 필터링 함수
  const filterBySearch = (talent: Talent) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const searchableText = [
      talent.name,
      talent.job_type,
      talent.short_intro,
      talent.school,
      talent.major,
      talent.representative_portfolio?.project_name || "",
      talent.representative_portfolio?.project_intro || "",
      talent.representative_portfolio?.tech_stack || "",
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  };

  // 카테고리 및 검색 필터링된 인재
  const filteredTalents = talents
    .filter(filterBySearch)
    .filter(
      (talent) =>
        selectedCategory === "전체" || talent.job_type === selectedCategory
    );

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
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSubmit = async () => {
    try {
      // user_id는 커넥트를 보낼 '대상 인재'의 ID여야 함
      const targetUserId = selectedUserId ?? formData.user_id;
      if (!targetUserId) {
        alert("대상 인재 정보가 없습니다. 다시 시도해주세요.");
        return;
      }

      const requestData = {
        ...formData,
        user_id: targetUserId,
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

  // 무한스크롤
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadTalents(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]); // loadTalents 의존성 제거

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
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none bg-white shadow-sm pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Search size={18} />
                </span>
              </div>
            </div>
          </div>

          {/* 검색 결과 없음 메시지 */}
          {filteredTalents.length === 0 && searchQuery.trim() !== "" && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                "{searchQuery}"에 대한 검색 결과가 없습니다.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                다른 키워드로 검색해보세요.
              </p>
            </div>
          )}

          {/* 인재 카드 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 mb-26">
            {filteredTalents.map((talent, index) => (
              <Link
                key={`${talent.user_id}-${talent.created_at}-${index}`}
                href={`/talent-search/${talent.user_id}`}
                className="w-full max-w-xl mx-auto border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow p-5 flex flex-col gap-5 cursor-pointer focus:outline-none"
              >
                {/* 상단: 프로필, 이름, 소개, 버튼 */}
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      talent.profile_image
                        ? talent.profile_image // 이미 완전한 URL이므로 그대로 사용
                        : "/images/Ellipse 4.png"
                    }
                    alt="프로필"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    onError={(e) => {
                      console.error(
                        "프로필 이미지 로딩 실패:",
                        talent.profile_image
                      );
                      e.currentTarget.src = "/images/Ellipse 4.png";
                    }}
                  />
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    <span className="text-lg font-bold text-gray-900 truncate">
                      {talent.name} | {talent.job_type}
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      {talent.short_intro}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleConnectClick(talent.user_id, e)}
                    className="px-4 py-1 border border-orange-200 bg-white text-orange-500 rounded-full font-semibold text-sm hover:bg-orange-50 transition"
                  >
                    커넥트
                  </button>
                </div>
                {/* 프로젝트 이미지 + hover 오버레이 */}
                {talent.representative_portfolio ? (
                  <div className="w-full relative group">
                    <Image
                      src={
                        talent.representative_portfolio.image
                          ? talent.representative_portfolio.image // 이미 완전한 URL이므로 그대로 사용
                          : "/images/Frame.png"
                      }
                      alt="프로젝트"
                      width={600}
                      height={240}
                      className="rounded-xl w-full h-[260px] object-cover transition-all duration-300"
                      onError={(e) => {
                        console.error(
                          "프로젝트 이미지 로딩 실패:",
                          talent.representative_portfolio?.image
                        );
                        e.currentTarget.src = "/images/Frame.png";
                      }}
                    />
                    <div className="absolute inset-0 rounded-xl bg-black/50 flex flex-col items-start justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 text-left">
                      <span className="text-xl font-bold text-white mb-2">
                        {talent.representative_portfolio.project_name}
                      </span>
                      <span className="text-white text-base mb-1">
                        {talent.representative_portfolio.project_intro}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[260px] bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      프로젝트 정보가 없습니다
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* 무한스크롤 로더 */}
          <div
            ref={loaderRef}
            className="h-12 flex items-center justify-center"
          >
            {loading && (
              <div className="flex items-center gap-2 text-gray-400 mt-10">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                <span>불러오는 중...</span>
              </div>
            )}
            {!hasMore && talents.length > 0 && (
              <span className="text-gray-400 mt-10">
                모든 인재를 불러왔습니다.
              </span>
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

export default function TalentSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      }
    >
      <TalentSearchContent />
    </Suspense>
  );
}
