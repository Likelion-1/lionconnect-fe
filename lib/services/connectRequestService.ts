import { apiClient } from "@/lib/api";

export interface ConnectRequestData {
  company_user_id: number;
  student_user_id: number;
  portfolio_id: number;
  message?: string;
  position?: string;
  job_description?: string;
  required_stack?: string;
  career_level?: string;
  employment_type?: string;
}

export interface ConnectRequestResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class ConnectRequestService {
  static async submitConnectRequest(
    requestData: ConnectRequestData
  ): Promise<ConnectRequestResponse> {
    try {
      const response = await apiClient.post(
        "/talents/connect-request/",
        requestData
      );

      if (response.status === 200) {
        return {
          success: true,
          message: "연결 요청 생성 성공",
          data: response.data,
        };
      }

      return {
        success: false,
        message: "알 수 없는 오류가 발생했습니다.",
      };
    } catch (error: any) {
      console.error("Connect request submission error:", error);

      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "알 수 없는 오류가 발생했습니다.";

        switch (status) {
          case 400:
            return {
              success: false,
              message:
                "중복 요청이거나 잘못된 데이터입니다. 입력 정보를 확인해주세요.",
            };
          case 422:
            return {
              success: false,
              message:
                "입력 정보가 올바르지 않습니다. 필수 항목을 확인해주세요.",
            };
          case 500:
            return {
              success: false,
              message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            };
          default:
            return {
              success: false,
              message: message,
            };
        }
      }

      return {
        success: false,
        message: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
      };
    }
  }
}
