const formatTextToParagraphs = (text: string) => {
  return text.split('\n').map(paragraph => paragraph.trim())
}

export default formatTextToParagraphs
