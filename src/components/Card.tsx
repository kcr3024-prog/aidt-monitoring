import { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export const Card = ({ children, className = '', padding = 'md' }: CardProps) => {
  return (
    <div className={`${styles.card} ${styles[padding]} ${className}`}>
      {children}
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  trend?: {
    value: string
    isPositive: boolean
  }
  icon?: ReactNode
  status?: 'success' | 'warning' | 'danger' | 'info'
  subtitle?: string
}

export const MetricCard = ({ title, value, trend, icon, status, subtitle }: MetricCardProps) => {
  return (
    <Card className={styles.metricCard}>
      <div className={styles.metricHeader}>
        <span className={styles.metricTitle}>{title}</span>
        {icon && <div className={styles.metricIcon}>{icon}</div>}
      </div>

      <div className={styles.metricValue}>
        {value}
        {status && <span className={`${styles.statusBadge} ${styles[status]}`} />}
      </div>

      {subtitle && <div className={styles.metricSubtitle}>{subtitle}</div>}

      {trend && (
        <div className={`${styles.trend} ${trend.isPositive ? styles.trendUp : styles.trendDown}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </Card>
  )
}
