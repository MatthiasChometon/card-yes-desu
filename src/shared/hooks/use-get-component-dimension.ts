interface UseGetComponentDimension {
  getComponentDimension: (node: HTMLElement) => { height: number, width: number }
}

export const useGetComponentDimension = (): UseGetComponentDimension => {
  const getComponentDimension = (node: HTMLElement) => {
    let height = node.offsetHeight;
    let width = node.offsetWidth;
    return { height, width }
  }

  return { getComponentDimension }
}
