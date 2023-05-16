import styles from '@/styles/loading-dots.module.css'

const LoadingDots = ({ dotColor = 'bg-indigo-800' }: { dotColor?: string }) => {
  return (
    <span className={styles.loading}>
      <span className={dotColor} />
      <span className={dotColor} />
      <span className={dotColor} />
    </span>
  )
}

export default LoadingDots
