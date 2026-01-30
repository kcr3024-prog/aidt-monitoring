import { useState } from 'react'
import { Card } from '../components/Card'
import { Search, User, Clock, Activity, MapPin } from 'lucide-react'
import styles from './UUIDSearch.module.css'

const UUIDSearch = () => {
  const [uuid, setUuid] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)

  const handleSearch = () => {
    setSearchResult({
      uuid: uuid,
      userType: '학생',
      name: '홍길동',
      school: '서울초등학교',
      grade: '5학년 3반',
      lastActive: '2024-01-30 14:35:22',
      totalSessions: 156,
      activities: [
        {
          timestamp: '2024-01-30 14:35:22',
          action: '수업 시작 → 게임',
          page: '/class/game',
          duration: '15분 32초',
          status: 'success'
        },
        {
          timestamp: '2024-01-30 14:20:15',
          action: '교과서 조회',
          page: '/textbook/math/chapter1',
          duration: '8분 10초',
          status: 'success'
        },
        {
          timestamp: '2024-01-30 14:12:05',
          action: 'AI 맞춤학습 시작',
          page: '/ai-learning/adaptive',
          duration: '12분 45초',
          status: 'warning'
        },
        {
          timestamp: '2024-01-30 14:05:30',
          action: '로그인',
          page: '/auth/login',
          duration: '1분 20초',
          status: 'success'
        },
        {
          timestamp: '2024-01-30 13:45:12',
          action: '평가 제출',
          page: '/assessment/submit',
          duration: '25분 15초',
          status: 'error'
        }
      ]
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>UUID 검색</h1>
        <p className={styles.subtitle}>특정 사용자의 활동 로그를 조회합니다</p>
      </div>

      <Card>
        <div className={styles.searchBox}>
          <div className={styles.inputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="UUID를 입력하세요 (예: abc123-def456-ghi789)"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className={styles.searchInput}
            />
          </div>
          <button onClick={handleSearch} className={styles.searchBtn}>
            검색
          </button>
        </div>
      </Card>

      {searchResult && (
        <>
          <Card>
            <h2 className={styles.sectionTitle}>
              <User size={20} />
              사용자 정보
            </h2>

            <div className={styles.userInfoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>UUID</span>
                <span className={styles.infoValue}>{searchResult.uuid}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>사용자 유형</span>
                <span className={styles.infoValue}>{searchResult.userType}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>이름</span>
                <span className={styles.infoValue}>{searchResult.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>소속</span>
                <span className={styles.infoValue}>{searchResult.school}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>학년/반</span>
                <span className={styles.infoValue}>{searchResult.grade}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>마지막 활동</span>
                <span className={styles.infoValue}>{searchResult.lastActive}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>총 세션 수</span>
                <span className={styles.infoValue}>{searchResult.totalSessions}회</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>
              <Activity size={20} />
              활동 로그
            </h2>

            <div className={styles.timeline}>
              {searchResult.activities.map((activity: any, index: number) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={`${styles.timelineDot} ${styles[activity.status]}`} />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineAction}>{activity.action}</span>
                      <span className={styles.timelineDuration}>{activity.duration}</span>
                    </div>
                    <div className={styles.timelineMeta}>
                      <span className={styles.timelineTime}>
                        <Clock size={14} />
                        {activity.timestamp}
                      </span>
                      <span className={styles.timelinePage}>
                        <MapPin size={14} />
                        {activity.page}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

export default UUIDSearch
