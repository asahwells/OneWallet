export const removeHyphen = (text: string) => {
    if(!text || typeof text !== 'string') return text
    return capitalizeFirstLetters(text.replace(/-/g, ' '))
}

export const capitalizeFirstLetters = (text: string) => {
    if(!text || typeof text !== 'string') return text
    return text.replace(/\b\w/g, (c) => c.toUpperCase());
}