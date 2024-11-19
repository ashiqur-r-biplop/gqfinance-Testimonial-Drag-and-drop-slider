const sliders = document.querySelector(".sliders");
let isDragging = false;
let startPos = 0;
let startX;
let slideWidth;

// Update slideWidth on resize
window.addEventListener("resize", () => {
  slideWidth = sliders.firstElementChild.offsetWidth;
});
slideWidth = sliders.firstElementChild.offsetWidth; // Initialize on load

// Dragging functionality
sliders.addEventListener("mousedown", dragStart);
sliders.addEventListener("mousemove", dragMove);
sliders.addEventListener("mouseup", dragEnd);
sliders.addEventListener("mouseleave", dragEnd);

sliders.addEventListener("touchstart", dragStart, { passive: true });
sliders.addEventListener("touchmove", dragMove, { passive: true });
sliders.addEventListener("touchend", dragEnd);

function dragStart(e) {
  isDragging = true;
  startX = getPositionX(e);
  startPos = sliders.scrollLeft;
  sliders.style.cursor = "grabbing";
}

function dragMove(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  const diff = currentPosition - startX;

  sliders.scrollLeft = startPos - diff;
}

function dragEnd() {
  isDragging = false;
  sliders.style.cursor = "grab";

  // Snap to nearest slide
  const scrollLeft = sliders.scrollLeft;
  const nearestSlide = Math.round(scrollLeft / slideWidth);
  sliders.scrollTo({
    left: nearestSlide * slideWidth,
    behavior: "smooth",
  });
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}
