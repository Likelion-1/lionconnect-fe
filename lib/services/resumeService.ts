import { apiClient } from "../api";

// 기본 정보 인터페이스
export interface BasicInfoData {
  profile_image?: File | null;
  name: string;
  email: string;
  phone: string;
  job_type: string;
  school: string;
  major: string;
  grade: string;
  period: string;
  short_intro: string;
  intro: string;
}

// 기본 정보 API 응답 인터페이스
export interface BasicInfoResponse {
  success: boolean;
  message: string;
  data?: any;
}

// 서버 응답 데이터 인터페이스
export interface ResumeResponseData {
  id: number; // resume ID
  user_id?: number; // 사용자 ID (별도로 있을 수 있음)
  profile_image?: string;
  name: string;
  email: string;
  phone: string;
  job_type: string;
  school: string;
  major: string;
  grade: string;
  period: string;
  short_intro: string;
  intro: string;
  age?: number | null;
  created_at: string;
  updated_at: string;
}

export interface ResumeDetailResponse {
  success: boolean;
  message: string;
  data?: {
    resume: {
      user_id: number;
      profile_image: string;
      email: string;
      job_type: string;
      major: string;
      period: string;
      intro: string;
      created_at: string;
      name: string;
      id: number;
      phone: string;
      school: string;
      grade: string;
      short_intro: string;
      age: number | null;
      updated_at: string;
    };
    portfolios: any[];
    projects: any[];
    awards: any[];
    educations: any[];
  };
}

