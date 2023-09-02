export function clickOutside (node: HTMLElement): { destroy: () => void } {
  window.addEventListener('click', handleClick);

  function handleClick (e: MouseEvent) {
    // Récupérez les coordonnées globales du clic
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Récupérez les coordonnées globales de l'élément
    const rect = node.getBoundingClientRect();
    const elementX = rect.left;
    const elementY = rect.top;
    const elementWidth = rect.width;
    const elementHeight = rect.height;

    // Vérifiez si le clic est à l'intérieur de l'élément
    if (
      clickX >= elementX &&
      clickX <= elementX + elementWidth &&
      clickY >= elementY &&
      clickY <= elementY + elementHeight
    ) {
      // Clic à l'intérieur de l'élément, ne rien faire
      return;
    }

    // Clic à l'extérieur de l'élément, déclencher l'événement 'outsideClick'
    node.dispatchEvent(new CustomEvent('outsideClick'));
  }

  return {
    destroy () {
      window.removeEventListener('click', handleClick);
    },
  };
}
