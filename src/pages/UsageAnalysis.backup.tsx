import { useState } from 'react'
import { Card } from '../components/Card'
import AIInsight from '../components/AIInsight'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Users, Calendar, Globe, Monitor } from 'lucide-react'
import styles from './UsageAnalysis.module.css'

const UsageAnalysis = () => {
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month'>('week')
  const [subjectFilter, setSubjectFilter] = useState<'math' | 'english' | 'all'>('all')

  const regionalData = [
    { rank: 1, region: '서울', schools: 45, activeRate: 89, weeklyAccess: 3456 },
    { rank: 2, region: '경기', schools: 38, activeRate: 82, weeklyAccess: 2890 },
    { rank: 3, region: '부산', schools: 22, activeRate: 75, weeklyAccess: 1234 },
    { rank: 4, region: '인천', schools: 18, activeRate: 70, weeklyAccess: 987 },
    { rank: 5, region: '대전', schools: 15, activeRate: 68, weeklyAccess: 765 },
  ]

  const heatmapData = [
    { day: '월', h00: 5, h04: 3, h08: 85, h12: 92, h16: 88, h20: 12 },
    { day: '화', h00: 4, h04: 2, h08: 88, h12: 95, h16: 90, h20: 10 },
    { day: '수', h00: 6, h04: 4, h08: 90, h12: 94, h16: 89, h20: 11 },
    { day: '목', h00: 5, h04: 3, h08: 87, h12: 93, h16: 91, h20: 13 },
    { day: '금', h00: 4, h04: 2, h08: 89, h12: 96, h16: 92, h20: 14 },
  ]

  const deviceData = [
    { name: 'Chrome', value: 45, color: '#4285f4' },
    { name: 'Whale', value: 28, color: '#00c6be' },
    { name: 'Edge', value: 18, color: '#0078d4' },
    { name: 'Safari', value: 6, color: '#006cff' },
    { name: '기타', value: 3, color: '#94a3b8' },
  ]

  const osData = [
    { name: 'Windows', value: 52, color: '#0078d4' },
    { name: 'ChromeOS', value: 25, color: '#4285f4' },
    { name: 'macOS', value: 15, color: '#000000' },
    { name: 'iPad/Tablet', value: 8, color: '#f59e0b' },
  ]

  const getHeatColor = (value: number) => {
    if (value >= 85) return '#1e40af'
    if (value >= 50) return '#3b82f6'
    if (value >= 20) return '#93c5fd'
    return '#e0e7ff'
  }

  const aiInsights = [
    '수학 과목이 영어 과목 대비 5.7배 높은 활용률을 보이고 있습니다.',
    '08-16시 수업시간에 집중된 접속 패턴이 명확합니다. 학교 수업과의 연계가 잘 이루어지고 있습니다.',
    '서울/경기 지역의 활성화율이 전국 평균 대비 25% 높습니다.',
    'Chrome과 Whale 브라우저가 전체의 73%를 차지하며, 크로스 브라우저 호환성이 우수합니다.'
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>활용도 분석</h1>
          <p className={styles.subtitle}>누가, 언제, 얼마나 사용하는지 분석합니다</p>
        </div>

        <div className={styles.filters}>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className={styles.select}
          >
            <option value="day">일</option>
            <option value="week">주</option>
            <option value="month">월</option>
          </select>

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value as any)}
            className={styles.select}
          >
            <option value="all">전체</option>
            <option value="math">수학</option>
            <option value="english">영어</option>
          </select>
        </div>
      </div>

      <AIInsight insights={aiInsights} />

      <div className={styles.subjectCards}>
        <Card className={styles.subjectCard}>
          <div className={styles.subjectHeader}>
            <h3>수학</h3>
            <Users size={24} />
          </div>
          <div className={styles.subjectStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>교사</span>
              <span className={styles.statValue}>523명</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>학생</span>
              <span className={styles.statValue}>8,234명</span>
            </div>
          </div>
          <button className={styles.detailBtn}>상세보기 →</button>
        </Card>

        <Card className={styles.subjectCard}>
          <div className={styles.subjectHeader}>
            <h3>영어</h3>
            <Users size={24} />
          </div>
          <div className={styles.subjectStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>교사</span>
              <span className={styles.statValue}>87명</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>학생</span>
              <span className={styles.statValue}>1,456명</span>
            </div>
          </div>
          <button className={styles.detailBtn}>상세보기 →</button>
        </Card>
      </div>

      <Card>
        <h2 className={styles.sectionTitle}>
          <Globe size={20} />
          지역별 TOP 5
        </h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>순위</th>
                <th>지역</th>
                <th>학교수</th>
                <th>활성화율</th>
                <th>주간접속</th>
              </tr>
            </thead>
            <tbody>
              {regionalData.map((row) => (
                <tr key={row.rank}>
                  <td className={styles.rank}>
                    {row.rank === 1 && '🥇'}
                    {row.rank === 2 && '🥈'}
                    {row.rank === 3 && '🥉'}
                    {row.rank > 3 && row.rank}
                  </td>
                  <td className={styles.region}>{row.region}</td>
                  <td>{row.schools}개</td>
                  <td>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${row.activeRate}%` }}
                      />
                      <span className={styles.progressText}>{row.activeRate}%</span>
                    </div>
                  </td>
                  <td className={styles.access}>{row.weeklyAccess.toLocaleString()}회</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className={styles.sectionTitle}>
          <Calendar size={20} />
          접속 시간대 히트맵
        </h2>

        <div className={styles.heatmap}>
          <div className={styles.heatmapGrid}>
            <div className={styles.heatmapHeader}>
              <div className={styles.timeLabel}></div>
              {['00', '04', '08', '12', '16', '20'].map(time => (
                <div key={time} className={styles.timeLabel}>{time}</div>
              ))}
            </div>

            {heatmapData.map(row => (
              <div key={row.day} className={styles.heatmapRow}>
                <div className={styles.dayLabel}>{row.day}</div>
                <div
                  className={styles.heatCell}
                  style={{ backgroundColor: getHeatColor(row.h00) }}
                  title={`${row.day} 00시: ${row.h00}%`}
                />
                <div
                  className={styles.heatCell}
                  style={{ backgroundColor: getHeatColor(row.h04) }}
                  title={`${row.day} 04시: ${row.h04}%`}
                />
                <div
                  className={styles.heatCell}
                  style={{ backgroundColor: getHeatColor(row.h08) }}
                  title={`${row.day} 08시: ${row.h08}%`}
                />
                <div
                  className={styles.heatCell}
                  style={{ backgroundColor: getHeatColor(row.h12) }}
                  title={`${row.day} 12시: ${row.h12}%`}
                />
                <div
                  className={styles.heatCell}
                  style={{ backgroundColor: getHeatColor(row.h16) }}
                  title={`${row.day} 16시: ${row.h16}%`}
                />
                <div
                  className={styles.heatCell}
                  style={{ backgroundColor: getHeatColor(row.h20) }}
                  title={`${row.day} 20시: ${row.h20}%`}
                />
              </div>
            ))}
          </div>

          <div className={styles.heatmapInsight}>
            📌 08-16시 집중, 수업시간 패턴 명확
          </div>
        </div>
      </Card>

      <div className={styles.deviceGrid}>
        <Card>
          <h2 className={styles.sectionTitle}>
            <Monitor size={20} />
            브라우저 환경
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className={styles.sectionTitle}>
            <Monitor size={20} />
            OS/디바이스 환경
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={osData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {osData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

export default UsageAnalysis
