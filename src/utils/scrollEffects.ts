
// Apply scroll effects to all hero sections
export const applyScrollEffects = () => {
  // CSS for the hero sections
  const style = document.createElement('style');
  style.textContent = `
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);
};
