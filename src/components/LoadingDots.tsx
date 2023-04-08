import styles from '@/styles/loading-dots.module.css'

const LoadingDots = () => {
  return (
    <span className={styles.loading}>
      <span className="bg-blue-800" />
      <span className="bg-blue-800" />
      <span className="bg-blue-800" />
    </span>
  )
}

export default LoadingDots
