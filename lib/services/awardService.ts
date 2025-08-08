import { apiClient } from "@/lib/api";

export interface AwardData {
  resume_id: number; // user_id → resume_id로 변경
  name: string; // title → name으로 변경
  date?: string;
  organization: string; // description → organization으로 변경
}

export interface AwardResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class AwardService {
  static async submitAward(awardData: AwardData): Promise<AwardResponse> {
    try {
      // FormData 형태로 전송 (application/x-www-form-urlencoded)
      const formData = new URLSearchParams();
      formData.append("resume_id", awardData.resume_id.toString());
      formData.append("name", awardData.name);
      if (awardData.date) {
        formData.append("date", awardData.date);
      }
      formData.append("organization", awardData.organization);

      // FormData 디버깅
      console.log("=== AwardService FormData 디버깅 ===");
      console.log("입력받은 데이터:", awardData);
      console.log("전송할 FormData:", formData.toString());
      console.log("=== AwardService FormData 디버깅 끝 ===");

      const response = await apiClient.post("/awards/", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
      // FormData 형태로 전송 (application/x-www-form-urlencoded)
      const formData = new URLSearchParams();
      formData.append("resume_id", awardData.resume_id.toString());
      formData.append("name", awardData.name);
      if (awardData.date) {
        formData.append("date", awardData.date);
      }
      formData.append("organization", awardData.organization);

      // FormData 디버깅
      console.log("=== AwardService Update FormData 디버깅 ===");
      console.log("입력받은 데이터:", awardData);
      console.log("전송할 FormData:", formData.toString());
      console.log("=== AwardService Update FormData 디버깅 끝 ===");

      const response = await apiClient.put(`/awards/${awardId}/`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
