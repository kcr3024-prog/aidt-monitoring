import { useState } from 'react'
import { Card, MetricCard } from '../components/Card'
import AIInsight from '../components/AIInsight'
import PageHeader from '../components/PageHeader'
import { Users, Clock, TrendingUp, Calendar, Award } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { exportToExcel, printReport } from '../utils/exportUtils'
import styles from './UsageAnalysis.module.css'

const UsageAnalysis = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'math' | 'english'>('all')

  const dailyActiveUsers = [
    { date: '01/24', active: 1120, new: 45, returning: 1075, sessions: 3240 },
    { date: '01/25', active: 1180, new: 52, returning: 1128, sessions: 3450 },
    { date: '01/26', active: 1050, new: 38, returning: 1012, sessions: 2980 },
    { date: '01/27', active: 1240, new: 60, returning: 1180, sessions: 3680 },
    { date: '01/28', active: 1290, new: 48, returning: 1242, sessions: 3820 },
    { date: '01/29', active: 1350, new: 55, returning: 1295, sessions: 4020 },
    { date: '01/30', active: 1420, new: 62, returning: 1358, sessions: 4280 },
  ]

  const userSegments = [
    { segment: '매일 사용 (파워유저)', count: 523, percent: 37, avgSession: 8.5, color: '#10b981' },
    { segment: '주 3-5회 (활성)', count: 456, percent: 32, avgSession: 5.2, color: '#3b82f6' },
    { segment: '주 1-2회 (보통)', count: 312, percent: 22, avgSession: 2.8, color: '#f59e0b' },
    { segment: '휴면 (30일)', count: 134, percent: 9, avgSession: 0.3, color: '#ef4444' },
  ]

  const hourlyUsage = [
    { hour: '00시', users: 12 },
    { hour: '02시', users: 8 },
    { hour: '04시', users: 5 },
    { hour: '06시', users: 45 },
    { hour: '08시', users: 456 },
    { hour: '10시', users: 892 },
    { hour: '12시', users: 1240 },
    { hour: '14시', users: 1120 },
    { hour: '16시', users: 980 },
    { hour: '18시', users: 234 },
    { hour: '20시', users: 156 },
    { hour: '22시', users: 89 },
  ]

  const schoolTypeData = [
    { type: '초등학교', schools: 342, teachers: 1234, students: 12456, growth: 15 },
    { type: '중학교', schools: 156, teachers: 567, students: 5678, growth: 8 },
    { type: '고등학교', schools: 89, teachers: 234, students: 2345, growth: -3 },
  ]

  const regionalData = [
    { rank: 1, region: '서울', schools: 189, activeRate: 92, weeklyUsers: 4523, growth: 18 },
    { rank: 2, region: '경기', schools: 245, activeRate: 88, weeklyUsers: 5234, growth: 22 },
    { rank: 3, region: '부산', schools: 78, activeRate: 85, weeklyUsers: 1890, growth: 12 },
    { rank: 4, region: '인천', schools: 56, activeRate: 82, weeklyUsers: 1456, growth: 10 },
    { rank: 5, region: '대구', schools: 45, activeRate: 79, weeklyUsers: 1123, growth: 8 },
  ]

  const subjectUsage = [
    { subject: '수학', teachers: 1234, students: 15678, sessions: 45234, avgTime: 32 },
    { subject: '영어', teachers: 456, students: 5890, sessions: 12456, avgTime: 28 },
  ]

  const aiInsights = [
    '일 평균 활성 사용자가 지난주 대비 26% 증가했습니다. 신규 기능 업데이트 효과로 보입니다.',
    '파워유저(매일 사용)가 37%로 높은 편이나, 휴면 사용자 9%에 대한 재참여 전략이 필요합니다.',
    '오전 8시~오후 2시 사이 사용량이 집중됩니다. 피크타임 서버 증설을 검토하세요.',
    '세종 지역의 성장률이 25%로 가장 높습니다. 교육청 협력 사례로 활용 가능합니다.',
    '초등학교 증가율 15%로 가장 높으나, 고등학교는 -3% 감소 추세입니다. 고등 콘텐츠 강화가 필요합니다.'
  ]

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const handleExport = () => {
    const exportData = regionalData.map(item => ({
      순위: item.rank,
      지역: item.region,
      학교수: item.schools,
      활성화율: `${item.activeRate}%`,
      주간사용자: item.weeklyUsers,
      성장률: `${item.growth}%`
    }))
    exportToExcel(exportData, '활용도_분석_지역별')
  }

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ start, end })
  }

  return (
    <div className={styles.container}>
      <PageHeader
        title="사용자 분석"
        subtitle="누가, 언제, 얼마나 사용하는지 분석합니다"
        onRefresh={handleRefresh}
        onExport={handleExport}
        onPrint={printReport}
        showDatePicker={true}
        onDateChange={handleDateChange}
      />

      <AIInsight insights={aiInsights} />

      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${subjectFilter === 'all' ? styles.active : ''}`}
          onClick={() => setSubjectFilter('all')}
        >
          전체
        </button>
        <button
          className={`${styles.filterBtn} ${subjectFilter === 'math' ? styles.active : ''}`}
          onClick={() => setSubjectFilter('math')}
        >
          수학
        </button>
        <button
          className={`${styles.filterBtn} ${subjectFilter === 'english' ? styles.active : ''}`}
          onClick={() => setSubjectFilter('english')}
        >
          영어
        </button>
      </div>

      {subjectFilter === 'all' && (
        <div className={styles.subjectGrid}>
          {subjectUsage.map((subject, index) => (
            <Card key={index}>
              <h3 className={styles.subjectTitle}>{subject.subject}</h3>
              <div className={styles.subjectStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>교사</span>
                  <span className={styles.statValue}>{subject.teachers.toLocaleString()}명</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>학생</span>
                  <span className={styles.statValue}>{subject.students.toLocaleString()}명</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>총 세션</span>
                  <span className={styles.statValue}>{subject.sessions.toLocaleString()}회</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>평균 시간</span>
                  <span className={styles.statValue}>{subject.avgTime}분</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className={styles.metricsGrid}>
        <MetricCard
          title="일 평균 활성 사용자 (DAU)"
          value="1,420명"
          trend={{ value: '26%', isPositive: true }}
          icon={<Users size={24} />}
          status="success"
        />
        <MetricCard
          title="주 평균 활성 사용자 (WAU)"
          value="8,650명"
          trend={{ value: '18%', isPositive: true }}
          icon={<Users size={24} />}
          status="success"
        />
        <MetricCard
          title="평균 세션 시간"
          value="32분"
          trend={{ value: '8%', isPositive: true }}
          icon={<Clock size={24} />}
          status="success"
        />
        <MetricCard
          title="리텐션 (7일)"
          value="78%"
          trend={{ value: '5%', isPositive: true }}
          icon={<TrendingUp size={24} />}
          status="success"
        />
      </div>

      <div className={styles.chartsGrid}>
        <Card className={styles.largeCard}>
          <h3 className={styles.chartTitle}>
            <Calendar size={18} />
            일별 활성 사용자 추이
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailyActiveUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="active" stroke="#4f46e5" strokeWidth={2} name="전체 활성" />
              <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} name="신규" />
              <Line type="monotone" dataKey="returning" stroke="#f59e0b" strokeWidth={2} name="재방문" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className={styles.chartTitle}>
            <Users size={18} />
            사용자 세그먼트 (활동 빈도)
          </h3>
          <div className={styles.segmentList}>
            {userSegments.map((segment, index) => (
              <div key={index} className={styles.segmentItem}>
                <div className={styles.segmentHeader}>
                  <span className={styles.segmentName}>{segment.segment}</span>
                  <span className={styles.segmentPercent}>{segment.percent}%</span>
                </div>
                <div className={styles.segmentBar}>
                  <div
                    className={styles.segmentFill}
                    style={{ width: `${segment.percent * 2.5}%`, backgroundColor: segment.color }}
                  />
                </div>
                <div className={styles.segmentMeta}>
                  <span>{segment.count}명</span>
                  <span>평균 {segment.avgSession}회/주</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className={styles.chartTitle}>
          <Clock size={18} />
          시간대별 사용 패턴
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hourlyUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip />
            <Bar dataKey="users" fill="#4f46e5" radius={[4, 4, 0, 0]} name="사용자 수" />
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.insightBox}>
          💡 <strong>피크타임:</strong> 오전 8시~오후 2시 (수업시간 집중)
        </div>
      </Card>

      <Card>
        <h3 className={styles.chartTitle}>
          <Award size={18} />
          학교급별 사용 현황
        </h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>학교급</th>
                <th>학교 수</th>
                <th>교사 수</th>
                <th>학생 수</th>
                <th>성장률</th>
              </tr>
            </thead>
            <tbody>
              {schoolTypeData.map((item, index) => (
                <tr key={index}>
                  <td className={styles.bold}>{item.type}</td>
                  <td>{item.schools}개</td>
                  <td>{item.teachers.toLocaleString()}명</td>
                  <td>{item.students.toLocaleString()}명</td>
                  <td>
                    <span className={`${styles.growth} ${item.growth >= 0 ? styles.positive : styles.negative}`}>
                      {item.growth >= 0 ? '↑' : '↓'} {Math.abs(item.growth)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className={styles.chartTitle}>
          <TrendingUp size={18} />
          지역별 TOP 5
        </h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>순위</th>
                <th>지역</th>
                <th>학교 수</th>
                <th>활성화율</th>
                <th>주간 사용자</th>
                <th>성장률</th>
              </tr>
            </thead>
            <tbody>
              {regionalData.map((item) => (
                <tr key={item.rank}>
                  <td className={styles.rank}>
                    {item.rank <= 3 ? (
                      <span className={styles.medal}>
                        {item.rank === 1 && '🥇'}
                        {item.rank === 2 && '🥈'}
                        {item.rank === 3 && '🥉'}
                      </span>
                    ) : (
                      item.rank
                    )}
                  </td>
                  <td className={styles.bold}>{item.region}</td>
                  <td>{item.schools}개</td>
                  <td>
                    <div className={styles.rateBar}>
                      <div className={styles.rateFill} style={{ width: `${item.activeRate}%` }} />
                      <span>{item.activeRate}%</span>
                    </div>
                  </td>
                  <td>{item.weeklyUsers.toLocaleString()}명</td>
                  <td>
                    <span className={`${styles.growth} ${item.growth >= 0 ? styles.positive : styles.negative}`}>
                      {item.growth >= 0 ? '↑' : '↓'} {Math.abs(item.growth)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default UsageAnalysis
