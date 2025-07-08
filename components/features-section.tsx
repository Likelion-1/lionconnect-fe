import { Search, User, Bell } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">왜 라이언 커넥트인가요?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            멋쟁이사자처럼 우수 수료생들의 포트폴리오를 기반으로 <br></br>
            준비된 인재를 쉽고 빠르게 채용해보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mx-auto mb-6 rounded-xl">
              <Search className="text-orange-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              포트폴리오 기반 채용
            </h3>
            <p className="text-gray-600">
              실제 프로젝트와 기술 스택으로 <br></br> 실력을 갖춘 인재를
              찾아보세요
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mx-auto mb-6 rounded-xl">
              <User className="text-orange-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              검증된 인재
            </h3>
            <p className="text-gray-600">
              포트폴리오를 통해 준비된 인재를 <br></br>빠르게 확인하세요.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mx-auto mb-6 rounded-xl">
              <Bell className="text-orange-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 매칭</h3>
            <p className="text-gray-600">
              조건에 맞는 인재를 빠르게 확인하여 <br></br>간소화된 채용 절차를
              경험하세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
