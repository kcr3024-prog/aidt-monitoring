import { useState } from 'react'
import { Card, MetricCard } from '../components/Card'
import AIInsight from '../components/AIInsight'
import { AlertTriangle, Clock, Download, FileText, Plus, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './ErrorManagement.module.css'

const ErrorManagement = () => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('week')
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const errorTrendData = [
    { date: '01/24', errors: 52 },
    { date: '01/25', errors: 48 },
    { date: '01/26', errors: 55 },
    { date: '01/27', errors: 41 },
    { date: '01/28', errors: 38 },
    { date: '01/29', errors: 42 },
    { date: '01/30', errors: 45 },
  ]

  const topErrors = [
    { rank: 1, feature: 'AI발음분석', count: 12, type: '음성인식실패', severity: 'warning' },
    { rank: 2, feature: '과제첨부파일', count: 8, type: '업로드오류', severity: 'warning' },
    { rank: 3, feature: '평가채점', count: 5, type: '자동채점오류', severity: 'danger' },
    { rank: 4, feature: '로그인', count: 4, type: '세션만료', severity: 'info' },
    { rank: 5, feature: '교과서로딩', count: 3, type: '콘텐츠404', severity: 'warning' },
  ]

  const openTickets = [
    {
      id: '#1234',
      feature: 'AI발음',
      error: '인식률저하',
      severity: 'danger',
      assignee: '김개발',
      elapsed: '2.5h'
    },
    {
      id: '#1235',
      feature: '과제첨부',
      error: '용량제한',
      severity: 'warning',
      assignee: '이개발',
      elapsed: '1.2h'
    },
    {
      id: '#1236',
      feature: '로그인',
      error: '세션오류',
      severity: 'info',
      assignee: '박개발',
      elapsed: '0.3h'
    }
  ]

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'danger':
        return '🔴'
      case 'warning':
        return '🟡'
      case 'info':
        return 'ℹ️'
      default:
        return '⚪'
    }
  }

  const aiInsights = [
    'AI 발음분석 오류가 전체의 26%를 차지합니다. 음성인식 서버 상태 및 네트워크 품질 점검이 필요합니다.',
    '금주 오류 건수가 전주 대비 12% 감소했으나, 평가채점 오류는 여전히 크리티컬 이슈입니다.',
    '평균 해결 시간 2.3시간은 목표(4시간) 대비 우수한 수준입니다.'
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>오류 관리</h1>
          <p className={styles.subtitle}>무엇이 어디서 발생했는지 추적합니다</p>
        </div>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${timeFilter === 'today' ? styles.active : ''}`}
            onClick={() => setTimeFilter('today')}
          >
            오늘
          </button>
          <button
            className={`${styles.filterBtn} ${timeFilter === 'week' ? styles.active : ''}`}
            onClick={() => setTimeFilter('week')}
          >
            금주
          </button>
          <button
            className={`${styles.filterBtn} ${timeFilter === 'month' ? styles.active : ''}`}
            onClick={() => setTimeFilter('month')}
          >
            금월
          </button>
        </div>
      </div>

      <AIInsight insights={aiInsights} />

      <div className={styles.metricsGrid}>
        <MetricCard
          title="총 오류"
          value="45건"
          trend={{ value: '12%', isPositive: true }}
          icon={<AlertTriangle size={24} />}
          status="success"
        />
        <MetricCard
          title="크리티컬"
          value="0건"
          subtitle="✅ 안전"
          icon={<AlertTriangle size={24} />}
          status="success"
        />
        <MetricCard
          title="평균 해결시간"
          value="2.3시간"
          icon={<Clock size={24} />}
          status="success"
        />
        <MetricCard
          title="미해결"
          value="3건"
          icon={<AlertTriangle size={24} />}
          status="warning"
        />
      </div>

      <Card>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <TrendingDown size={20} />
            기능별 오류 TOP 5
          </h2>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>순위</th>
                <th>기능</th>
                <th>건수</th>
                <th>유형</th>
                <th>심각도</th>
              </tr>
            </thead>
            <tbody>
              {topErrors.map((error) => (
                <tr key={error.rank}>
                  <td className={styles.rank}>{error.rank}</td>
                  <td className={styles.feature}>{error.feature}</td>
                  <td className={styles.count}>{error.count}건</td>
                  <td>{error.type}</td>
                  <td className={styles.severity}>
                    {getSeverityIcon(error.severity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <AlertTriangle size={20} />
            미해결 티켓 (실시간)
          </h2>
          <button className={styles.createTicketBtn}>
            <Plus size={16} />
            티켓 생성
          </button>
        </div>

        <div className={styles.ticketsList}>
          {openTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`${styles.ticketItem} ${styles[ticket.severity]}`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className={styles.ticketId}>{ticket.id}</div>
              <div className={styles.ticketFeature}>{ticket.feature}</div>
              <div className={styles.ticketError}>{ticket.error}</div>
              <div className={styles.ticketSeverity}>
                {getSeverityIcon(ticket.severity)}
              </div>
              <div className={styles.ticketAssignee}>{ticket.assignee}</div>
              <div className={styles.ticketElapsed}>{ticket.elapsed}</div>
            </div>
          ))}
        </div>

        <div className={styles.ticketNote}>
          💡 클릭하면 상세 정보를 확인할 수 있습니다
        </div>
      </Card>

      <Card>
        <h2 className={styles.sectionTitle}>
          <TrendingDown size={20} />
          오류 추이 차트
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={errorTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="errors"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className={styles.actions}>
        <button className={styles.actionBtn}>
          <Plus size={16} />
          티켓 생성
        </button>
        <button className={styles.actionBtn}>
          <Download size={16} />
          엑셀 다운로드
        </button>
        <button className={styles.actionBtn}>
          <FileText size={16} />
          리포트 작성
        </button>
      </div>

      {selectedTicket && (
        <div className={styles.modal} onClick={() => setSelectedTicket(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>티켓 상세 정보</h3>
              <button onClick={() => setSelectedTicket(null)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalField}>
                <label>티켓 ID</label>
                <div>{selectedTicket.id}</div>
              </div>
              <div className={styles.modalField}>
                <label>기능</label>
                <div>{selectedTicket.feature}</div>
              </div>
              <div className={styles.modalField}>
                <label>오류 내용</label>
                <div>{selectedTicket.error}</div>
              </div>
              <div className={styles.modalField}>
                <label>심각도</label>
                <div>{getSeverityIcon(selectedTicket.severity)} {selectedTicket.severity}</div>
              </div>
              <div className={styles.modalField}>
                <label>담당자</label>
                <div>{selectedTicket.assignee}</div>
              </div>
              <div className={styles.modalField}>
                <label>경과 시간</label>
                <div>{selectedTicket.elapsed}</div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.modalBtn}>상태 변경</button>
              <button className={styles.modalBtn}>담당자 변경</button>
              <button className={styles.modalBtnPrimary}>해결 완료</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ErrorManagement
