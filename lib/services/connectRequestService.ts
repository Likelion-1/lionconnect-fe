import { API_BASE_URL } from "@/lib/api";

export interface ConnectRequestData {
  career_level: string;
  company_name: string;
  company_representative_email: string;
  company_representative_name: string;
  company_representative_phone: string;
  employment_type: string;
  job_description: string;
  message: string;
  position: string;
  required_stack: string;
  user_id: number;
}

export interface ConnectRequestResponse {
  id: number;
  user_id: number;
  portfolio_id: number;
  company_representative_name: string;
  company_representative_email: string;
  company_representative_phone: string;
  company_name: string;
  message: string;
  position: string;
  job_description: string;
  required_stack: string;
  career_level: string;
  employment_type: string;
  created_at: string;
}

export interface ConnectRequestResponseData {
  success: boolean;
  message: string;
  data?: ConnectRequestResponse;
}

export class ConnectRequestService {
  static async submitConnectRequest(
    requestData: ConnectRequestData
  ): Promise<ConnectRequestResponseData> {
    try {
      const response = await fetch(`${API_BASE_URL}/connect/request`, {
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
          message: "커넥트 요청이 성공적으로 전송되었습니다.",
          data: responseData,
        };
      } else if (response.status === 400) {
        return {
          success: false,
          message: "잘못된 데이터 또는 중복 요청입니다.",
        };
      } else if (response.status === 404) {
        return {
          success: false,
          message: "수료생을 찾을 수 없습니다.",
        };
      } else if (response.status === 422) {
        return {
          success: false,
          message: "입력 데이터가 올바르지 않습니다.",
        };
      } else {
        return {
          success: false,
          message: "커넥트 요청 전송에 실패했습니다.",
        };
      }
    } catch (error) {
      console.error("커넥트 요청 API 호출 실패:", error);
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      };
    }
  }
}
