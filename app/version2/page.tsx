import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import ProjectCard from "@/components/project-card"
import ProjectSlider from "@/components/project-slider"

export default function Version2() {
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      }}
    >
      <header className="container mx-auto p-6 relative z-50">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
            <ArrowLeft size={20} />
            <span>돌아가기</span>
          </Link>
          <div className="text-2xl font-bold text-orange-500">LEGo</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section - Netflix/Watcha Style */}
        <section className="relative h-screen flex items-start overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 z-10"></div>

          <div className="container mx-auto px-3 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-3 flex flex-col justify-center">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-5xl lg:text-5xl xl:text-5xl font-light leading-relaxed">
                    <span className="text-gray-900">마음에 드는 인재를 쉽게 </span>
                    <span className="text-orange-500 font-medium">찾고</span>
                    <br className="mb-1" />
                    <span className="text-gray-900">빠르게 </span>
                    <span className="text-orange-500 font-medium">커넥트</span>
                  </h1>
                </div>
              </div>

              {/* Right side - Project Slider */}
              <div className="relative lg:block flex justify-center items-center">
                <ProjectSlider />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <a href="#projects" className="animate-bounce block">
              <ChevronDown size={32} className="text-orange-500" />
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">주요 프로젝트</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <ProjectCard
                title="토도동 (ToDoDong)"
                description="실시간 스포츠 경기 일정 및 결과 확인 서비스"
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/424813598-d05c50a7-1dd4-4ac4-8d45-862a733af004.gif-gzhQcLJ0bzFB2N1hjlrJQWQETvEHca.jpeg"
                tags={["React", "Next.js", "TypeScript", "Tailwind CSS"]}
              />

              <ProjectCard
                title="LEGo"
                description="프론트엔드 기술 스택 학습 플랫폼"
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B9%80%EB%8B%A4%ED%9B%88_%ED%8E%B8%EC%A7%91-2r0WD1Xtf97zKuEEqsWLykiMaX2BDU.gif"
                tags={["React", "TypeScript", "Styled Components"]}
              />
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">소개</h2>

              <div className="bg-gray-50 p-8 rounded-2xl">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  안녕하세요, 프론트엔드 개발자 홍길동입니다. 저는 사용자 중심의 웹 애플리케이션을 개발하는 데 열정을
                  가지고 있습니다. React와 Next.js를 주로 사용하며, TypeScript와 Tailwind CSS를 활용하여 효율적이고 확장
                  가능한 코드를 작성합니다.
                </p>

                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  저는 항상 새로운 기술을 배우고 적용하는 것을 즐기며, 팀과의 협업을 통해 더 나은 결과물을 만들어내는
                  것을 중요하게 생각합니다. 사용자 경험을 개선하고 비즈니스 목표를 달성하는 데 도움이 되는 솔루션을
                  제공하는 것이 제 목표입니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-orange-500">교육</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="font-medium">컴퓨터 공학 학사</div>
                        <div className="text-sm text-gray-500">서울대학교 (2018-2022)</div>
                      </li>
                      <li>
                        <div className="font-medium">프론트엔드 개발 부트캠프</div>
                        <div className="text-sm text-gray-500">코드스테이츠 (2022)</div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-orange-500">경력</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="font-medium">프론트엔드 개발자</div>
                        <div className="text-sm text-gray-500">ABC 테크 (2022-현재)</div>
                      </li>
                      <li>
                        <div className="font-medium">웹 개발 인턴</div>
                        <div className="text-sm text-gray-500">XYZ 스튜디오 (2021-2022)</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">연락처</h2>

            <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">메시지 보내기</h3>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        이름
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        메시지
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                    >
                      보내기
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6">연락처 정보</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Mail className="text-orange-500" size={20} />
                      </div>
                      <span>email@example.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Github className="text-orange-500" size={20} />
                      </div>
                      <span>github.com/username</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Linkedin className="text-orange-500" size={20} />
                      </div>
                      <span>linkedin.com/in/username</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">© 2025 LEGo. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
