export const sendMessageToServiceWorker = (message) => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "BROADCAST",
      message,
    });
  }
};