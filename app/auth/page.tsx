"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleKakaoLogin = () => {
    // 카카오 로그인 로직 구현
    console.log("카카오 로그인 버튼 클릭됨!");
    alert("카카오 로그인 버튼이 클릭되었습니다!");

    // 시뮬레이션: 랜덤하게 신규 사용자 여부 결정 (실제로는 API 응답에 따라 결정)
    const randomNewUser = Math.random() > 0.5;
    console.log("신규 사용자 여부:", randomNewUser);
    setIsNewUser(randomNewUser);

    if (randomNewUser) {
      console.log("회원가입 모달 표시");
      setShowSignupModal(true);
    } else {
      // 기존 사용자인 경우 바로 로그인 처리
      console.log("기존 사용자 로그인 성공");
      alert("기존 사용자 로그인 성공!");
      // 로그인 성공 후 리다이렉트 로직
    }
  };

  const handleSignupConfirm = () => {
    console.log("카카오 회원가입 진행");
    setShowSignupModal(false);
    // 회원가입 처리 로직
  };

  const handleSignupCancel = () => {
    setShowSignupModal(false);
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
                로그인/회원가입
              </span>
            </div>
          </div>
        </div>

        {/* 카카오 로그인 버튼 */}
        <div className="space-y-4">
          <div className="flex justify-center">
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
          </div>

          {/* 홈으로 돌아가기 */}
          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>

      {/* 회원가입 모달 */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              {/* 카카오 아이콘 */}
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                카카오 계정으로 회원가입
              </h2>

              <p className="text-gray-600 mb-6">
                아직 등록되지 않은 카카오 계정입니다.
                <br />
                간편하게 회원가입을 진행하시겠습니까?
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleSignupConfirm}
                  className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  카카오로 회원가입
                </button>

                <button
                  onClick={handleSignupCancel}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
