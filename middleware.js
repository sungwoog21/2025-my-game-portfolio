// middleware.js (Vite 전용 - 이미지 경로 제외 추가)

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  try {
    const auth = authHeader.split(' ')[1];
    const [user, pwd] = atob(auth).split(':');

    if (user === '0000' && pwd === '0000') {
      return; // 인증 성공 시 통과
    }
  } catch (e) {}

  return new Response('Invalid credentials', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: [
    /*
     * 다음 경로로 시작하는 요청은 미들웨어 검사에서 제외:
     * - api, favicon.ico, assets, images (이미지 폴더)
     * - 모든 파일 확장자 (.*\\..*)
     */
    '/((?!api|favicon.ico|assets|images|.*\\..*).*)',
  ],
};