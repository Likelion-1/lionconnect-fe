"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false)
    }

    const video = videoRef.current
    if (video) {
      video.addEventListener("ended", handleEnded)
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnded)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full bg-black">
      {/* 실제 프로젝트에서는 실제 비디오 파일로 교체하세요 */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="/placeholder.svg?height=720&width=1280"
        muted={isMuted}
      >
        <source src="#" type="video/mp4" />
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>

      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-orange-500/80 rounded-full flex items-center justify-center hover:bg-orange-600/80 transition-colors"
          >
            <Play size={36} className="text-white ml-2" />
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center">
        <button onClick={togglePlay} className="mr-4 text-white hover:text-orange-500 transition-colors">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button onClick={toggleMute} className="text-white hover:text-orange-500 transition-colors">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        <div className="ml-auto text-white text-sm">프로젝트 시연 영상</div>
      </div>
    </div>
  )
}
