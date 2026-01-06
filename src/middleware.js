import { NextResponse } from 'next/server';

export function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    // Basic 인증 정보 추출
    const auth = authHeader.split(' ')[1];
    const decoded = Buffer.from(auth, 'base64').toString();
    const [user, pwd] = decoded.split(':');

    // ID와 PW 확인 (환경 변수 사용을 권장합니다)
    if (user === '0000' && pwd === '0000') {
      return NextResponse.next();
    }
  }

  // 인증 실패 시 401 응답 및 인증 창 띄우기
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// 중요: 매처 설정 수정
export const config = {
  /*
   * 아래 경로를 제외한 모든 경로에 미들웨어 적용:
   * /api, /_next/static, /_next/image, /favicon.ico 등 공통 자원 제외
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};