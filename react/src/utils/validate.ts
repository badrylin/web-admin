export function isValidUsername(str: string): boolean {
  const validMap = ['admin', 'editor'];
  return validMap.indexOf(str.trim()) >= 0;
}
