import { apiClient } from "@/lib/api";

export interface AwardData {
  user_id: number;
  name: string;
  date: string;
  organization: string;
}

export interface AwardResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class AwardService {
  static async submitAward(awardData: AwardData): Promise<AwardResponse> {
    try {
      // JSON 형태로 전송
      const requestData = {
        user_id: awardData.user_id,
        name: awardData.name,
        date: awardData.date,
        organization: awardData.organization,
      };

      // JSON 디버깅
      console.log("=== AwardService JSON 디버깅 ===");
      console.log("입력받은 데이터:", awardData);
      console.log("전송할 JSON 데이터:", requestData);
      console.log("=== AwardService JSON 디버깅 끝 ===");

      const response = await apiClient.post("/awards/", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        success: true,
        message: "수상 및 활동 등록 성공",
        data: response.data,
      };
    } catch (error: any) {
      console.error("Award submission error:", error);

      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "알 수 없는 오류가 발생했습니다.";

        switch (status) {
          case 400:
            return {
              success: false,
              message: "잘못된 요청입니다. 입력 정보를 확인해주세요.",
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

  static async updateAward(
    awardId: number,
    awardData: AwardData
  ): Promise<AwardResponse> {
    try {
      // JSON 형태로 전송
      const requestData = {
        user_id: awardData.user_id,
        name: awardData.name,
        date: awardData.date,
        organization: awardData.organization,
      };

      // JSON 디버깅
      console.log("=== AwardService Update JSON 디버깅 ===");
      console.log("입력받은 데이터:", awardData);
      console.log("전송할 JSON 데이터:", requestData);
      console.log("=== AwardService Update JSON 디버깅 끝 ===");

      const response = await apiClient.put(`/awards/${awardId}/`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        success: true,
        message: "수상 및 활동 업데이트 성공",
        data: response.data,
      };
    } catch (error: any) {
      console.error("Award update error:", error);

      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "알 수 없는 오류가 발생했습니다.";

        switch (status) {
          case 400:
            return {
              success: false,
              message: "잘못된 요청입니다. 입력 정보를 확인해주세요.",
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
