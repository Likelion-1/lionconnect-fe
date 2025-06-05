import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react"
import TechStackIcons from "@/components/tech-stack-icons"
import ProjectCard from "@/components/project-card"
import CinematicHero from "@/components/cinematic-hero"

export default function Version1() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="absolute top-0 left-0 right-0 z-50 container mx-auto p-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
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
        {/* Cinematic Hero Section */}
        <CinematicHero />

        {/* Tech Stack */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">기술 스택</h2>
            <TechStackIcons />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">주요 프로젝트</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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

        {/* Contact */}
        <section id="contact" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">연락처</h2>

            <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">메시지 보내기</h3>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        이름
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                        메시지
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
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
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Mail className="text-orange-500" size={20} />
                      </div>
                      <span>email@example.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Github className="text-orange-500" size={20} />
                      </div>
                      <span>github.com/username</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
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

      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">© 2025 LEGo. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
