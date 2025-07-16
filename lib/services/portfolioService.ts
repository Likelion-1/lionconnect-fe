import { apiClient } from "../api";

// 포트폴리오 인터페이스
export interface PortfolioData {
  resume_id?: number;
  user_id?: number;
  is_representative?: boolean;
  image?: File | null;
  project_url?: string;
  project_name: string;
  project_intro: string;
  project_period: string;
  role: string;
}

// 포트폴리오 API 응답 인터페이스
export interface PortfolioResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 포트폴리오 응답 데이터 인터페이스
export interface PortfolioResponseData {
  id: number;
  resume_id: number;
  project_name: string;
  project_intro: string;
  project_period: string;
  role: string;
  project_url?: string;
  image?: string;
  is_representative: boolean;
  created_at: string;
  updated_at: string;
}

// 포트폴리오 서비스 클래스
export class PortfolioService {
  /**
   * 포트폴리오를 서버에 전송
   * @param data 포트폴리오 데이터
   * @returns API 응답
   */
  static async submitPortfolio(
    data: PortfolioData
  ): Promise<PortfolioResponse> {
    try {
      // FormData를 사용하여 파일과 텍스트 데이터를 함께 전송
      const formData = new FormData();

      // 필수 필드들 추가
      formData.append("project_name", data.project_name);
      formData.append("project_intro", data.project_intro);
      formData.append("project_period", data.project_period);
      formData.append("role", data.role);

      // 선택적 필드들 추가
      if (data.resume_id) {
        formData.append("resume_id", data.resume_id.toString());
      }
      if (data.user_id) {
        formData.append("user_id", data.user_id.toString());
      }
      if (data.is_representative !== undefined) {
        formData.append("is_representative", data.is_representative.toString());
      }
      if (data.image) {
        formData.append("image", data.image);
      }
      if (data.project_url) {
        formData.append("project_url", data.project_url);
      }

      // FormData 디버깅
      console.log("=== PortfolioService FormData 디버깅 ===");
      console.log("입력받은 데이터:", data);
      console.log("FormData 객체:", formData);
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("FormData 크기:", Array.from(formData.entries()).length);
      console.log("=== PortfolioService FormData 디버깅 끝 ===");

      const response = await apiClient.post("/portfolios/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: true,
        message: "포트폴리오가 성공적으로 저장되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("포트폴리오 저장 실패:", error);

      // 에러 메시지 처리
      let errorMessage = "포트폴리오 저장에 실패했습니다.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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
   * 포트폴리오 목록 조회
   * @returns API 응답
   */
  static async getPortfolios(): Promise<PortfolioResponse> {
    try {
      const response = await apiClient.get("/portfolios/");

      return {
        success: true,
        message: "포트폴리오를 성공적으로 조회했습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("포트폴리오 조회 실패:", error);

      let errorMessage = "포트폴리오 조회에 실패했습니다.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
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
   * 포트폴리오 업데이트
   * @param portfolioId 포트폴리오 ID
   * @param data 업데이트할 포트폴리오 데이터
   * @returns API 응답
   */
  static async updatePortfolio(
    portfolioId: number,
    data: PortfolioData
  ): Promise<PortfolioResponse> {
    try {
      // FormData를 사용하여 파일과 텍스트 데이터를 함께 전송
      const formData = new FormData();

      // 필수 필드들 추가
      formData.append("project_name", data.project_name);
      formData.append("project_intro", data.project_intro);
      formData.append("project_period", data.project_period);
      formData.append("role", data.role);

      // 선택적 필드들 추가
      if (data.resume_id) {
        formData.append("resume_id", data.resume_id.toString());
      }
      if (data.user_id) {
        formData.append("user_id", data.user_id.toString());
      }
      if (data.is_representative !== undefined) {
        formData.append("is_representative", data.is_representative.toString());
      }
      if (data.image) {
        formData.append("image", data.image);
      }
      if (data.project_url) {
        formData.append("project_url", data.project_url);
      }

      const response = await apiClient.put(
        `/portfolios/${portfolioId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        success: true,
        message: "포트폴리오가 성공적으로 업데이트되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("포트폴리오 업데이트 실패:", error);

      // 에러 메시지 처리
      let errorMessage = "포트폴리오 업데이트에 실패했습니다.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}
