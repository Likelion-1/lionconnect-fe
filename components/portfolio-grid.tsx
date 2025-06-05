import Image from "next/image"

export default function PortfolioGrid() {
  const portfolios = [
    {
      id: 1,
      name: "토도동",
      description: "실시간 스포츠 경기 일정 및 결과 확인 서비스",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/424813598-d05c50a7-1dd4-4ac4-8d45-862a733af004.gif-gzhQcLJ0bzFB2N1hjlrJQWQETvEHca.jpeg",
      tags: ["React", "Next.js", "TypeScript"],
    },
    {
      id: 2,
      name: "LEGo",
      description: "프론트엔드 기술 스택 학습 플랫폼",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B9%80%EB%8B%A4%ED%9B%88_%ED%8E%B8%EC%A7%91-2r0WD1Xtf97zKuEEqsWLykiMaX2BDU.gif",
      tags: ["React", "TypeScript", "Styled Components"],
    },
    {
      id: 3,
      name: "쇼핑몰 프로젝트",
      description: "모던한 UI/UX를 적용한 이커머스 플랫폼",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Vue.js", "Nuxt.js", "Tailwind"],
    },
    {
      id: 4,
      name: "모바일 앱",
      description: "크로스 플랫폼 모바일 애플리케이션",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["React Native", "Expo", "Firebase"],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
          <Image
            src={portfolio.image || "/placeholder.svg"}
            alt={portfolio.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Always visible overlay with project info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-lg mb-1 truncate">{portfolio.name}</h3>
              <p className="text-gray-200 text-sm truncate leading-tight">{portfolio.description}</p>
            </div>
          </div>

          {/* Hover overlay with tags */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center">
              <div className="flex flex-wrap gap-2 justify-center">
                {portfolio.tags &&
                  portfolio.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
