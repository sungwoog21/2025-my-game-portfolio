// middleware.js (Vite/React 전용 - 무한 루프 방지 최적화 버전)

export default function middleware(req) {
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
      // [중요] 인증 성공 시 아무것도 반환하지 않으면(undefined) 자동으로 다음 단계로 진행됩니다.
      // fetch(req)를 사용하면 자기 자신을 다시 호출하는 루프에 빠질 수 있어 타임아웃의 원인이 됩니다.
      return; 
    }
  } catch (e) {
    console.error('인증 처리 중 오류:', e);
  }

  // 3. 정보가 틀렸을 경우 다시 로그인창
  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  // 모든 경로를 보호하되, 이미지와 자산 파일은 미들웨어가 아예 실행되지 않도록 제외
  matcher: ['/((?!api|favicon.ico|assets|images|.*\\..*).*)'],
};