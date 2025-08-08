import { apiClient } from "../api";

// 로그인 요청 인터페이스
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 인터페이스
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
    user_type: string;
    company_name: string | null;
    created_at: string;
    updated_at: string;
  };
}

// API 응답 인터페이스
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: LoginResponse;
}

export class AuthService {
  /**
   * 로그인
   * @param credentials 로그인 정보
   * @returns API 응답
   */
  static async login(credentials: LoginRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post("/auth/login", credentials);

      const loginData = response.data as LoginResponse;
      console.log("로그인 응답 데이터:", loginData);

      // 토큰과 사용자 정보를 로컬 스토리지에 저장
      if (loginData.access_token) {
        localStorage.setItem("access_token", loginData.access_token);
        console.log("저장된 access_token:", loginData.access_token);
      }

      if (loginData.user && loginData.user.id) {
        localStorage.setItem("userId", loginData.user.id.toString());
        console.log("저장된 사용자 ID:", loginData.user.id);
      }

      return {
        success: true,
        message: "로그인이 성공했습니다.",
        data: loginData,
      };
    } catch (error: any) {
      console.error("로그인 실패:", error);

      let errorMessage = "로그인에 실패했습니다.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  /**
   * 로그아웃
   */
  static logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    console.log("로그아웃 완료 - 사용자 정보 제거됨");
  }

  /**
   * 인증 상태 확인
   * @returns 인증 여부
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    return !!token;
  }

  /**
   * 액세스 토큰 가져오기
   * @returns 액세스 토큰
   */
  static getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  /**
   * 사용자 ID 가져오기
   * @returns 사용자 ID
   */
  static getUserId(): number | null {
    const userId = localStorage.getItem("userId");
    return userId ? parseInt(userId) : null;
  }
}
