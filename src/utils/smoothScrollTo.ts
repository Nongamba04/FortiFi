export const smoothScrollTo = (targetId: string, duration = 1200) => {
    const target = document.getElementById(targetId);
    if (!target) return;
  
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;
  
    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  
    const animationLoop = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
  
      window.scrollTo(0, startPosition + distance * easedProgress);
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animationLoop);
      }
    };
  
    requestAnimationFrame(animationLoop);
  };
  