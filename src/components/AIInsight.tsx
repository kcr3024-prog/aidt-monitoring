import { Sparkles } from 'lucide-react'
import styles from './AIInsight.module.css'

interface AIInsightProps {
  insights: string[]
  title?: string
}

const AIInsight = ({ insights, title = 'AI 인사이트 요약' }: AIInsightProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Sparkles size={20} className={styles.icon} />
        <h3>{title}</h3>
      </div>

      <ul className={styles.list}>
        {insights.map((insight, index) => (
          <li key={index} className={styles.item}>
            {insight}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AIInsight
