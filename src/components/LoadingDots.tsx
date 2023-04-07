import styles from '@/styles/loading-dots.module.css'

const LoadingDots = () => {
  return (
    <span className={styles.loading}>
      <span className="bg-grayBlue-500" />
      <span className="bg-grayBlue-500" />
      <span className="bg-grayBlue-500" />
    </span>
  )
}

export default LoadingDots
