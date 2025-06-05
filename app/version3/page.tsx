import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, Download } from "lucide-react"
import TechStack3D from "@/components/tech-stack-3d"
import ProjectCard from "@/components/project-card"

export default function Version3() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="container mx-auto p-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors">
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
        {/* Hero Section with 3D Tech Stack */}
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <TechStack3D />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-5xl lg:text-5xl font-bold mb-8">
                <span className="text-white">마음에 드는 인재를 쉽게 찾고</span>
                <span className="block text-orange-500">빠르게 커넥트</span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl">
                멋쟁이사자처럼 수료생들의 포트폴리오를 확인하고
                증명된 인재를 채용하세요.
              </p>
              <div className="flex flex-wrap gap-4">
              </div>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">소개</h2>

              <div className="bg-gray-900 p-8 rounded-lg">
                <p className="text-lg text-gray-300 mb-6">
                  안녕하세요, 프론트엔드 개발자 홍길동입니다. 저는 사용자 중심의 웹 애플리케이션을 개발하는 데 열정을
                  가지고 있습니다. React와 Next.js를 주로 사용하며, TypeScript와 Tailwind CSS를 활용하여 효율적이고 확장
                  가능한 코드를 작성합니다.
                </p>

                <p className="text-lg text-gray-300 mb-6">
                  저는 항상 새로운 기술을 배우고 적용하는 것을 즐기며, 팀과의 협업을 통해 더 나은 결과물을 만들어내는
                  것을 중요하게 생각합니다. 사용자 경험을 개선하고 비즈니스 목표를 달성하는 데 도움이 되는 솔루션을
                  제공하는 것이 제 목표입니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-orange-500">교육</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="font-medium">컴퓨터 공학 학사</div>
                        <div className="text-sm text-gray-400">서울대학교 (2018-2022)</div>
                      </li>
                      <li>
                        <div className="font-medium">프론트엔드 개발 부트캠프</div>
                        <div className="text-sm text-gray-400">코드스테이츠 (2022)</div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-orange-500">경력</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="font-medium">프론트엔드 개발자</div>
                        <div className="text-sm text-gray-400">ABC 테크 (2022-현재)</div>
                      </li>
                      <li>
                        <div className="font-medium">웹 개발 인턴</div>
                        <div className="text-sm text-gray-400">XYZ 스튜디오 (2021-2022)</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">기술 스택</h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-orange-500">프론트엔드</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "HTML5", level: 95 },
                    { name: "CSS3", level: 90 },
                    { name: "JavaScript", level: 95 },
                    { name: "TypeScript", level: 85 },
                    { name: "React", level: 90 },
                    { name: "Next.js", level: 85 },
                  ].map((skill) => (
                    <div key={skill.name} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-orange-500">기타 기술</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Git", level: 85 },
                    { name: "Tailwind CSS", level: 90 },
                    { name: "Redux", level: 80 },
                    { name: "GraphQL", level: 75 },
                    { name: "Jest", level: 80 },
                    { name: "Figma", level: 70 },
                  ].map((skill) => (
                    <div key={skill.name} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

        {/* Resume */}
        <section id="resume" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">이력서</h2>

            <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg">
              <div className="flex flex-col items-center justify-center mb-8">
                <p className="text-lg text-gray-300 mb-6 text-center">아래 버튼을 클릭하여 이력서를 다운로드하세요.</p>
                <a
                  href="#"
                  className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Download size={18} />
                  <span>이력서 다운로드</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">연락처</h2>

            <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">메시지 보내기</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                        이름
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                        메시지
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                    >
                      보내기
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">연락처 정보</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-orange-500" size={20} />
                      <span>email@example.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Github className="text-orange-500" size={20} />
                      <span>github.com/username</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="text-orange-500" size={20} />
                      <span>linkedin.com/in/username</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-8">
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
