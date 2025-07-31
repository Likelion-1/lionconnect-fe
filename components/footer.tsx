import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16">
      {/* Divider line */}
      <div className="border-t border-gray-200 mb-8"></div>

      <div className="container mx-auto px-6 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-orange-500 font-bold text-2xl leading-tight">
            멋쟁이사자처럼
          </span>
          <span className="text-orange-500 font-bold text-2xl leading-tight">
            라이언 커넥트
          </span>
        </div>
        {/* <nav className="flex space-x-16 mt-2">
          <Link
            href="#"
            className="text-gray-500 text-lg hover:text-orange-500 transition"
          >
            회사 소개
          </Link>
          <Link
            href="#"
            className="text-gray-500 text-lg hover:text-orange-500 transition"
          >
            서비스 소개
          </Link>
          <Link
            href="#"
            className="text-gray-500 text-lg hover:text-orange-500 transition"
          >
            문의
          </Link>
        </nav> */}
      </div>
    </footer>
  );
}
