export default function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          지금 시작해보세요
        </h2>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          포트폴리오로 검증된 인재들과 연결되어 더 나은 채용 경험을 만들어보세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-orange-500 font-semibold rounded-full hover:shadow-lg hover:shadow-orange-100 transition-all">
            기업 회원가입
          </button>
          {/* <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-500 transition-all">
            개발자 등록
          </button> */}
        </div>
      </div>
    </section>
  );
}
