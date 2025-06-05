"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Info } from "lucide-react"

export default function StreamingHero() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      title: "토도동 (ToDoDong)",
      description: "실시간 스포츠 경기 일정 및 결과 확인 서비스",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/424813598-d05c50a7-1dd4-4ac4-8d45-862a733af004.gif-gzhQcLJ0bzFB2N1hjlrJQWQETvEHca.jpeg",
      featured: true,
    },
    {
      id: 2,
      title: "LEGo",
      description: "프론트엔드 기술 스택 학습 플랫폼",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B9%80%EB%8B%A4%ED%9B%88_%ED%8E%B8%EC%A7%91-2r0WD1Xtf97zKuEEqsWLykiMaX2BDU.gif",
      featured: false,
    },
  ]

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col justify-center">
      {/* Main featured project */}
      <div className="relative mb-8">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 group">
          {/* Main project image/video */}
          <Image
            src={projects[0].imageUrl || "/placeholder.svg"}
            alt={projects[0].title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
              <Play size={32} className="text-white ml-1" />
            </button>
          </div>

          {/* Project info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{projects[0].title}</h3>
            <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {projects[0].description}
            </p>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-semibold">
                <Play size={16} />
                <span>시연 보기</span>
              </button>
              <button className="px-6 py-2 bg-gray-600/60 backdrop-blur-sm text-white rounded-lg hover:bg-gray-500/60 transition-colors flex items-center gap-2">
                <Info size={16} />
                <span>상세 정보</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating elements for depth */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Secondary project thumbnails */}
      <div className="grid grid-cols-2 gap-4">
        {projects.slice(1).map((project, index) => (
          <div
            key={project.id}
            className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {hoveredProject === project.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                  <Play size={20} className="text-white ml-0.5" />
                </button>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h4 className="text-white font-semibold text-sm">{project.title}</h4>
            </div>
          </div>
        ))}

        {/* Add more projects placeholder */}
        <div className="relative aspect-video rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center group hover:border-orange-500 transition-colors duration-300 cursor-pointer">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-orange-500 transition-colors duration-300">
              <span className="text-white text-lg font-bold">+</span>
            </div>
            <span className="text-gray-400 text-sm group-hover:text-orange-500 transition-colors duration-300">
              더 많은 프로젝트
            </span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent transform translate-x-8" />
      <div className="absolute bottom-0 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent transform translate-y-8" />
    </div>
  )
}
