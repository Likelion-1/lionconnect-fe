import Link from "next/link"
import { ArrowLeft, Search, User, Bell, ChevronDown } from "lucide-react"
import PortfolioGrid from "@/components/portfolio-grid"
import TechStack3D from "@/components/tech-stack-3d"

export default function Version4() {
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      }}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-100 relative z-50">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                <ArrowLeft size={20} />
                <span>돌아가기</span>
              </Link>
              <div className="text-2xl font-bold text-orange-500">라이어 커넥트</div>
              <div className="hidden md:flex gap-6">
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium">서비스 소개</button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">이용 가이드</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">이미 등록하신 분</span>
              <button className="px-4 py-2 border border-orange-500 text-orange-500 text-sm font-medium hover:bg-orange-50 transition-colors">
                로그인
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section with 3D Background */}
        <section className="relative py-20 bg-white overflow-hidden">
          {/* 3D Tech Stack Background */}
          <div className="absolute inset-0 z-0 opacity-60">
            <TechStack3D />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-5xl lg:text-5xl font-light leading-tight mb-8 drop-shadow-sm">
                <span className="text-gray-900">채용, 말 뿐인 구직자는 이제 그만,</span>
                <br />
                <span className="text-orange-500 font-medium">포트폴리오로 보여주는 인재</span>
                <span className="text-gray-900">만 만나세요.</span>
              </h1>
            </div>

            {/* Scroll indicator - centered across full width */}
            <div className="flex flex-col items-center justify-center mt-16 w-full">
              <p className="text-gray-600 text-sm mb-4 drop-shadow-sm">포트폴리오 보기</p>
              <div className="animate-bounce">
                <ChevronDown size={32} className="text-orange-500 drop-shadow-sm" />
              </div>
            </div>
          </div>

          {/* Lighter white gradient overlay to maintain readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/40 pointer-events-none z-5" />
        </section>

        {/* Portfolio Grid Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <PortfolioGrid />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 flex items-center justify-center mx-auto mb-6">
                  <Search className="text-orange-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">포트폴리오 기반 검색</h3>
                <p className="text-gray-600">실제 프로젝트와 기술 스택으로 정확한 인재를 찾아보세요</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 flex items-center justify-center mx-auto mb-6">
                  <User className="text-orange-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">검증된 개발자</h3>
                <p className="text-gray-600">실제 결과물과 코드로 검증된 개발자들과 연결됩니다</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 flex items-center justify-center mx-auto mb-6">
                  <Bell className="text-orange-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 매칭</h3>
                <p className="text-gray-600">조건에 맞는 인재가 등록되면 즉시 알림을 받아보세요</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-orange-500">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">지금 시작해보세요</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              포트폴리오로 검증된 개발자들과 연결되어 더 나은 채용 경험을 만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-orange-500 font-semibold hover:bg-gray-50 transition-colors">
                기업 회원가입
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold hover:bg-white hover:text-orange-500 transition-colors">
                개발자 등록
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-4">라이어 커넥트</div>
              <p className="text-gray-400 text-sm">포트폴리오 기반 개발자 채용 플랫폼</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    개발자 찾기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    포트폴리오 등록
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    기업 솔루션
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    이용 가이드
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    고객센터
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    회사 소개
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    채용 정보
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    연락처
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 라이어 커넥트. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
