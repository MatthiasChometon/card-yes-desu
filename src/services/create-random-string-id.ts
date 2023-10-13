export function createRandomStringId (): string {
  return Math.random().toString(36).substring(2, 9)
}
