const axios = require("axios");

// API 기본 설정
const API_BASE_URL = "/api";

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초로 증가
});

// 요청 인터셉터 (토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // Content-Type 동적 설정
    console.log("=== API 요청 디버깅 ===");
    console.log("API 요청 데이터:", config.data);
    console.log("API 요청 데이터 타입:", typeof config.data);
    console.log(
      "API 요청 데이터 instanceof FormData:",
      config.data instanceof FormData
    );
    console.log("API 요청 데이터 constructor:", config.data?.constructor?.name);

    if (config.data instanceof FormData) {
      // FormData인 경우 Content-Type을 제거하여 브라우저가 자동으로 multipart/form-data 설정
      delete config.headers["Content-Type"];
      console.log("FormData 감지됨 - Content-Type 제거");

      // FormData 내용 확인
      console.log("FormData 내용 확인:");
      let hasData = false;
      for (let [key, value] of config.data.entries()) {
        console.log(`${key}:`, value);
        hasData = true;
      }
      console.log("FormData에 데이터가 있음:", hasData);
      console.log("FormData 크기:", Array.from(config.data.entries()).length);
    } else if (!config.headers["Content-Type"]) {
      // JSON 데이터인 경우
      config.headers["Content-Type"] = "application/json";
      console.log("JSON 데이터 - Content-Type: application/json 설정");
    }
    console.log("최종 Content-Type:", config.headers["Content-Type"]);
    console.log("=== API 요청 디버깅 끝 ===");

    // 요청 데이터 로그 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log("API 요청:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });
      console.log("실제 요청 URL:", `${API_BASE_URL}${config.url}`);
      console.log("프록시 대상:", "https://lionconnect-backend.onrender.com");
    }

    // 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
