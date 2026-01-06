// middleware.js (Vite/React 프로젝트용)

export const config = {
  // 모든 경로에서 작동하도록 설정 (정적 파일 제외)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const auth = authHeader.split(' ')[1];
  // Buffer 대신 Web API인 atob 사용 (Edge Runtime 호환성)
  const decoded = atob(auth);
  const [user, pwd] = decoded.split(':');

  if (user === '0000' && pwd === '0000') {
    return new Response('OK', { status: 200 }); // 인증 성공 시 통과
  }

  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
