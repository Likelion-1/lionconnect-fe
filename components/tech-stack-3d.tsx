"use client"

import { useEffect, useState } from "react"

function TechIcon({
  position,
  icon,
  color,
  delay = 0,
}: {
  position: { x: number; y: number; z: number }
  icon: string
  color: string
  delay?: number
}) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 1)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute w-16 h-16 flex items-center justify-center transition-all duration-1000 ease-in-out"
      style={{
        left: `${50 + position.x * 8}%`,
        top: `${50 + position.y * 8}%`,
        transform: `
          perspective(1000px) 
          rotateX(${rotation + delay * 60}deg) 
          rotateY(${rotation * 1.5 + delay * 90}deg) 
          translateZ(${position.z * 50}px)
        `,
        animationDelay: `${delay * 0.5}s`,
      }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
    </div>
  )
}

export default function TechStack3D() {
  const techIcons = [
    { icon: "H5", position: { x: -3, y: 1, z: 0 }, color: "#E44D26", delay: 0 },
    { icon: "CSS", position: { x: -1, y: 2, z: -2 }, color: "#264DE4", delay: 1 },
    { icon: "JS", position: { x: 2, y: 0, z: -1 }, color: "#F7DF1E", delay: 2 },
    { icon: "TS", position: { x: 0, y: -1, z: -3 }, color: "#3178C6", delay: 3 },
    { icon: "R", position: { x: -2, y: -2, z: -1 }, color: "#61DAFB", delay: 4 },
    { icon: "N", position: { x: 3, y: 1, z: -2 }, color: "#FFFFFF", delay: 5 },
  ]

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        {techIcons.map((tech, index) => (
          <TechIcon key={index} position={tech.position} icon={tech.icon} color={tech.color} delay={tech.delay} />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </div>
  )
}
