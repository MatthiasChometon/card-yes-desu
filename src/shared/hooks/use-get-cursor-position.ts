
interface UseGetCursorPosition {
  getCursorPosition: (e: { clientX: number; clientY: number }) => { x: number, y: number }
}

export const useGetCursorPosition = (): UseGetCursorPosition => {
  // pos is cursor position when right click occur
  let pos = { x: 0, y: 0 };
  // menu is dimension (height and width) of context menu
  let menu = { h: 0, y: 0, w: 0, x: 0 };
  // browser/window dimension (height and width)
  let browser = { h: 0, y: 0, w: 0, x: 0 };

  const getCursorPosition = (e: { clientX: number; clientY: number }): { x: number, y: number } => {
    browser = {
      ...browser,
      w: window.innerWidth,
      h: window.innerHeight
    };
    pos = {
      x: e.clientX,
      y: e.clientY
    };
    // If bottom part of context menu will be displayed
    // after right-click, then change the position of the
    // context menu. This position is controlled by `top` and `left`
    // at inline style.
    // Instead of context menu is displayed from top left of cursor position
    // when right-click occur, it will be displayed from bottom left.
    if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
    if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;

    return pos;
  }

  return { getCursorPosition }
}
