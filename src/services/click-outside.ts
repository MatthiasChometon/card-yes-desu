export function clickOutside (node: HTMLElement): { destroy: () => void } {
  window.addEventListener('click', handleClick);

  function handleClick (e: MouseEvent) {
    if (!node.contains(e.target as Node)) {
      node.dispatchEvent(new CustomEvent('outsideClick'));
    }
  }

  return {
    destroy () {
      window.removeEventListener('click', handleClick);
    },
  };
}
