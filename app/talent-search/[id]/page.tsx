"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ConnectRequestService } from "@/lib/services/connectRequestService";
import { ResumeService } from "@/lib/services/resumeService";
import { AuthService } from "@/lib/services/authService";

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

interface ResumeData {
  id: number;
  profile_image: string;
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
  created_at: string;
  updated_at: string;
}

interface PortfolioData {
  id: number;
  resume_id: number;
  is_representative: boolean;
  image: string;
  project_url: string;
  project_name: string;
  project_intro: string;
  project_period: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface ProjectData {
  id: number;
  portfolio_id: number;
  project_name: string;
  project_period: string;
  project_intro: string;
  description: string;
  role: string;
  tech_stack: string;
  user_id: number;
  github_url: string;
  created_at: string;
  updated_at: string;
}

interface AwardData {
  id: number;
  resume_id: number;
  name: string;
  date: string;
  organization: string;
  created_at: string;
}

interface EducationData {
  id: number;
  resume_id: number;
  institution: string;
  period: string;
  name: string;
  created_at: string;
}

interface ResumeDetailData {
  resume: ResumeData;
  portfolios: PortfolioData[];
  projects: ProjectData[];
  awards: AwardData[];
  educations: EducationData[];
}

export default function TalentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeDetailData | null>(null);

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
    user_id: parseInt(userId),
  });

  // 인증 상태 확인
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = AuthService.isAuthenticated();
      if (!isAuthenticated) {
        setIsRedirecting(true);
        const currentUrl = encodeURIComponent(window.location.pathname);
        router.replace(`/auth/login?redirect=${currentUrl}`);
      } else {
        setAuthChecking(false);
      }
    }
  }, [router]);

  // 데이터 로드 (인증 확인 후)
  useEffect(() => {
    const loadResumeData = async () => {
      if (!userId || authChecking) return;

      try {
        setLoading(true);
        setError(null);

        const response = await ResumeService.getUserResumeDetail(
          parseInt(userId)
        );

        if (response.success && response.data) {
          setResumeData(response.data);
        } else {
          setError(response.message || "데이터를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        console.error("이력서 데이터 로드 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadResumeData();
  }, [userId, authChecking]);

  const handleInputChange = (field: keyof ConnectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // user_id는 커넥트를 보낼 '대상 인재'의 ID여야 함 (상세 페이지의 params)
      const targetUserId = parseInt(params?.id as string);
      if (!targetUserId || Number.isNaN(targetUserId)) {
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
          user_id: parseInt(userId),
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("커넥트 요청 실패:", error);
      alert("커넥트 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 리다이렉트 중이거나 인증 확인 중
  if (isRedirecting || authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isRedirecting
              ? "로그인 페이지로 이동하는 중..."
              : "인증 상태를 확인하는 중..."}
          </p>
        </div>
      </div>
    );
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">인재 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const { resume, portfolios, projects, awards, educations } = resumeData;

  return (
    <div className="min-h-screen flex flex-col text-gray-900 bg-white">
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12 mt-10 relative">
        {/* 커넥트 버튼 - 오른쪽 상단 */}
        <div className="absolute top-0 right-0 z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 border border-[#E5E5E5] bg-white text-orange-500 rounded-xl font-semibold text-sm hover:bg-orange-50 transition-colors"
          >
            커넥트
          </button>
        </div>

        {/* 커넥트 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  커넥트 요청
                </h2>
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
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        고용 형태 *
                      </label>
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
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
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

        {/* 상단 프로필 */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <Image
            src={
              resume.profile_image
                ? resume.profile_image // 이미 완전한 URL이므로 그대로 사용
                : "/images/Ellipse 4.png"
            }
            alt="프로필"
            width={96}
            height={96}
            className="rounded-full object-cover"
            onError={(e) => {
              console.error("프로필 이미지 로딩 실패:", resume.profile_image);
              e.currentTarget.src = "/images/Ellipse 4.png";
            }}
          />
          <div className="text-xl font-bold">
            {resume.name}{" "}
            <span className="font-normal">| {resume.job_type}</span>
          </div>
          <div className="text-gray-500 text-sm">
            {resume.period} &nbsp;·&nbsp; {resume.phone} &nbsp;·&nbsp;{" "}
            {resume.email}
          </div>
          <div className="text-base text-center text-gray-700 mt-2">
            {resume.short_intro}
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 기본정보 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">기본정보</div>
          <div className="flex flex-row gap-8 text-md">
            <div>
              <div className="text-black-500 font-semibold">학력</div>
              <div className="text-gray-500 font-medium">{resume.period}</div>
            </div>
            <div className="px-10">
              <div className="font-semibold">
                {resume.school} {resume.grade}
              </div>
              <div className="text-gray-500">{resume.major}</div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 포트폴리오 */}
        {portfolios.length > 0 && (
          <>
            <div className="mb-10">
              <div className="font-semibold mb-8 text-xl">포트폴리오</div>
              <div className="flex flex-row gap-6">
                {portfolios.map((portfolio, index) => (
                  <a
                    key={portfolio.id}
                    href={portfolio.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 rounded-xl overflow-hidden bg-black border border-gray-200 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full h-[180px] bg-gray-100">
                      <Image
                        src={
                          portfolio.image
                            ? portfolio.image // 이미 완전한 URL이므로 그대로 사용
                            : "/images/Frame.png"
                        }
                        alt={portfolio.project_name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          console.error(
                            "포트폴리오 이미지 로딩 실패:",
                            portfolio.image
                          );
                          e.currentTarget.src = "/images/Frame.png";
                        }}
                      />
                    </div>
                    <div className="flex flex-row items-end justify-between px-4 py-3 bg-white">
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-700 truncate mb-2">
                          {portfolio.project_name}
                        </div>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                            {portfolio.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-[#757575] whitespace-nowrap">
                        {portfolio.project_period}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <hr className="my-8 border-gray-200" />
          </>
        )}

        {/* 프로젝트 */}
        {projects.length > 0 && (
          <>
            <div className="mb-10">
              <div className="font-semibold mb-8 text-xl">프로젝트</div>
              <div className="flex flex-col gap-6">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">
                        {project.project_name}
                      </span>
                      <span className="text-md text-gray-500">
                        {project.project_period}
                      </span>
                    </div>
                    <div className="text-md text-gray-500 mb-1">
                      {project.project_intro}
                    </div>
                    <div className="text-md">
                      기술스택: {project.tech_stack}
                    </div>
                    <div className="text-md text-gray-600 mt-1">
                      역할: {project.role}
                    </div>
                    {project.description && (
                      <div className="text-md text-gray-600 mt-1">
                        {project.description}
                      </div>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600 text-sm mt-2 inline-block"
                      >
                        GitHub 링크 →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-8 border-gray-200" />
          </>
        )}

        {/* 수상 및 활동 */}
        {awards.length > 0 && (
          <>
            <div className="mb-10">
              <div className="font-semibold mb-8 text-xl">수상 및 활동</div>
              <div className="flex flex-col gap-2 text-md">
                {awards.map((award) => (
                  <div key={award.id}>
                    <span className="text-gray-500 mr-4 text-md">
                      {award.date}
                    </span>
                    <span className="font-semibold text-md">{award.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {award.organization}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-8 border-gray-200" />
          </>
        )}

        {/* 교육 */}
        {educations.length > 0 && (
          <>
            <div className="mb-10">
              <div className="font-semibold mb-8 text-lg">교육</div>
              <div className="flex flex-col gap-4">
                {educations.map((education) => (
                  <div
                    key={education.id}
                    className="flex flex-row gap-8 text-md"
                  >
                    <div>
                      <div className="font-semibold">
                        {education.institution}
                      </div>
                      <div className="text-gray-500">{education.period}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 px-10">
                        {education.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-8 border-gray-200" />
          </>
        )}

        {/* 자기소개 */}
        {resume.intro && (
          <div className="mb-10">
            <div className="font-semibold mb-8 text-lg">자기소개</div>
            <div className="text-gray-700 leading-relaxed">{resume.intro}</div>
          </div>
        )}
      </main>
    </div>
  );
}
