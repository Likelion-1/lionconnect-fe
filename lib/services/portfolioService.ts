import { apiClient } from "../api";

// 포트폴리오 인터페이스 (백엔드 요구사항에 맞춤)
export interface PortfolioData {
  user_id: number; // 필수 필드로 변경
  project_name: string;
  project_intro: string;
  project_period: string;
  role: string;
  is_representative: boolean; // 필수 필드로 변경
  image?: File | null; // 선택 필드
  project_url?: string | null; // 선택 필드
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
      // 데이터 검증
      const requiredFields = [
        "user_id",
        "project_name",
        "project_intro",
        "project_period",
        "role",
        "is_representative",
      ];

      const missingFields = requiredFields.filter((field) => {
        const value = data[field as keyof PortfolioData];
        return value === undefined || value === null || value === "";
      });

      if (missingFields.length > 0) {
        console.error("필수 필드 누락:", missingFields);
        return {
          success: false,
          message: `필수 필드가 누락되었습니다: ${missingFields.join(", ")}`,
        };
      }

      // JSON 형태로 전송
      const jsonData: any = {
        user_id: data.user_id,
        is_representative: data.is_representative,
        project_name: data.project_name,
        project_intro: data.project_intro,
        project_period: data.project_period,
        role: data.role,
        ...(data.project_url && { project_url: data.project_url }),
      };

      // 이미지가 File 객체인 경우 별도 처리 필요
      if (data.image && data.image instanceof File) {
        console.warn(
          "이미지 파일이 포함되어 있습니다. 별도 업로드가 필요할 수 있습니다."
        );
        // TODO: 이미지 업로드 처리
      } else if (data.image) {
        // 이미지가 URL인 경우
        jsonData.image = data.image;
      }

      // JSON 디버깅
      console.log("=== PortfolioService JSON 디버깅 ===");
      console.log("입력받은 데이터:", data);
      console.log("전송할 JSON 데이터:", jsonData);
      console.log("JSON 데이터 키들:", Object.keys(jsonData));
      console.log("JSON 데이터 값들:", Object.values(jsonData));
      console.log("=== PortfolioService JSON 디버깅 끝 ===");

      const response = await apiClient.post("/portfolios/", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        success: true,
        message: "포트폴리오가 성공적으로 저장되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("포트폴리오 저장 실패:", error);

      // 상세한 에러 정보 로깅
      if (error.response) {
        console.error("서버 응답 상태:", error.response.status);
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 헤더:", error.response.headers);

        // detail 배열이 있는 경우 상세 정보 출력
        if (
          error.response.data?.detail &&
          Array.isArray(error.response.data.detail)
        ) {
          console.error("서버 유효성 검증 오류 상세:");
          error.response.data.detail.forEach((err: any, index: number) => {
            console.error(`오류 ${index + 1}:`, err);
            console.error(`  - 타입:`, err.type);
            console.error(`  - 위치:`, err.loc);
            console.error(`  - 메시지:`, err.msg);
            console.error(`  - 입력값:`, err.input);
          });
        }
      }

      // 에러 메시지 처리
      let errorMessage = "포트폴리오 저장에 실패했습니다.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
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
      // JSON 형태로 전송
      const jsonData = {
        user_id: data.user_id,
        is_representative: data.is_representative,
        project_name: data.project_name,
        project_intro: data.project_intro,
        project_period: data.project_period,
        role: data.role,
        ...(data.image && { image: data.image }),
        ...(data.project_url && { project_url: data.project_url }),
      };

      const response = await apiClient.put(
        `/portfolios/${portfolioId}/`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
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
