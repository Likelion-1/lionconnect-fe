import { Heading5Icon as Html5, CodepenIcon as Css3, FileJson, Braces, Atom, Database } from "lucide-react"

export default function TechStackIcons() {
  const techStacks = [
    { name: "HTML5", icon: <Html5 className="h-12 w-12" />, color: "text-orange-500" },
    { name: "CSS3", icon: <Css3 className="h-12 w-12" />, color: "text-blue-500" },
    { name: "JavaScript", icon: <FileJson className="h-12 w-12" />, color: "text-yellow-500" },
    { name: "TypeScript", icon: <Braces className="h-12 w-12" />, color: "text-blue-600" },
    { name: "React", icon: <Atom className="h-12 w-12" />, color: "text-cyan-400" },
    { name: "Next.js", icon: <Database className="h-12 w-12" />, color: "text-white" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
      {techStacks.map((tech) => (
        <div key={tech.name} className="flex flex-col items-center">
          <div className={`${tech.color} mb-4`}>{tech.icon}</div>
          <span className="font-medium">{tech.name}</span>
        </div>
      ))}
    </div>
  )
}
