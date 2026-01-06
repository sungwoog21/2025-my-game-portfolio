/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          black: '#0B0E14',   // 배경: 딥 다크
          dark: '#1A1F29',    // 카드 배경
          gold: '#D4AF37',    // 포인트: 골드
          blue: '#3498DB',    // 포인트: 블루 (데이터)
          text: '#E0E0E0',    // 기본 텍스트
          dim: '#A0A0A0',     // 보조 텍스트
        }
      },
      fontFamily: {
        sans: ['sans-serif'],
      }
    },
  },
  plugins: [],
}