import { useState } from 'react'
import { Card, MetricCard } from '../components/Card'
import AIInsight from '../components/AIInsight'
import PageHeader from '../components/PageHeader'
import { Users, BookOpen, AlertTriangle, Zap, Bell, Server, Activity, Database, Cpu } from 'lucide-react'
import { exportToExcel, printReport } from '../utils/exportUtils'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  // 긴급 이슈
  const criticalIssues = [
    {
      level: 'danger' as const,
      title: 'AI 발음분석 서버 응답 지연',
      impact: '12건 오류 발생, 평균 응답시간 3.2초',
      action: '서버 스케일업 & 알고리즘 최적화',
      assignee: '인프라팀',
      priority: '긴급',
      time: '10분 전'
    },
    {
      level: 'danger' as const,
      title: '평가 자동채점 오류',
      impact: '5건 오류, 학생 답안 미채점',
      action: '채점 로직 점검 및 수동 재채점',
      assignee: '개발팀',
      priority: '긴급',
      time: '25분 전'
    }
  ]

  // 시스템 상태
  const systemStatus = [
    { metric: '평균 응답시간', value: '0.85초', status: 'success', target: '1.0초', icon: <Zap size={20} /> },
    { metric: '동시 접속자', value: '1,234명', status: 'success', target: '2,000명', icon: <Users size={20} /> },
    { metric: '서버 가용성', value: '99.8%', status: 'success', target: '99.9%', icon: <Server size={20} /> },
    { metric: 'DB 커넥션', value: '45/100', status: 'success', target: '100', icon: <Database size={20} /> },
    { metric: 'CPU 사용률', value: '42%', status: 'success', target: '80%', icon: <Cpu size={20} /> },
    { metric: '메모리 사용률', value: '68%', status: 'warning', target: '80%', icon: <Activity size={20} /> },
  ]

  const aiInsights = [
    'AI 발음분석 오류가 전체의 26%를 차지합니다. 서버 증설 및 알고리즘 최적화가 시급합니다.',
    '점심시간(12시)에 오류가 집중됩니다. 피크타임 대비 서버 용량 증설을 검토하세요.',
    '메모리 사용률 68%로 임계치에 근접하고 있습니다. 메모리 누수 점검이 필요합니다.',
    '현재 1,234명이 동시 접속 중이며, 234개 수업이 진행 중입니다. 시스템은 정상 운영 중입니다.'
  ]

  const handleRefresh = async () => {
    console.log('데이터 새로고침...')
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const handleExport = () => {
    const exportData = criticalIssues.map(issue => ({
      우선순위: issue.priority,
      이슈: issue.title,
      영향범위: issue.impact,
      조치사항: issue.action,
      담당: issue.assignee,
      발생시각: issue.time
    }))
    exportToExcel(exportData, '실시간_긴급이슈')
  }

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ start, end })
    console.log('날짜 범위:', start, '~', end)
  }

  return (
    <div className={styles.container}>
      <PageHeader
        title="실시간 관제"
        subtitle="서비스 오류 및 이슈를 실시간으로 모니터링합니다"
        onRefresh={handleRefresh}
        onExport={handleExport}
        onPrint={printReport}
        showDatePicker={true}
        onDateChange={handleDateChange}
        autoRefreshInterval={30000}
      />

      <AIInsight insights={aiInsights} />

      <div className={styles.metricsGrid}>
        <MetricCard
          title="활성 사용자"
          value="1,234명"
          trend={{ value: '12%', isPositive: true }}
          icon={<Users size={24} />}
          status="success"
        />
        <MetricCard
          title="진행 중 수업"
          value="234개"
          subtitle="더보기 >"
          icon={<BookOpen size={24} />}
          status="success"
        />
        <MetricCard
          title="오류 건수"
          value="46건"
          subtitle="미해결 8건 · 처리중 2건"
          icon={<AlertTriangle size={24} />}
          status="warning"
        />
        <MetricCard
          title="평균 응답시간"
          value="0.85초"
          subtitle="목표: 1.0초"
          icon={<Zap size={24} />}
          status="success"
        />
      </div>

      <Card className={styles.alertsCard}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleWrapper}>
            <Bell size={20} />
            <h2>긴급 이슈 (즉시 대응 필요)</h2>
          </div>
          <span className={styles.badge}>{criticalIssues.length}건</span>
        </div>

        <div className={styles.alertsTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>우선순위</th>
                <th>이슈</th>
                <th>영향범위</th>
                <th>조치사항</th>
                <th>담당</th>
                <th>발생시각</th>
              </tr>
            </thead>
            <tbody>
              {criticalIssues.map((issue, index) => (
                <tr key={index} className={styles[issue.level]}>
                  <td className={styles.priority}>
                    <span className={`${styles.priorityBadge} ${styles[issue.level]}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className={styles.alertTitle}>{issue.title}</td>
                  <td className={styles.impact}>{issue.impact}</td>
                  <td>{issue.action}</td>
                  <td>{issue.assignee}</td>
                  <td className={styles.time}>{issue.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className={styles.sectionTitle}>
          <Server size={20} />
          시스템 상태
        </h2>

        <div className={styles.systemGrid}>
          {systemStatus.map((item, index) => (
            <div key={index} className={styles.systemItem}>
              <div className={styles.systemHeader}>
                {item.icon}
                <div className={styles.systemLabel}>
                  {item.metric}
                  <span className={styles.systemTarget}>목표: {item.target}</span>
                </div>
              </div>
              <div className={styles.systemValueWrapper}>
                <div className={styles.systemValue}>{item.value}</div>
                <span className={`${styles.systemStatus} ${styles[item.status]}`}>
                  {item.status === 'success' ? '✓ 정상' : '⚠ 주의'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
