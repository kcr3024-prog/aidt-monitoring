import { Card } from '../components/Card'
import { Construction } from 'lucide-react'
import styles from './LoggingCheck.module.css'

const LoggingCheck = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>로깅 체크</h1>
        <p className={styles.subtitle}>시스템 로그 및 모니터링 데이터를 확인합니다</p>
      </div>

      <Card className={styles.comingSoon}>
        <div className={styles.iconWrapper}>
          <Construction size={64} className={styles.icon} />
        </div>
        <h2>업데이트 중</h2>
        <p>로깅 체크 기능은 현재 개발 중입니다.</p>
        <p>곧 더 나은 모습으로 찾아뵙겠습니다.</p>
      </Card>
    </div>
  )
}

export default LoggingCheck
