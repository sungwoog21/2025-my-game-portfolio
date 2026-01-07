import { NextResponse } from 'next/server';

export function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // 1. 인증 정보가 없으면 401 응답과 함께 로그인 팝업 호출
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  try {
    const auth = authHeader.split(' ')[1];
    const decoded = atob(auth);
    const [user, pwd] = decoded.split(':');

    // 2. 아이디와 비번 확인
    if (user === '0000' && pwd === '0000') {
      // 인증 성공 시 명확하게 '다음(페이지)'으로 넘기라는 신호를 줍니다.
      return NextResponse.next();
    }
  } catch (e) {
    console.error('인증 오류:', e);
  }

  // 3. 인증 실패 시 다시 로그인 창
  return new NextResponse('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// 모든 경로에 적용하되, 이미지 등 정적 파일은 제외
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};