import React from "react";

export default function TalentRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-10 flex flex-col gap-8 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">인재 요청</h2>
        {/* 채용 포지션 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            채용 포지션
          </label>
          <select className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200">
            <option value="">선택</option>
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="designer">디자이너</option>
            <option value="pm">PM</option>
          </select>
        </div>
        {/* 직무 설명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            직무 설명(선택)
          </label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder=""
          />
        </div>
        {/* 필수 기술 스택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            필수 기술 스택
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
              React{" "}
              <button className="ml-1 text-gray-400 hover:text-gray-600">
                ×
              </button>
            </span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700">
              TypeScript{" "}
              <button className="ml-1 text-gray-400 hover:text-gray-600">
                ×
              </button>
            </span>
          </div>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="기술 입력 후 Enter"
          />
        </div>
        {/* 경력/고용수준 */}
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-2">
              희망 경력 수준
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-orange-500" /> 신입
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-orange-500" />{" "}
                경력1-3년
              </label>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-2">
              고용 수준
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-orange-500" /> 정규직
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-orange-500" /> 계약직
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-orange-500" /> 인턴
              </label>
            </div>
          </div>
        </div>
        {/* 등록 버튼 */}
        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-300 text-white font-semibold rounded-lg shadow-sm hover:opacity-90 transition disabled:opacity-50 text-sm"
            type="button"
          >
            인재 요청 등록
          </button>
        </div>
      </div>
    </div>
  );
}
