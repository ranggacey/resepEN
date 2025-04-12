/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        darkBg: '#0d0d0d',
        neon: '#8affef',
        cardDark: '#1a1a1a',
        cardLight: '#f4f4f4'
      }
    },
  },
  plugins: [
    // Hapus atau komentar baris di bawah jika tidak ingin menggunakan plugin forms
    // require('@tailwindcss/forms'),
  ],
}
// Tambahkan plugin lain jika diperlukan
// Contoh penggunaan plugin forms
// require('@tailwindcss/forms'),
// Anda dapat menambahkan plugin lain sesuai kebutuhan