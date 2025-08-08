"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TalentData {
  user: {
    email: string;
    password: string;
    name: string;
    course_name: string;
    course_generation: string;
    tech_stack: string;
  };
  resume: {
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
    age: number;
  };
  portfolios: Array<{
    project_name: string;
    project_intro: string;
    project_period: string;
    role: string;
    is_representative: boolean;
    image: string;
    project_url: string;
  }>;
  projects: Array<{
    project_name: string;
    project_period: string;
    project_intro: string;
    description: string;
    role: string;
    tech_stack: string;
    github_url: string;
  }>;
  awards: Array<{
    name: string;
    date: string;
    organization: string;
  }>;
  educations: Array<{
    institution: string;
    period: string;
    name: string;
  }>;
}

interface BulkUploadRequest {
  talents: TalentData[];
}

export default function AdminBulkUploadPage() {
  const [jsonData, setJsonData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonData(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!jsonData.trim()) {
      setError("JSON 데이터를 입력해주세요.");
      return;
    }

    try {
      const parsedData: BulkUploadRequest = JSON.parse(jsonData);
      setIsLoading(true);
      setError("");
      setResult(null);

      const response = await fetch("/api/admin/bulk/talents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          x_admin_api_key: "lc_admin_6f52",
        },
        body: JSON.stringify(parsedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "업로드 중 오류가 발생했습니다."
        );
      }

      setResult(responseData);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("올바른 JSON 형식이 아닙니다.");
      } else {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                수료생 데이터 일괄 등록
              </h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                로그아웃
              </button>
            </div>

            <div className="space-y-6">
              {/* 파일 업로드 섹션 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JSON 파일 업로드
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>

              {/* JSON 데이터 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JSON 데이터
                </label>
                <textarea
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  placeholder="JSON 데이터를 입력하거나 파일을 업로드하세요..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              {/* 제출 버튼 */}
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "업로드 중..." : "데이터 업로드"}
                </button>
                <button
                  onClick={() => {
                    setJsonData("");
                    setResult(null);
                    setError("");
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  초기화
                </button>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* 결과 표시 */}
              {result && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-green-800 font-medium mb-2">
                    업로드 완료
                  </h3>
                  <pre className="text-green-700 text-sm whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}

              {/* 예시 데이터 */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  JSON 형식 예시
                </h3>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap overflow-x-auto">
                  {`{
  "talents": [
    {
      "user": {
        "email": "stu1@example.com",
        "password": "pw123456",
        "name": "학생1",
        "course_name": "프론트엔드 부트캠프",
        "course_generation": "1기",
        "tech_stack": "React,TypeScript"
      },
      "resume": {
        "profile_image": "/media/profile/user1.jpg",
        "name": "학생1",
        "email": "stu1@example.com",
        "phone": "010-0000-0000",
        "job_type": "프론트엔드",
        "school": "멋사대학교",
        "major": "컴퓨터공학과",
        "grade": "4학년",
        "period": "2023.03~2023.08",
        "short_intro": "소개",
        "intro": "상세소개",
        "age": 24
      },
      "portfolios": [
        {
          "project_name": "포폴1",
          "project_intro": "소개",
          "project_period": "2023.01~03",
          "role": "FE",
          "is_representative": true,
          "image": "/media/portfolio/p1.jpg",
          "project_url": "https://example.com"
        }
      ],
      "projects": [
        {
          "project_name": "프로젝트A",
          "project_period": "2023.02~06",
          "project_intro": "요약",
          "description": "설명",
          "role": "FE",
          "tech_stack": "React,TS",
          "github_url": "https://github.com/user/repo"
        }
      ],
      "awards": [
        { "name": "정보처리기사", "date": "2023-08", "organization": "큐넷" }
      ],
      "educations": [
        { "institution": "OO교육원", "period": "2022-12~2023-02", "name": "고급 JS" }
      ]
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
