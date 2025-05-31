import { ref, onMounted } from "vue";

export function usePWA() {
  const showManualInstall = ref(false);
  const debugInfo = ref({
    promptFired: false,
    swRegistered: false,
    isStandalone: false,
    platform: navigator.userAgent,
    protocol: window.location.protocol,
    canInstall: false,
    manifestUrl: null,
  });

  let deferredPrompt = null;
  let installBannerShown = false;

  const triggerInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("📊 Install prompt result:", outcome);

        if (outcome === "accepted") {
          console.log("✅ User accepted the install prompt");
        } else {
          console.log("❌ User dismissed the install prompt");
        }

        deferredPrompt = null;
        const banner = document.getElementById("install-banner");
        if (banner) {
          banner.remove();
        }
      } catch (error) {
        console.error("Error during installation:", error);
      }
    } else {
      // Show manual install instructions
      alert(
        "To install this app:\n\n" +
          'Chrome: Menu (⋮) → "Install Todo PWA"\n' +
          'Edge: Menu (⋯) → "Apps" → "Install this site as an app"\n' +
          'Safari: Share button → "Add to Home Screen"\n' +
          'Firefox: Menu → "Install this site as an app"'
      );
    }
  };

  const showInstallBanner = () => {
    console.log("📱 Showing install banner");

    // Remove any existing banner first
    const existingBanner = document.getElementById("install-banner");
    if (existingBanner) {
      existingBanner.remove();
    }

    const installBanner = document.createElement("div");
    installBanner.id = "install-banner";
    installBanner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #4285f4;
      color: white;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      text-align: center;
      animation: slideUp 0.3s ease-out;
    `;

    installBanner.innerHTML = `
      <style>
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
      <p style="margin: 0 0 10px 0; font-size: 14px;">📱 Install this app for a better experience!</p>
      <button id="install-btn" style="background: white; color: #4285f4; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-right: 10px; font-weight: 500;">Install Now</button>
      <button id="later-btn" style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500;">Maybe Later</button>
    `;

    document.body.appendChild(installBanner);

    // Add event listeners
    document
      .getElementById("install-btn")
      .addEventListener("click", triggerInstall);
    document.getElementById("later-btn").addEventListener("click", () => {
      installBanner.remove();
      setTimeout(() => {
        if (
          deferredPrompt &&
          !window.matchMedia("(display-mode: standalone)").matches
        ) {
          showInstallBanner();
        }
      }, 300000); // Show again after 5 minutes
    });
  };

  const checkManifest = () => {
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      debugInfo.value.manifestUrl = manifestLink.href;
      console.log("✅ Manifest found:", manifestLink.href);
    } else {
      console.log("❌ No manifest link found");
    }
  };

  const setupPWAListeners = () => {
    // PWA Install Prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("🎉 beforeinstallprompt event fired!");
      e.preventDefault();
      deferredPrompt = e;

      // Update debug info
      debugInfo.value.promptFired = true;
      debugInfo.value.canInstall = true;

      if (
        !installBannerShown &&
        !window.matchMedia("(display-mode: standalone)").matches
      ) {
        showInstallBanner();
        installBannerShown = true;
      }
    });

    // Listen for successful installation
    window.addEventListener("appinstalled", (evt) => {
      console.log("✅ App was installed successfully");
      const banner = document.getElementById("install-banner");
      if (banner) {
        banner.remove();
      }
      deferredPrompt = null;
    });

    // Check if running as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("🚀 Running as installed PWA");
    }
  };

  onMounted(() => {
    // Update debug info
    debugInfo.value.isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    debugInfo.value.canInstall = "serviceWorker" in navigator;

    // Check for manifest
    setTimeout(checkManifest, 1000);

    // Check for service worker registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then(() => {
          debugInfo.value.swRegistered = true;
          console.log("✅ Service Worker registered and ready");
        })
        .catch((error) => {
          console.log("❌ Service Worker registration failed:", error);
        });

      // Also check if SW is already registered
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          debugInfo.value.swRegistered = true;
          console.log("✅ Service Worker already registered");
        }
      });
    }

    // Show manual install button if not in standalone mode
    showManualInstall.value = !debugInfo.value.isStandalone;

    // Setup PWA event listeners
    setupPWAListeners();

    // Enhanced debugging
    setTimeout(() => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      const isHTTPS = window.location.protocol === "https:";

      console.log("🔍 PWA Debug Info:");
      console.log("- Protocol:", window.location.protocol);
      console.log("- Is localhost:", isLocalhost);
      console.log("- Is HTTPS:", isHTTPS);
      console.log("- User Agent:", navigator.userAgent);
      console.log("- SW supported:", "serviceWorker" in navigator);
      console.log("- Is standalone:", isStandalone);
      console.log(
        "- Install conditions met:",
        (isLocalhost || isHTTPS) && "serviceWorker" in navigator
      );

      // Check manifest in dev tools
      if (debugInfo.value.manifestUrl) {
        console.log("- Manifest URL:", debugInfo.value.manifestUrl);
      }
    }, 2000);
  });

  return {
    showManualInstall,
    debugInfo,
    triggerInstall,
  };
}
