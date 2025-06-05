"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, ChevronRight, ChevronLeft } from "lucide-react"

export default function CinematicHero() {
  const [currentProject, setCurrentProject] = useState(0)

  const projects = [
    {
      id: 1,
      title: "토도동",
      subtitle: "스포츠 경기 일정 서비스",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/424813598-d05c50a7-1dd4-4ac4-8d45-862a733af004.gif-gzhQcLJ0bzFB2N1hjlrJQWQETvEHca.jpeg",
    },
    {
      id: 2,
      title: "LEGo",
      subtitle: "프론트엔드 학습 플랫폼",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B9%80%EB%8B%A4%ED%9B%88_%ED%8E%B8%EC%A7%91-2r0WD1Xtf97zKuEEqsWLykiMaX2BDU.gif",
    },
  ]

  const currentProjectData = projects[currentProject]

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div
      style={{
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      }}
    >
      {/* Top Message Section */}
      <section className="relative pt-[5rem] pb-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              마음에 드는 인재를 쉽게 <span className="text-orange-500 font-medium">찾고</span>
              <br />
              빠르게 <span className="text-orange-500 font-medium">커넥트</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={currentProjectData.imageUrl || "/placeholder.svg"}
            alt={currentProjectData.title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>

        {/* Left Navigation Button */}
        <button
          onClick={prevProject}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronLeft size={28} className="text-white group-hover:text-orange-500 transition-colors" />
        </button>

        {/* Content */}
        <div className="container mx-auto px-8 relative z-20">
          <div className="max-w-3xl space-y-8">
            {/* Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-orange-500 leading-none">
              {currentProjectData.title}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-300 font-light">{currentProjectData.subtitle}</p>

            {/* Action Button */}
            <div className="pt-8">
              <button className="group flex items-center gap-4 text-white hover:text-orange-500 transition-colors duration-300">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                  <Play size={24} className="ml-1" />
                </div>
                <span className="text-xl font-light">보기</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={nextProject}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronRight size={28} className="text-white group-hover:text-orange-500 transition-colors" />
        </button>

        {/* Project indicators */}
        <div className="absolute bottom-12 left-8 z-30 flex gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentProject ? "bg-orange-500 w-12" : "bg-white/30 w-6 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Project counter */}
        <div className="absolute bottom-12 right-8 z-30 text-white/70 text-sm font-light">
          {String(currentProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </div>
      </section>
    </div>
  )
}
