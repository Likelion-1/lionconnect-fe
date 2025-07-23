"use client";
import Image from "next/image";
import { useState } from "react";
import { ConnectRequestService } from "@/lib/services/connectRequestService";

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

export default function TalentDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    user_id: 1, // 실제로는 동적으로 설정
  });

  const handleInputChange = (field: keyof ConnectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
            src="/images/Ellipse 4.png"
            alt="프로필"
            width={96}
            height={96}
            className="rounded-full"
          />
          <div className="text-xl font-bold">
            이름 <span className="font-normal">| 프론트엔드 개발자</span>
          </div>
          <div className="text-gray-500 text-sm">
            0000.00.00(만 00세) &nbsp;·&nbsp; 010-0000-0000 &nbsp;·&nbsp;
            test@test.com
          </div>
          <div className="text-base text-center text-gray-700 mt-2">
            AI와 함께 생각하고 함께 만들어가는 개발자 김종윤입니다.
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 기본정보 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">기본정보</div>
          <div className="flex flex-row gap-8 text-md">
            <div>
              <div className="text-black-500 font-semibold">학력</div>
              <div className="text-gray-500 font-medium">2022.02~2026.02</div>
            </div>
            <div className="px-10">
              <div className="font-semibold">멋사대학교 4.0/4.5</div>
              <div className="text-gray-500">컴퓨터공학부</div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 포트폴리오 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">포트폴리오</div>
          <div className="flex flex-row gap-6">
            {/* 카드 1 */}
            <a
              href="https://www.notion.so/example1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 rounded-xl overflow-hidden bg-black border border-gray-200 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-[180px] bg-gray-100">
                <Image
                  src="/images/Frame.png"
                  alt="TriFly"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-row items-end justify-between px-4 py-3 bg-white">
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-700 truncate mb-2">
                    TriFly | 항공권 예약 사이트
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      서비스 기획
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      프론트엔드
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#757575] whitespace-nowrap">
                  2025.04 ~ 2025.05
                </span>
              </div>
            </a>
            {/* 카드 2 */}
            <a
              href="https://www.notion.so/example2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 rounded-xl overflow-hidden bg-black border border-gray-200 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-[180px] bg-gray-100">
                <Image
                  src="/images/Preview.png"
                  alt="Wish"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-row items-end justify-between px-4 py-3 bg-white">
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-700 truncate mb-2">
                    Wish | 난임 부부를 위한 AI 실내 케어 서비스
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      서비스 기획
                    </span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold">
                      프론트엔드
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#757575] whitespace-nowrap">
                  2025.04 ~ 2025.05
                </span>
              </div>
            </a>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 프로젝트 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">프로젝트</div>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">꿀트립</span>
                <span className="text-md text-gray-500">2022.02~2026.02</span>
              </div>
              <div className="text-md text-gray-500 mb-1">
                위치 기반 여행 도슨트 & 꿀팁 가이드 웹앱
              </div>
              <div className="text-md">
                기술스택: React, Next.js, TypeScript, Module CSS, Zustand,
                Prisma ORM
              </div>
              <ul className="text-md text-gray-600 list-disc list-inside mt-1">
                <li>위치 기반 장소 추천 및 일정 관리</li>
                <li>여행지별 데이터 통계, 리뷰, 사진 제공</li>
                <li>사용자 피드백 수집 기능</li>
                <li>CI/CD 파이프라인 구축 (GitHub Actions + PM2 + Nginx)</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">꿀트립</span>
                <span className="text-md text-gray-500">2022.02~2026.02</span>
              </div>
              <div className="text-md text-gray-500 mb-1">
                위치 기반 여행 도슨트 & 꿀팁 가이드 웹앱
              </div>
              <div className="text-md">
                기술스택: React, Next.js, TypeScript, Module CSS, Zustand,
                Prisma ORM
              </div>
              <ul className="text-md text-gray-600 list-disc list-inside mt-1">
                <li>위치 기반 장소 추천 및 일정 관리</li>
                <li>여행지별 데이터 통계, 리뷰, 사진 제공</li>
                <li>사용자 피드백 수집 기능</li>
                <li>CI/CD 파이프라인 구축 (GitHub Actions + PM2 + Nginx)</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 수상 및 활동 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-xl">수상 및 활동</div>
          <div className="flex flex-col gap-2 text-md">
            <div>
              <span className="text-gray-500 mr-4 text-md">2024.12</span>
              <span className="font-semibold text-md">
                한국정보산업연합회장상
              </span>
              <span className="text-xs text-gray-500 ml-2">
                한이음 ICT멘토링 | OpenAI를 활용한 그림 일기 서비스
              </span>
            </div>
            <div>
              <span className="text-gray-500 mr-4">2022.09</span>
              <span className="font-semibold">SQL 개발자(SQLD)</span>
              <span className="text-xs text-gray-500 ml-2">
                한국데이터산업진흥원
              </span>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 교육 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-lg">교육</div>
          <div className="flex flex-row gap-8 text-md">
            <div>
              <div className="font-semibold">멋쟁이사자처럼</div>
              <div className="text-gray-500">2022.02~2026.02</div>
            </div>
            <div>
              <div className="text-gray-500 px-10">
                멋쟁이사자처럼 프론트엔드 부트캠프 00기 수료
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />

        {/* 기술스택 */}
        <div className="mb-10">
          <div className="font-semibold mb-8 text-lg">기술 스택</div>
          <div className="flex flex-row gap-2 flex-wrap">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              Next.js
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              React
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
              JavaScript
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
