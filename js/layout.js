'use strict';

/**
 * Calculates the optimal CSS grid column/row count for `#micboard`
 * to make channel boxes as large as possible in the current viewport.
 * Must NOT import from app.js or channelview.js to avoid circular deps.
 */
export function setOptimalGrid(displayMode) {
  const board = document.getElementById('micboard');
  if (!board || displayMode !== 'deskmode') return;

  const items = board.querySelectorAll('.col-sm');
  const count = items.length;
  if (count === 0) return;

  const gap = 10;
  const paddingTop = 46; // .deskmode .above-mid padding-top (box-sizing: border-box)
  const paddingH = 16;   // 8px each side

  const availW = window.innerWidth - paddingH;
  const availH = window.innerHeight - paddingTop - gap; // minus gap for bottom breathing room

  let bestCols = 1;
  let bestArea = 0;

  for (let cols = 1; cols <= count; cols++) {
    const rows = Math.ceil(count / cols);
    const boxW = (availW - gap * (cols - 1)) / cols;
    const boxH = (availH - gap * (rows - 1)) / rows;
    if (boxW < 80) continue;
    const area = boxW * boxH;
    if (area > bestArea) {
      bestArea = area;
      bestCols = cols;
    }
  }

  const bestRows = Math.ceil(count / bestCols);

  board.style.gridTemplateColumns = `repeat(${bestCols}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${bestRows}, 1fr)`;
}
