export function updateObjectInArrayById<T extends { id: string }> (array: T[], objectModified: T): T[] {
  const newArray = array.map(arrayObject => {
    if (arrayObject.id === objectModified.id) {
      return objectModified
    }
    return arrayObject;
  })

  return newArray
}
