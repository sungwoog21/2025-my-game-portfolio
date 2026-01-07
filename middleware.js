// middleware.js (반드시 루트 경로에 위치!)

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // 1. 인증 정보가 없으면 401 응답으로 로그인 팝업 띄우기
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
    const decoded = atob(auth); // 'ID:PW' 형태
    const [user, pwd] = decoded.split(':');

    // 2. 설정하신 아이디와 비번 확인
    if (user === '0000' && pwd === '0000') {
      // 인증 성공 시 다음으로 통과
      return;
    }
  } catch (e) {
    // 디코딩 에러 발생 시 처리
  }

  // 3. 정보가 틀렸을 경우 다시 로그인창
  return new Response('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// 모든 경로에 적용
export const config = {
  matcher: '/:path*',
};