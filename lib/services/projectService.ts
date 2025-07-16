import { apiClient } from "../api";

// 프로젝트 인터페이스
export interface ProjectData {
  portfolio_id?: number;
  user_id?: number;
  project_name: string;
  project_period: string;
  project_intro: string;
  description: string;
  role: string;
  tech_stack: string;
}

// 프로젝트 API 응답 인터페이스
export interface ProjectResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 프로젝트 서비스 클래스
export class ProjectService {
  /**
   * 프로젝트를 서버에 전송
   * @param data 프로젝트 데이터
   * @returns API 응답
   */
  static async submitProject(data: ProjectData): Promise<ProjectResponse> {
    try {
      // FormData를 사용하여 multipart/form-data로 전송
      const formData = new FormData();

      // 필수 필드들 추가 (안전한 체크)
      if (data.project_name) {
        formData.append("project_name", data.project_name);
      }
      if (data.project_period) {
        formData.append("project_period", data.project_period);
      }
      if (data.project_intro) {
        formData.append("project_intro", data.project_intro);
      }
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.role) {
        formData.append("role", data.role);
      }
      if (data.tech_stack) {
        formData.append("tech_stack", data.tech_stack);
      }

      // 선택적 필드들 추가
      if (data.portfolio_id !== undefined && data.portfolio_id !== null) {
        formData.append("portfolio_id", data.portfolio_id.toString());
      }
      if (data.user_id !== undefined && data.user_id !== null) {
        formData.append("user_id", data.user_id.toString());
      }

      // FormData 디버깅
      console.log("=== ProjectService FormData 디버깅 ===");
      console.log("입력받은 데이터:", data);
      console.log("FormData 객체:", formData);
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("FormData 크기:", Array.from(formData.entries()).length);
      console.log("=== ProjectService FormData 디버깅 끝 ===");

      const response = await apiClient.post("/projects/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        success: true,
        message: "프로젝트가 성공적으로 저장되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("프로젝트 저장 실패:", error);

      // 에러 메시지 처리
      let errorMessage = "프로젝트 저장에 실패했습니다.";
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
   * 프로젝트 목록 조회
   * @returns API 응답
   */
  static async getProjects(): Promise<ProjectResponse> {
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
  ): Promise<ProjectResponse> {
    try {
      // FormData를 사용하여 multipart/form-data로 전송
      const formData = new FormData();

      // 필수 필드들 추가 (안전한 체크)
      if (data.project_name) {
        formData.append("project_name", data.project_name);
      }
      if (data.project_period) {
        formData.append("project_period", data.project_period);
      }
      if (data.project_intro) {
        formData.append("project_intro", data.project_intro);
      }
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.role) {
        formData.append("role", data.role);
      }
      if (data.tech_stack) {
        formData.append("tech_stack", data.tech_stack);
      }

      // 선택적 필드들 추가
      if (data.portfolio_id !== undefined && data.portfolio_id !== null) {
        formData.append("portfolio_id", data.portfolio_id.toString());
      }
      if (data.user_id !== undefined && data.user_id !== null) {
        formData.append("user_id", data.user_id.toString());
      }

      const response = await apiClient.put(
        `/projects/${projectId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
