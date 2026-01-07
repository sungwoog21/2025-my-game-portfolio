// middleware.js (Vite 프로젝트 전용 - 타임아웃 해결 버전)

export default async function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // 1. 인증 정보가 없으면 401 응답으로 로그인 창 호출
  if (!authHeader) {
    return new Response('Authentication required', {
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

    // 2. 아이디/비번 확인 (0000 / 0000)
    if (user === '0000' && pwd === '0000') {
      // [핵심] 성공 시 원래 요청을 fetch하여 반환해야 타임아웃이 나지 않습니다.
      return fetch(req);
    }
  } catch (e) {
    console.error('인증 처리 중 오류:', e);
  }

  // 3. 인증 실패 시 다시 로그인 창
  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  // 모든 경로를 보호하되, 이미지(images)와 정적 자산(assets)은 제외
  matcher: ['/((?!api|favicon.ico|assets|images|.*\\..*).*)'],
};