// import { StrictMode } from 'react'
console.log('oo')
import { createRoot } from 'react-dom/client'
import 'globals.css'
import App from 'App.tsx'

console.log('render screen')

document.getElementById('instant-loader')?.remove()
createRoot(document.getElementById('root')!).render(<App />)
