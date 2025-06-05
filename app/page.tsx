import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="container mx-auto p-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-500">LEGo</div>
          <div className="flex gap-4">
            <Link
              href="/version1"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              버전 1
            </Link>
            <Link
              href="/version2"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              버전 2
            </Link>
            <Link
              href="/version3"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              버전 3
            </Link>
            <Link
              href="/version4"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              버전 4
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto p-6 flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
          <span className="text-white">채용 랜딩페이지</span>
          <span className="block text-orange-500">4가지 버전</span>
        </h1>
        <p className="text-xl text-center text-gray-400 max-w-2xl mb-12">
          프론트엔드 개발자 포트폴리오를 위한 4가지 스타일의 랜딩페이지입니다. 각 버전을 확인해보세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          <Link href="/version1" className="group">
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-orange-500">버전 1</h2>
              <p className="text-gray-400 mb-4">시네마틱 히어로 섹션이 강조된 트렌디한 디자인</p>
              <div className="bg-black/50 p-4 rounded flex justify-center items-center h-40">
                <span className="text-orange-500 text-5xl">▶</span>
              </div>
            </div>
          </Link>

          <Link href="/version2" className="group">
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-orange-500">버전 2</h2>
              <p className="text-gray-400 mb-4">넷플릭스 스타일의 프로젝트 슬라이더 디자인</p>
              <div className="bg-black/50 p-4 rounded flex flex-col justify-center items-center h-40">
                <div className="w-full h-6 bg-gray-700 mb-4 rounded"></div>
                <span className="text-orange-500 text-4xl">▶</span>
              </div>
            </div>
          </Link>

          <Link href="/version3" className="group">
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-orange-500">버전 3</h2>
              <p className="text-gray-400 mb-4">3D 기술 스택 아이콘을 활용한 감도 높은 디자인</p>
              <div className="bg-black/50 p-4 rounded flex justify-center items-center h-40">
                <div className="grid grid-cols-3 gap-2">
                  {["H5", "CS", "JS", "TS", "R", "N"].map((icon, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-xs font-bold"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          <Link href="/version4" className="group">
            <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <h2 className="text-2xl font-bold mb-4 text-orange-500">버전 4</h2>
              <p className="text-gray-400 mb-4">깔끔하고 모던한 포트폴리오 그리드 디자인</p>
              <div className="bg-black/50 p-4 rounded flex justify-center items-center h-40">
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-16 h-12 bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
