export interface Talent {
  user_id: number;
  profile_image: string | null;
  name: string;
  job_type: string;
  school: string;
  major: string;
  short_intro: string;
  representative_portfolio: {
    project_name: string;
    project_intro: string;
    project_image_url: string;
    tech_stack: string;
  } | null;
  created_at: string;
}

export class TalentService {
  // 백엔드 직접 호출 대신 Next.js 프록시 API 사용
  private static baseURL = "/api/talents";

  static async getTalents(
    skip: number = 0,
    limit: number = 10
  ): Promise<Talent[]> {
    try {
      const url = new URL(`${this.baseURL}`, window.location.origin);
      url.searchParams.append("skip", skip.toString());
      url.searchParams.append("limit", limit.toString());

      console.log("Fetching talents from:", url.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Received data:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch talents:", error);

      // 네트워크 에러인 경우 더 자세한 정보 제공
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        console.error(
          "Network error detected. This might be a CORS issue or network connectivity problem."
        );
        throw new Error(
          "네트워크 연결에 실패했습니다. CORS 설정이나 네트워크 연결을 확인해주세요."
        );
      }

      throw error;
    }
  }
}
