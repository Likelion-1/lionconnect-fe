import { apiClient } from "../api";

// 포트폴리오 인터페이스 (백엔드 Portfolio 모델에 맞춤)
export interface PortfolioData {
  user_id: number; // 필수 필드
  project_name: string; // 필수 필드
  project_intro: string; // 필수 필드
  project_period: string; // 필수 필드
  role: string; // 필수 필드
  is_representative?: boolean; // 선택 필드
  image?: string; // 선택 필드
  project_url?: string; // 선택 필드
}

// 프로젝트 인터페이스 (백엔드 ProjectBase 모델에 맞춤)
export interface ProjectData {
  portfolio_id?: number; // 선택 필드로 변경
  user_id: number; // 필수 필드
  title: string; // project_name → title로 변경
  description?: string; // 선택 필드로 변경
  github_url?: string; // 선택 필드
  demo_url?: string; // 선택 필드 추가
  tech_stack?: string; // 선택 필드로 변경
  project_period?: string; // 프로젝트 기간 (통합)
  role?: string; // 담당 역할 필드 추가
}

// API 응답 인터페이스
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 포트폴리오 서비스 클래스
export class PortfolioService {
  /**
   * 포트폴리오를 서버에 전송
   * @param data 포트폴리오 데이터
   * @returns API 응답
   */
  static async submitPortfolio(data: PortfolioData): Promise<ApiResponse> {
    try {
      // 데이터 검증
      const requiredFields = [
        "user_id",
        "project_name",
        "project_intro",
        "project_period",
        "role",
      ];

      const missingFields = requiredFields.filter(
        (field) => !data[field as keyof PortfolioData]
      );

      if (missingFields.length > 0) {
        console.error("필수 필드 누락:", missingFields);
        return {
          success: false,
          message: `필수 필드가 누락되었습니다: ${missingFields.join(", ")}`,
        };
      }

      // 백엔드에서 기대하는 형태로 form-urlencoded 데이터 구성
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("user_id", data.user_id.toString());
      urlEncodedData.append("project_name", data.project_name);
      urlEncodedData.append("project_intro", data.project_intro);
      urlEncodedData.append("project_period", data.project_period);
      urlEncodedData.append("role", data.role);

      // 선택적 필드들 추가
      if (data.is_representative !== undefined) {
        urlEncodedData.append(
          "is_representative",
          data.is_representative.toString()
        );
      }
      if (data.image) {
        urlEncodedData.append("image", data.image);
      }
      if (data.project_url) {
        urlEncodedData.append("project_url", data.project_url);
      }

      console.log("포트폴리오 등록 데이터:", urlEncodedData.toString());
      console.log("전송할 user_id:", data.user_id);
      console.log("user_id 타입:", typeof data.user_id);

      const response = await apiClient.post(`/portfolios/`, urlEncodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
  static async getPortfolios(): Promise<ApiResponse> {
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
  ): Promise<ApiResponse> {
    try {
      // 백엔드에서 기대하는 형태로 form-urlencoded 데이터 구성
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("user_id", data.user_id.toString());
      urlEncodedData.append("project_name", data.project_name);
      urlEncodedData.append("project_intro", data.project_intro);
      urlEncodedData.append("project_period", data.project_period);
      urlEncodedData.append("role", data.role);

      // 선택적 필드들 추가
      if (data.is_representative !== undefined) {
        urlEncodedData.append(
          "is_representative",
          data.is_representative.toString()
        );
      }
      if (data.image) {
        urlEncodedData.append("image", data.image);
      }
      if (data.project_url) {
        urlEncodedData.append("project_url", data.project_url);
      }

      console.log("포트폴리오 업데이트 데이터:", urlEncodedData.toString());

      const response = await apiClient.put(
        `/portfolios/${portfolioId}`,
        urlEncodedData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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

// 프로젝트 서비스 클래스
export class ProjectService {
  /**
   * 프로젝트를 서버에 전송
   * @param data 프로젝트 데이터
   * @returns API 응답
   */
  static async submitProject(data: ProjectData): Promise<ApiResponse> {
    try {
      // 데이터 검증
      const requiredFields = ["user_id", "title", "description"];

      const missingFields = requiredFields.filter(
        (field) => !data[field as keyof ProjectData]
      );

      if (missingFields.length > 0) {
        console.error("필수 필드 누락:", missingFields);
        return {
          success: false,
          message: `필수 필드가 누락되었습니다: ${missingFields.join(", ")}`,
        };
      }

      // 백엔드에서 기대하는 형태로 form-urlencoded 데이터 구성
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("project_name", data.title); // title을 project_name으로 매핑
      urlEncodedData.append("project_period", data.project_period || ""); // 프로젝트 기간
      urlEncodedData.append("project_intro", data.description || ""); // description을 project_intro로 매핑
      urlEncodedData.append("description", data.description || ""); // 기존 description도 유지
      urlEncodedData.append("role", data.role || ""); // role 필드 추가
      urlEncodedData.append("tech_stack", data.tech_stack || ""); // 기술 스택
      urlEncodedData.append("user_id", data.user_id.toString()); // user_id를 문자열로 변환
      if (data.github_url) {
        urlEncodedData.append("github_url", data.github_url); // GitHub URL (선택적)
      }

      console.log("Form URL Encoded 데이터로 전송:", urlEncodedData.toString());

      const response = await apiClient.post("/projects/", urlEncodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return {
        success: true,
        message: "프로젝트가 성공적으로 저장되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("프로젝트 저장 실패:", error);

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
          });
        }
      }

      // 에러 메시지 처리
      let errorMessage = "프로젝트 저장에 실패했습니다.";
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
   * 프로젝트 목록 조회
   * @returns API 응답
   */
  static async getProjects(): Promise<ApiResponse> {
    try {
      const response = await apiClient.get("/projects/");

      return {
        success: true,
        message: "프로젝트를 성공적으로 조회했습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("프로젝트 조회 실패:", error);

      let errorMessage = "프로젝트 조회에 실패했습니다.";
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
   * 프로젝트 업데이트
   * @param projectId 프로젝트 ID
   * @param data 업데이트할 프로젝트 데이터
   * @returns API 응답
   */
  static async updateProject(
    projectId: number,
    data: ProjectData
  ): Promise<ApiResponse> {
    try {
      // 백엔드에서 기대하는 형태로 form-urlencoded 데이터 구성
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("project_name", data.title); // title을 project_name으로 매핑
      urlEncodedData.append("project_period", data.project_period || ""); // 프로젝트 기간
      urlEncodedData.append("project_intro", data.description || ""); // description을 project_intro로 매핑
      urlEncodedData.append("description", data.description || ""); // 기존 description도 유지
      urlEncodedData.append("role", data.role || ""); // role 필드 추가
      urlEncodedData.append("tech_stack", data.tech_stack || ""); // 기술 스택
      urlEncodedData.append("user_id", data.user_id.toString()); // user_id를 문자열로 변환
      if (data.github_url) {
        urlEncodedData.append("github_url", data.github_url); // GitHub URL (선택적)
      }

      const response = await apiClient.put(
        `/projects/${projectId}/`,
        urlEncodedData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return {
        success: true,
        message: "프로젝트가 성공적으로 업데이트되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("프로젝트 업데이트 실패:", error);

      // 에러 메시지 처리
      let errorMessage = "프로젝트 업데이트에 실패했습니다.";
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
