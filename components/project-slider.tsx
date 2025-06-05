"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, Volume2, VolumeX, Info } from "lucide-react"

export default function ProjectSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  const projects = [
    {
      id: 1,
      title: "토도동",
      subtitle: "실시간 스포츠 경기 일정 및 결과 확인 서비스",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/424813598-d05c50a7-1dd4-4ac4-8d45-862a733af004.gif-gzhQcLJ0bzFB2N1hjlrJQWQETvEHca.jpeg",
      category: "웹 애플리케이션",
    },
    {
      id: 2,
      title: "LEGo",
      subtitle: "프론트엔드 기술 스택 학습 플랫폼",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B9%80%EB%8B%A4%ED%9B%88_%ED%8E%B8%EC%A7%91-2r0WD1Xtf97zKuEEqsWLykiMaX2BDU.gif",
      category: "교육 플랫폼",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1))
  }

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const getNextIndex = () => {
    return currentIndex === projects.length - 1 ? 0 : currentIndex + 1
  }

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center">
      {/* Main project card */}
      <div className="relative w-[2000px] h-[350px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl">
        {/* Project image */}
        <div className="relative h-full overflow-hidden">
          <Image
            src={projects[currentIndex].imageUrl || "/placeholder.svg"}
            alt={projects[currentIndex].title}
            fill
            className="object-cover"
            sizes="600px"
            priority
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Sound control */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          >
            {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
          </button>

          {/* Project info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{projects[currentIndex].title}</h3>
              <p className="text-gray-200 text-base mb-3">{projects[currentIndex].subtitle}</p>
              <span className="inline-block px-3 py-1 bg-orange-500/20 backdrop-blur-sm text-orange-400 text-sm rounded-full">
                {projects[currentIndex].category}
              </span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed max-w-md">{projects[currentIndex].description}</p>

            {/* Action buttons */}

          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
          <div
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Next project preview */}
      <div
        className="relative w-[320px] h-[300px] ml-6 rounded-xl overflow-hidden bg-gray-800 shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={nextSlide}
      >
        <div className="relative h-full overflow-hidden">
          <Image
            src={projects[getNextIndex()].imageUrl || "/placeholder.svg"}
            alt={projects[getNextIndex()].title}
            fill
            className="object-cover opacity-70 hover:opacity-90 transition-opacity duration-300"
            sizes="320px"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Next indicator */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">다음</span>
          </div>

          {/* Project info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-xl font-bold text-white mb-1">{projects[getNextIndex()].title}</h4>
            <p className="text-gray-300 text-sm">{projects[getNextIndex()].subtitle}</p>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Navigation dots */}


      {/* Ambient lighting effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5 rounded-3xl blur-2xl -z-10" />
    </div>
  )
}
