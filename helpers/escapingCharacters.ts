export const chars = /[\*\(\)\[\]\?\\]/

export const escapingCharacters = (str?: string): string => {
  if (typeof str !== 'string') return ''
  return str
    .split('')
    .map((char) => char.replace(chars, (match) => `\\${match}`))
    .join('')
}
