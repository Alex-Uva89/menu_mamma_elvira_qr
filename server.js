// server.js (CommonJS)
const express = require('express')
const path = require('path')
const compression = require('compression')
const serveStatic = require('serve-static')

const app = express()
const PORT = process.env.PORT || 3000

// Abilita gzip/br
app.use(compression())

// => Se hai buildato PWA:
const distDir = path.join(__dirname, 'web', 'dist', 'pwa')
// => Se invece usi SPA, usa:
// const distDir = path.join(__dirname, 'web', 'dist', 'spa')

// Serve statici
app.use(serveStatic(distDir, { index: ['index.html'] }))

// Fallback per SPA (Express 5 / path-to-regexp v6 compatibile)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`✔ Server avviato su http://localhost:${PORT}`)
})