// 이력서 서비스 클래스
export class ResumeService {
  /**
   * 기본 정보를 서버에 전송
   * @param data 기본 정보 데이터
   * @returns API 응답
   */
  static async submitBasicInfo(
    data: BasicInfoData
  ): Promise<BasicInfoResponse> {
    try {
      // FormData를 사용하여 파일과 텍스트 데이터를 함께 전송
      const formData = new FormData();

      // 파일이 있는 경우에만 추가
      if (data.profile_image) {
        formData.append("profile_image", data.profile_image);
      }

      // 텍스트 필드들 추가
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("job_type", data.job_type);
      formData.append("school", data.school);
      formData.append("major", data.major);
      formData.append("grade", data.grade);
      formData.append("period", data.period);
      formData.append("short_intro", data.short_intro);
      formData.append("intro", data.intro);

      // FormData 내용 확인을 위한 로그
      console.log("=== FormData 디버깅 ===");
      console.log("입력받은 데이터:", data);
      console.log("FormData 객체:", formData);
      console.log(
        "FormData instanceof FormData:",
        formData instanceof FormData
      );
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("FormData keys:", Array.from(formData.keys()));
      console.log("FormData values:", Array.from(formData.values()));
      console.log("FormData size:", Array.from(formData.entries()).length);
      console.log("=== FormData 디버깅 끝 ===");

      // FormData를 직접 전달
      console.log("ResumeService에서 apiClient로 전달하는 FormData:", formData);
      const response = await apiClient.post("/resumes/basic-info/", formData, {
        headers: {
          // Content-Type을 명시적으로 설정하지 않음 (브라우저가 자동 설정)
        },
      });

      console.log("=== 서버 응답 ===");
      console.log("응답 상태:", response.status);
      console.log("응답 헤더:", response.headers);
      console.log("응답 데이터:", response.data);
      console.log("=== 서버 응답 끝 ===");

      return {
        success: true,
        message: "기본 정보가 성공적으로 저장되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("기본 정보 저장 실패:", error);

      // 타임아웃 에러 처리
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        return {
          success: false,
          message: "서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.",
        };
      }

      // 네트워크 에러 처리
      if (!error.response) {
        return {
          success: false,
          message: "네트워크 연결을 확인해주세요.",
        };
      }

      // HTTP 상태 코드별 에러 처리
      const status = error.response?.status;
      let errorMessage = "기본 정보 저장에 실패했습니다.";

      switch (status) {
        case 400:
          errorMessage = "잘못된 요청입니다. 입력 정보를 확인해주세요.";
          break;
        case 401:
          errorMessage = "인증이 필요합니다. 로그인을 다시 해주세요.";
          break;
        case 403:
          errorMessage = "접근 권한이 없습니다.";
          break;
        case 404:
          errorMessage = "요청한 리소스를 찾을 수 없습니다.";
          break;
        case 422:
          errorMessage = "입력 정보가 올바르지 않습니다.";
          break;
        case 500:
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          break;
        default:
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  /**
   * 기본 정보 조회
   * @returns API 응답
   */
  static async getBasicInfo(): Promise<BasicInfoResponse> {
    try {
      const response = await apiClient.get("/resumes/basic-info/");

      return {
        success: true,
        message: "기본 정보를 성공적으로 조회했습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("기본 정보 조회 실패:", error);

      let errorMessage = "기본 정보 조회에 실패했습니다.";
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

  static async getResumeDetail(
    resumeId: number
  ): Promise<ResumeDetailResponse> {
    try {
      const response = await apiClient.get(`/resumes/${resumeId}/detail`);

      return {
        success: true,
        message: "이력서 상세 정보를 성공적으로 가져왔습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("이력서 상세 정보 조회 중 오류:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "이력서 상세 정보 조회에 실패했습니다.",
      };
    }
  }

  /**
   * 사용자 ID로 이력서 상세 정보 조회
   * @param userId 사용자 ID
   * @returns API 응답
   */
  static async getUserResumeDetail(
    userId: number
  ): Promise<ResumeDetailResponse> {
    try {
      const response = await apiClient.get(`/resumes/user/${userId}/detail`);

      return {
        success: true,
        message: "이력서 상세 정보를 성공적으로 가져왔습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("이력서 상세 정보 조회 중 오류:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "이력서 상세 정보 조회에 실패했습니다.",
      };
    }
  }

  /**
   * 기본 정보 업데이트
   * @param resumeId 이력서 ID
   * @param data 업데이트할 기본 정보 데이터
   * @returns API 응답
   */
  static async updateBasicInfo(
    resumeId: number,
    data: BasicInfoData
  ): Promise<BasicInfoResponse> {
    try {
      // FormData를 사용하여 파일과 텍스트 데이터를 함께 전송
      const formData = new FormData();

      // 파일이 있는 경우에만 추가
      if (data.profile_image) {
        formData.append("profile_image", data.profile_image);
      }

      // 텍스트 필드들 추가
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("job_type", data.job_type);
      formData.append("school", data.school);
      formData.append("major", data.major);
      formData.append("grade", data.grade);
      formData.append("period", data.period);
      formData.append("short_intro", data.short_intro);
      formData.append("intro", data.intro);

      const response = await apiClient.put(
        `/resumes/${resumeId}/basic-info/`,
        formData,
        {
          headers: {
            // Content-Type을 명시적으로 설정하지 않음 (브라우저가 자동 설정)
          },
        }
      );

      return {
        success: true,
        message: "기본 정보가 성공적으로 업데이트되었습니다.",
        data: response.data,
      };
    } catch (error: any) {
      console.error("기본 정보 업데이트 실패:", error);

      // 타임아웃 에러 처리
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        return {
          success: false,
          message: "서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.",
        };
      }

      // 네트워크 에러 처리
      if (!error.response) {
        return {
          success: false,
          message: "네트워크 연결을 확인해주세요.",
        };
      }

      // HTTP 상태 코드별 에러 처리
      const status = error.response?.status;
      let errorMessage = "기본 정보 업데이트에 실패했습니다.";

      switch (status) {
        case 400:
          errorMessage = "잘못된 요청입니다. 입력 정보를 확인해주세요.";
          break;
        case 401:
          errorMessage = "인증이 필요합니다. 로그인을 다시 해주세요.";
          break;
        case 403:
          errorMessage = "접근 권한이 없습니다.";
          break;
        case 404:
          errorMessage = "요청한 리소스를 찾을 수 없습니다.";
          break;
        case 422:
          errorMessage = "입력 정보가 올바르지 않습니다.";
          break;
        case 500:
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
          break;
        default:
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}
