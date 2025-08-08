"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService, LoginRequest } from "@/lib/services/authService";

type UserType = "student" | "company";

interface SignupForm {
  email: string;
  password: string;
  name: string;
  company_name?: string; // 기업명 필드 추가
}

export default function AuthPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("student");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<SignupForm>({
    email: "",
    password: "",
    name: "",
    company_name: "", // 기업명 초기값 추가
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // const handleKakaoLogin = () => {
  //   // 실제 카카오 OAuth2 로그인 시작
  //   console.log("카카오 로그인 시작 - 사용자 타입:", userType);
  //   KakaoAuthService.initiateKakaoLogin(userType);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        // 로그인 로직
        const loginData: LoginRequest = {
          email: formData.email,
          password: formData.password,
        };

        console.log("로그인 요청 데이터:", loginData);

        const response = await AuthService.login(loginData);

        if (response.success) {
          console.log("로그인 성공:", response.data);

          setSuccess("로그인이 완료되었습니다!");
          setFormData({
            email: "",
            password: "",
            name: "",
            company_name: "",
          });

          // 로그인 성공 시 홈페이지로 리다이렉트
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          console.error("로그인 실패:", response.message);
          setError(response.message);
        }
      } else {
        // 회원가입 로직
        if (userType === "student") {
          const response = await fetch(
            "https://lionconnect-backend.onrender.com/auth/signup/student",
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                name: formData.name,
              }),
            }
          );

          console.log("학생 회원가입 요청 데이터:", {
            email: formData.email,
            password: formData.password,
            name: formData.name,
          });

          if (response.ok) {
            const data = await response.json();
            console.log("학생 회원가입 성공:", data);
            setSuccess("회원가입이 완료되었습니다!");
            setFormData({
              email: "",
              password: "",
              name: "",
              company_name: "",
            });
          } else {
            const errorData = await response.json();
            console.error("학생 회원가입 실패:", errorData);
            setError(errorData.detail || "회원가입에 실패했습니다.");
          }
        } else if (userType === "company") {
          const response = await fetch(
            "https://lionconnect-backend.onrender.com/auth/signup/company",
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                company_name: formData.company_name,
              }),
            }
          );

          console.log("기업 회원가입 요청 데이터:", {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            company_name: formData.company_name,
          });

          if (response.ok) {
            const data = await response.json();
            console.log("기업 회원가입 성공:", data);
            setSuccess("회원가입이 완료되었습니다!");
            setFormData({
              email: "",
              password: "",
              name: "",
              company_name: "",
            });
          } else {
            const errorData = await response.json();
            console.error("기업 회원가입 실패:", errorData);
            setError(errorData.detail || "회원가입에 실패했습니다.");
          }
        }
      }
    } catch (error) {
      console.error("요청 처리 중 오류:", error);
      setError("요청 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 -mt-20">
      <div className="w-full max-w-md">
        {/* 로고 영역 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-6">
            라이언 커넥트
          </h1>

          {/* 구분선과 텍스트 */}
          <div className="relative mb-8 w-full max-w-xs mx-auto">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                {isLogin ? "로그인" : "회원가입"}
              </span>
            </div>
          </div>
        </div>

        {/* 사용자 타입 선택 (회원가입 시에만 표시) */}
        {!isLogin && (
          <div className="space-y-4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                사용자 타입을 선택해주세요
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setUserType("student")}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    userType === "student"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  학생
                </button>
                <button
                  onClick={() => setUserType("company")}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    userType === "company"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  기업
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 로그인/회원가입 토글 */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              회원가입
            </button>
          </div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {userType === "student" ? "이름" : "담당자명"}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={
                  userType === "student"
                    ? "이름을 입력하세요"
                    : "담당자명을 입력하세요"
                }
              />
            </div>
          )}

          {/* 기업명 필드 (기업 회원가입 시에만 표시) */}
          {!isLogin && userType === "company" && (
            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                기업명
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                required={!isLogin && userType === "company"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="기업명을 입력하세요"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {/* 성공 메시지 */}
          {success && (
            <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">
              {success}
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                처리 중...
              </span>
            ) : isLogin ? (
              "로그인"
            ) : (
              "회원가입"
            )}
          </button>
        </form>

        {/* 카카오 로그인 버튼 (주석처리) */}
        {/* <div className="flex justify-center">
          <button
            onClick={handleKakaoLogin}
            className="relative group transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full max-w-md"
          >
            <img
              src="/images/size=lg, width=wide, align=center.png"
              alt="카카오 로그인 버튼"
              className="w-full h-12 object-contain"
            />
          </button>
        </div> */}

        {/* 홈으로 돌아가기 */}
        <div className="text-center mt-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
