document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotWindow = document.getElementById("chatbot-window");
  const resizeHandle = document.getElementById("resize-handle");
  const dragHandle = document.getElementById("drag-handle");
  const openLink = document.getElementById("open-google");

  // Toggle chatbot visibility
  chatbotBtn.addEventListener("click", () => {
    chatbotWindow.style.display =
      chatbotWindow.style.display === "none" ? "block" : "none";
  });

  // Open Google in new tab
  openLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.open("https://www.google.com", "_blank");
  });

  // Resizing logic (top-right corner)
  let isResizing = false;
  let startX, startY, startWidth, startHeight, startTop;

  resizeHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isResizing = true;
    const rect = chatbotWindow.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = rect.width;
    startHeight = rect.height;
    startTop = rect.top;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (isResizing) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newWidth = startWidth + dx;
      const newHeight = startHeight - dy;
      const newTop = startTop + dy;

      if (newWidth >= 200) {
        chatbotWindow.style.width = `${newWidth}px`;
      }
      if (newHeight >= 200) {
        chatbotWindow.style.height = `${newHeight}px`;
        chatbotWindow.style.top = `${newTop}px`;
      }
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
    isDragging = false;
    document.body.style.userSelect = "auto";
  });

  // Dragging logic (top bar)
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  dragHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    const rect = chatbotWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      chatbotWindow.style.left = `${e.clientX - offsetX}px`;
      chatbotWindow.style.top = `${e.clientY - offsetY}px`;
    }
  });
});
