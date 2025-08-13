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
    image: string; // project_image_url에서 image로 변경
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
      console.log("Received raw data:", data);

      // 데이터 구조 변환
      const processedData = data.map((talent: any) => {
        console.log("Processing talent:", talent);
        console.log("Talent portfolios:", talent.portfolios);

        // representative_portfolio 매핑 (백엔드의 project_image_url -> image로 통일)
        let representativePortfolio = null as {
          project_name: string;
          project_intro: string;
          image: string;
          tech_stack: string;
        } | null;

        const rawRep = talent.representative_portfolio;
        console.log("Original representative_portfolio:", rawRep);

        if (rawRep) {
          representativePortfolio = {
            project_name: rawRep.project_name ?? "",
            project_intro: rawRep.project_intro ?? "",
            // 백엔드가 project_image_url을 줄 수도 있고 image를 줄 수도 있음
            image:
              rawRep.image ??
              rawRep.project_image_url ??
              rawRep.project_image ??
              "",
            tech_stack: rawRep.tech_stack ?? "",
          };
        } else if (talent.portfolios && talent.portfolios.length > 0) {
          console.log("Found portfolios array, processing...");
          // portfolios 배열에서 is_representative가 true인 것을 찾거나 첫 번째 것을 사용
          const repPortfolio =
            talent.portfolios.find((p: any) => p.is_representative) ||
            talent.portfolios[0];
          console.log("Selected portfolio:", repPortfolio);

          representativePortfolio = {
            project_name: repPortfolio.project_name ?? "",
            project_intro: repPortfolio.project_intro ?? "",
            image:
              repPortfolio.image ??
              repPortfolio.project_image_url ??
              repPortfolio.project_image ??
              "",
            tech_stack: repPortfolio.tech_stack ?? "",
          };
          console.log(
            "Created representative_portfolio from portfolios:",
            representativePortfolio
          );
        } else {
          console.log(
            "No representative_portfolio and no portfolios array found"
          );
        }

        const processedTalent = {
          user_id: talent.user_id,
          profile_image: talent.profile_image, // 이미 완전한 URL
          name: talent.name,
          job_type: talent.job_type,
          school: talent.school,
          major: talent.major,
          short_intro: talent.short_intro,
          representative_portfolio: representativePortfolio,
          created_at: talent.created_at,
        };

        console.log("Processed talent:", processedTalent);
        return processedTalent;
      });

      console.log("Final processed data:", processedData);
      return processedData;
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
