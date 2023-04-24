import styles from '@/styles/loading-dots.module.css'

const LoadingDots = () => {
  return (
    <span className={styles.loading}>
      <span className="bg-indigo-800" />
      <span className="bg-indigo-800" />
      <span className="bg-indigo-800" />
    </span>
  )
}

export default LoadingDots
