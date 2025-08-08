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
  private static baseURL = "https://lionconnect-backend.onrender.com";

  static async getTalents(
    skip: number = 0,
    limit: number = 10
  ): Promise<Talent[]> {
    try {
      const url = new URL(`${this.baseURL}/talents/grid`);
      url.searchParams.append("skip", skip.toString());
      url.searchParams.append("limit", limit.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch talents:", error);
      throw error;
    }
  }
}
