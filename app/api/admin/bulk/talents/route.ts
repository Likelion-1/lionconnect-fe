import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 관리자 API 키 검증
    const adminApiKey = request.headers.get("x_admin_api_key");
    const expectedApiKey = "lc_admin_6f52";

    if (adminApiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: "유효하지 않은 관리자 API 키입니다." },
        { status: 401 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();

    // 백엔드 API 호출
    const backendUrl = "https://lionconnect-backend.onrender.com";
    const response = await fetch(`${backendUrl}/admin/bulk/talents`, {
      method: "POST",
      headers: {
        accept: "application/json",
        x_admin_api_key: "lc_admin_6f52",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.message || "백엔드 요청 실패" },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("관리자 일괄 업로드 오류:", error);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
