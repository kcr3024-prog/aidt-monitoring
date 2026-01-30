import { useState } from 'react'
import { Card, MetricCard } from '../components/Card'
import AIInsight from '../components/AIInsight'
import { Users, BookOpen, AlertTriangle, RefreshCw, TrendingUp, Server, Clock, Bell } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState<'realtime' | '1h' | 'today'>('realtime')

  const weeklyTrendData = [
    { day: '월', users: 1100, errors: 5, ai: 890 },
    { day: '화', users: 1150, errors: 3, ai: 920 },
    { day: '수', users: 1200, errors: 4, ai: 950 },
    { day: '목', users: 1180, errors: 2, ai: 980 },
    { day: '금', users: 1234, errors: 3, ai: 1020 },
  ]

  const urgentAlerts = [
    {
      level: 'danger' as const,
      title: 'AI 맞춤학습 재시도율 99%',
      action: '알고리즘 점검',
      assignee: 'AI팀'
    },
    {
      level: 'danger' as const,
      title: '스스로학습 리포트 이탈률 83%',
      action: '기능 점검',
      assignee: '개발팀'
    },
    {
      level: 'warning' as const,
      title: '영어 교사 활용도 저조',
      action: '사용성 개선 검토',
      assignee: '기획팀'
    }
  ]

  const aiInsights = [
    'AI 맞춤학습 재시도율이 평균 대비 400% 증가했습니다. 알고리즘 즉시 점검이 필요합니다.',
    '전체 활성 사용자가 지난주 대비 12% 증가하여 긍정적 추세입니다.',
    '오류 발생률이 40% 감소했으나, 스스로학습 리포트 기능의 이탈률이 심각한 수준입니다.'
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>실시간 관제</h1>
          <p className={styles.subtitle}>오늘의 핵심 지표를 한눈에 확인하세요</p>
        </div>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${timeFilter === 'realtime' ? styles.active : ''}`}
            onClick={() => setTimeFilter('realtime')}
          >
            실시간 (자동갱신)
          </button>
          <button
            className={`${styles.filterBtn} ${timeFilter === '1h' ? styles.active : ''}`}
            onClick={() => setTimeFilter('1h')}
          >
            최근 1시간
          </button>
          <button
            className={`${styles.filterBtn} ${timeFilter === 'today' ? styles.active : ''}`}
            onClick={() => setTimeFilter('today')}
          >
            오늘
          </button>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <MetricCard
          title="활성 사용자"
          value="1,234명"
          trend={{ value: '12%', isPositive: true }}
          icon={<Users size={24} />}
          status="success"
        />
        <MetricCard
          title="진행중 수업"
          value="45개"
          subtitle="23개교"
          icon={<BookOpen size={24} />}
          status="success"
        />
        <MetricCard
          title="오류 건수"
          value="3건"
          trend={{ value: '40%', isPositive: true }}
          icon={<AlertTriangle size={24} />}
          status="success"
        />
        <MetricCard
          title="AI재시도율"
          value="99%"
          subtitle="심각"
          icon={<RefreshCw size={24} />}
          status="danger"
        />
      </div>

      <AIInsight insights={aiInsights} />

      <Card className={styles.alertsCard}>
        <div className={styles.sectionHeader}>
          <h2>🚨 즉시 대응 필요</h2>
          <span className={styles.badge}>{urgentAlerts.length}건</span>
        </div>

        <div className={styles.alertsList}>
          {urgentAlerts.map((alert, index) => (
            <div key={index} className={`${styles.alertItem} ${styles[alert.level]}`}>
              <div className={styles.alertIcon}>
                {alert.level === 'danger' ? '🔴' : '🟡'}
              </div>
              <div className={styles.alertContent}>
                <div className={styles.alertTitle}>{alert.title}</div>
                <div className={styles.alertMeta}>
                  <span>→ 액션: {alert.action}</span>
                  <span>| 담당: {alert.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className={styles.chartsGrid}>
        <Card>
          <h3 className={styles.chartTitle}>
            <TrendingUp size={20} />
            접속자 추이
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className={styles.chartTitle}>
            <AlertTriangle size={20} />
            오류율 추이
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className={styles.chartTitle}>
            <RefreshCw size={20} />
            AI 사용량 추이
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="ai" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h2 className={styles.sectionTitle}>
          <Server size={20} />
          현재 시스템 상태
        </h2>

        <div className={styles.systemStatus}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>서버 가용성</span>
            <div className={styles.statusValue}>
              <span>99.8%</span>
              <span className={styles.statusCheck}>✅</span>
            </div>
          </div>

          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>평균 응답시간</span>
            <div className={styles.statusValue}>
              <span>0.8초</span>
              <span className={styles.statusCheck}>✅</span>
            </div>
          </div>

          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>슬로우 쿼리</span>
            <div className={styles.statusValue}>
              <span>2건</span>
              <span className={styles.statusWarning}>🟡</span>
            </div>
          </div>

          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>긴급 알림</span>
            <div className={styles.statusValue}>
              <span>없음</span>
              <span className={styles.statusCheck}>✅</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
