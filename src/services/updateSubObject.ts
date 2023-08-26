export function updateSubObject<T> (object: T, objectSubFieldName: keyof T, newObjectSubField: T[keyof T]): T {
  return { ...object, [objectSubFieldName]: { ...object[objectSubFieldName], ...newObjectSubField } };
}
