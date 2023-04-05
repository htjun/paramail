const formatTextToParagraphs = (text: string) => {
  return text
    .split('\n')
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
}

export default formatTextToParagraphs
