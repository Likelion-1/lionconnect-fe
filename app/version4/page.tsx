import Link from "next/link";
import {
  ArrowLeft,
  Search,
  User,
  Bell,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import PortfolioGrid from "@/components/portfolio-grid";
import TechStack3D from "@/components/tech-stack-3d";
import LandingLogo from "@/components/landing-logo";

export default function Version4() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900"
      style={{
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>돌아가기</span>
              </Link>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                라이언 커넥트
              </div>
              <div className="hidden md:flex gap-6">
                {/* <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-50 rounded-full transition-all">
                  이용 가이드
                </button> */}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">이미 등록하신 분</span>
              {/* <button className="px-4 py-2 border border-orange-500 text-orange-500 text-sm font-medium hover:bg-orange-50 rounded-full transition-all">
                로그인
              </button> */}
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section with 3D Background */}
        <section className="relative py-20 overflow-hidden mb-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            {/* Main gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/50 to-orange-100/30" />

            {/* Subtle accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-orange-200/20 to-transparent" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>새로운 채용의 시작</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-6xl font-normal leading-tight mb-8 drop-shadow-sm">
                <span className="text-gray-900">검증된 인재 채용,</span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent font-medium">
                  라이언 커넥트
                </span>
                <span className="text-gray-900">로 쉽고 빠르게</span>
              </h1>
              {/* <p className="text-xl text-gray-600 mb-8">
                실제 프로젝트와 코드로 검증된 개발자들과 함께하세요. 더 이상의
                불필요한 채용 과정은 없습니다.
              </p> */}
              {/* <div className="flex gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-orange-100 transition-all">
                  시작하기
                </button>
                <button className="px-8 py-4 border border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-all">
                  더 알아보기
                </button>
              </div> */}
            </div>

            {/* Scroll indicator - centered across full width */}
            <div className="flex flex-col items-center justify-center mt-16 w-full">
              <p className="text-gray-600 text-sm mb-4 drop-shadow-sm">
                수료생 포트폴리오가 궁금하다면?
              </p>
              <div className="animate-bounce">
                <ChevronDown
                  size={32}
                  className="text-orange-500 drop-shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Lighter white gradient overlay to maintain readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/40 pointer-events-none z-5" />
        </section>

        {/* Portfolio Grid Section */}
        <section className="bg-gray-50">
          <div className="container mx-auto px-6">
            <PortfolioGrid />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                왜 라이언 커넥트인가요?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                멋쟁이사자처럼 우수 수료생들의 포트폴리오를 기반으로 <br></br>
                준비된 인재를 쉽고 빠르게 채용해보세요.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mx-auto mb-6 rounded-xl">
                  <Search className="text-orange-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  포트폴리오 기반 채용
                </h3>
                <p className="text-gray-600">
                  실제 프로젝트와 기술 스택으로 <br></br> 실력을 갖춘 인재를
                  찾아보세요
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mx-auto mb-6 rounded-xl">
                  <User className="text-orange-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  검증된 인재
                </h3>
                <p className="text-gray-600">
                  포트폴리오를 통해 준비된 인재를 <br></br>빠르게 확인하세요.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mx-auto mb-6 rounded-xl">
                  <Bell className="text-orange-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  빠른 매칭
                </h3>
                <p className="text-gray-600">
                  조건에 맞는 인재를 빠르게 확인하여 <br></br>간소화된 채용
                  절차를 경험하세요
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              지금 시작해보세요
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              포트폴리오로 검증된 인재들과 연결되어 더 나은 채용 경험을
              만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-orange-500 font-semibold rounded-full hover:shadow-lg hover:shadow-orange-100 transition-all">
                기업 회원가입
              </button>
              {/* <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-500 transition-all">
                개발자 등록
              </button> */}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-3">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-400">
              © 2025 라이언 커넥트. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
