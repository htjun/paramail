interface TranslationDisplayProps {
  original: string
  translated: string
}

const TranslationDisplay = ({
  original,
  translated,
}: TranslationDisplayProps) => {
  return (
    <section className="grid gap-12 bg-white p-6">
      <div>
        <h2>원본</h2>
        <article>{original}</article>
      </div>
      <div>
        <h2>번역본</h2>
        <article>{translated}</article>
      </div>
    </section>
  )
}

export default TranslationDisplay
