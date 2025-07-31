import { API_BASE_URL } from "@/lib/api";

export interface TalentRequestData {
  position: string;
  job_description?: string;
  required_stack?: string;
  career_level?: string;
  employment_type?: string;
  message?: string;
}

export interface TalentRequestResponse {
  id: number;
  position: string;
  job_description?: string;
  required_stack?: string;
  career_level?: string;
  employment_type?: string;
  message?: string;
  created_at: string;
}

export interface TalentRequestResponseData {
  success: boolean;
  message: string;
  data?: TalentRequestResponse;
}

export class TalentRequestService {
  static async submitTalentRequest(
    requestData: TalentRequestData
  ): Promise<TalentRequestResponseData> {
    try {
      const response = await fetch(`${API_BASE_URL}/talent/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        return {
          success: true,
          message: "인재 요청이 성공적으로 등록되었습니다.",
          data: responseData,
        };
      } else if (response.status === 400) {
        return {
          success: false,
          message: "잘못된 데이터입니다.",
        };
      } else if (response.status === 422) {
        return {
          success: false,
          message: "입력 데이터가 올바르지 않습니다.",
        };
      } else {
        return {
          success: false,
          message: "인재 요청 등록에 실패했습니다.",
        };
      }
    } catch (error) {
      console.error("인재 요청 API 호출 실패:", error);
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      };
    }
  }
}
