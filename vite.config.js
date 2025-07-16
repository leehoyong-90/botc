import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/botc/',  // ← 레포 이름과 일치해야 함!
  plugins: [react()],
})
