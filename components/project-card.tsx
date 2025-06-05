import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  tags: string[]
}

export default function ProjectCard({ title, description, imageUrl, tags }: ProjectCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden group hover:bg-gray-700 transition-colors">
      <div className="relative aspect-video">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md">자세히 보기</button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-orange-500">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-700 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
