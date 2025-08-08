import { apiClient } from "@/lib/api";

export interface EducationData {
  resume_id: number;
  institution: string;
  period: string;
  name: string;
}

export interface EducationResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class EducationService {
  static async submitEducation(
    educationData: EducationData
  ): Promise<EducationResponse> {
    try {
      // FormData 형식으로 변환 (application/x-www-form-urlencoded)
      const formData = new URLSearchParams();
      formData.append('resume_id', educationData.resume_id.toString());
      formData.append('institution', educationData.institution);
      formData.append('period', educationData.period);
      formData.append('name', educationData.name);

      // educationData 값 확인을 위한 로그
      console.log("전송할 교육 데이터:", educationData);
      console.log("FormData:", formData.toString());

      const response = await apiClient.post("/educations/", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200 || response.status === 201) {
        return {
          success: true,
          message: "교육 등록 성공",
          data: response.data,
        };
      }

      return {
        success: false,
        message: "알 수 없는 오류가 발생했습니다.",
      };
    } catch (error: any) {
      console.error("Education submission error:", error);

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

  static async updateEducation(
    educationId: number,
    educationData: EducationData
  ): Promise<EducationResponse> {
    try {
      // FormData 형식으로 변환 (application/x-www-form-urlencoded)
      const formData = new URLSearchParams();
      formData.append('resume_id', educationData.resume_id.toString());
      formData.append('institution', educationData.institution);
      formData.append('period', educationData.period);
      formData.append('name', educationData.name);

      // educationData 값 확인을 위한 로그
      console.log("업데이트할 교육 데이터:", educationData);
      console.log("FormData:", formData.toString());

      const response = await apiClient.put(
        `/educations/${educationId}/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 200) {
        return {
          success: true,
          message: "교육 업데이트 성공",
          data: response.data,
        };
      }

      return {
        success: false,
        message: "알 수 없는 오류가 발생했습니다.",
      };
    } catch (error: any) {
      console.error("Education update error:", error);

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
