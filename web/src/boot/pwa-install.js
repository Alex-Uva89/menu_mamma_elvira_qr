let deferredPrompt = null
export default ({ app }) => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    app.config.globalProperties.$emit?.('pwa-install-available')
  })

  app.config.globalProperties.$pwaInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = null
  }
}
