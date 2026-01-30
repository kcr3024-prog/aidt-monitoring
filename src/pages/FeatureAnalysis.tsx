import { useState } from 'react'
import { Card, MetricCard } from '../components/Card'
import AIInsight from '../components/AIInsight'
import PageHeader from '../components/PageHeader'
import {
  AlertTriangle, CheckCircle,
  Target, Sparkles, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react'
import { exportToExcel, printReport } from '../utils/exportUtils'
import styles from './FeatureAnalysis.module.css'

const FeatureAnalysis = () => {
  const [subjectFilter, setSubjectFilter] = useState<'math' | 'english' | 'all'>('all')
  const [userType, setUserType] = useState<'teacher' | 'student'>('teacher')
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  // 📊 1. 핵심 지표
  const topFeatures = [
    { feature: 'GNB/교과서>목차', usage: 41.9, bounce: 22.2, sessions: 4520 },
    { feature: 'GNB/평가', usage: 38.2, bounce: 18.5, sessions: 3896 },
    { feature: 'GNB/과제', usage: 35.1, bounce: 25.3, sessions: 3420 },
    { feature: '수업자료실', usage: 28.4, bounce: 15.2, sessions: 2890 },
    { feature: '학생 관리', usage: 24.7, bounce: 20.1, sessions: 2456 }
  ]

  const warningFeatures = [
    { feature: '교과서>목차', usage: 42, bounce: 35, status: 'warning', trend: '+5%' },
    { feature: '수업진행', usage: 15.5, bounce: 53, status: 'danger', trend: '-8%' }
  ]

  const criticalFeatures = [
    { feature: '스스로학습 리포트', usage: 0.9, bounce: 83, status: 'danger', action: '즉시 점검 필요' },
    { feature: '과제>새로만들기', usage: 6.4, bounce: 45, status: 'warning', action: 'UX 개선' }
  ]

  // 🔍 2. 메뉴별 상세 분석
  const menuAnalysis = [
    {
      menu: 'GNB/교과서',
      usage: 41.9,
      bounce: 22.2,
      status: '🟢 핵심',
      trend: '↗️ +5%',
      sessions: 4520,
      subMenus: [
        { name: '목차', usage: 35, bounce: 22, sessions: 3780 },
        { name: '학습하러가기', usage: 25, bounce: 18, sessions: 2700 },
        { name: '콘텐츠 조회', usage: 15, bounce: 20, sessions: 1620 }
      ]
    },
    {
      menu: 'GNB/과제',
      usage: 35.1,
      bounce: 25.3,
      status: '🟢 핵심',
      trend: '↗️ +3%',
      sessions: 3420,
      subMenus: [
        { name: '과제 안내', usage: 28, bounce: 12, sessions: 2856 },
        { name: '새로 만들기', usage: 6.4, bounce: 45, sessions: 653 },
        { name: '과제 상세', usage: 18, bounce: 15, sessions: 1836 }
      ]
    },
    {
      menu: '리포트 > 스스로학습',
      usage: 0.9,
      bounce: 83.3,
      status: '🔴 심각',
      trend: '↘️ -10%',
      sessions: 92,
      subMenus: []
    },
    {
      menu: '수업진행',
      usage: 15.5,
      bounce: 53,
      status: '⚠️ 개선필요',
      trend: '→ 0%',
      sessions: 1581,
      subMenus: []
    }
  ]

  // 🤖 3. AI 기능 분석
  const aiFeatures = [
    {
      name: 'AI 맞춤 학습',
      subject: '수학',
      target: '교사',
      sessions: 794,
      trend: '-27% ↘️',
      retryRate: 99,
      avgRetries: 6.6,
      status: '🔴 심각',
      priority: 1,
      action: '출제 알고리즘 전면 개선 필요'
    },
    {
      name: 'AI 총평/평어',
      subject: '수학',
      target: '교사',
      sessions: 74,
      trend: '-15% ↘️',
      retryRate: 80,
      avgRetries: 6.8,
      status: '🔴 심각',
      priority: 2,
      action: '평어 품질 및 다양성 개선'
    },
    {
      name: 'AI 출제(과제)',
      subject: '수학',
      target: '교사',
      sessions: 821,
      trend: '+39% ↗️',
      retryRate: 36,
      avgRetries: 3.3,
      status: '🟡 주의',
      priority: 3,
      action: '출제 옵션 세분화'
    },
    {
      name: 'AI 출제(평가)',
      subject: '수학',
      target: '교사',
      sessions: 456,
      trend: '+12% ↗️',
      retryRate: 26,
      avgRetries: 2.8,
      status: '🟡 주의',
      priority: 4,
      action: '모니터링 지속'
    },
    {
      name: 'AI 발음분석',
      subject: '영어',
      target: '학생',
      sessions: 1358,
      trend: '+566% ↗️',
      retryRate: 35,
      avgRetries: 0,
      status: '🔍 분석필요',
      priority: 5,
      action: '연습 vs 오류 구분 필요'
    }
  ]

  const aiInsights = [
    'AI 맞춤학습 재시도율 99%는 심각한 수준입니다. 출제 알고리즘의 난이도 조정 및 문제 다양성 개선이 시급합니다.',
    '교과서>목차 이탈률 35%는 사용자가 원하는 콘텐츠를 찾지 못하고 있음을 의미합니다. 목차 구조 개선이 필요합니다.',
    'AI 발음분석 사용량이 9월 대비 566% 급증했습니다. 사용자 수요가 높은 핵심 기능으로 자리잡고 있습니다.',
    '수학 과목 사용률이 62.4%로 영어(37.6%)보다 높지만, 영어의 이탈률이 더 높아 UX 개선이 필요합니다.'
  ]

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const handleExport = () => {
    const exportData = menuAnalysis.map(item => ({
      메뉴명: item.menu,
      사용률: `${item.usage}%`,
      이탈률: `${item.bounce}%`,
      상태: item.status,
      트렌드: item.trend,
      세션수: item.sessions
    }))
    exportToExcel(exportData, '기능별_분석')
  }

  const handleDateChange = (start: string, end: string) => {
    console.log('Date changed:', start, end)
  }

  const toggleMenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName)
  }

  return (
    <div className={styles.container}>
      <PageHeader
        title="기능별 분석"
        subtitle="메뉴 사용 패턴과 AI 기능 성과를 분석합니다"
        onRefresh={handleRefresh}
        onExport={handleExport}
        onPrint={printReport}
        showDatePicker={true}
        onDateChange={handleDateChange}
      />

      <AIInsight insights={aiInsights} />

      {/* 필터 */}
      <div className={styles.filterGroup}>
        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>교과:</span>
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
        </div>

        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>대상:</span>
          <div className={styles.filters}>
            <button
              className={`${styles.filterBtn} ${userType === 'teacher' ? styles.active : ''}`}
              onClick={() => setUserType('teacher')}
            >
              교사
            </button>
            <button
              className={`${styles.filterBtn} ${userType === 'student' ? styles.active : ''}`}
              onClick={() => setUserType('student')}
            >
              학생
            </button>
          </div>
        </div>
      </div>

      {/* 📊 1. 대시보드 Overview */}
      <Card>
        <h2 className={styles.sectionTitle}>
          <Target size={20} />
          기능 건강도 Overview
        </h2>

        <div className={styles.metricsGrid}>
          <MetricCard
            title="고사용률 기능"
            value={`${topFeatures.length}개`}
            subtitle="사용률 20% 이상"
            icon={<CheckCircle size={24} />}
            status="success"
          />
          <MetricCard
            title="주의 필요 기능"
            value={`${warningFeatures.length}개`}
            subtitle="고사용 + 고이탈"
            icon={<AlertTriangle size={24} />}
            status="warning"
          />
          <MetricCard
            title="심각 기능"
            value={`${criticalFeatures.length}개`}
            subtitle="이탈률 80% 이상"
            icon={<AlertTriangle size={24} />}
            status="danger"
          />
        </div>

        <div className={styles.topFeaturesGrid}>
          <div>
            <h3 className={styles.subTitle}>🟢 고사용률 + 저이탈률 Top 5</h3>
            <div className={styles.featureList}>
              {topFeatures.map((item, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureRank}>{index + 1}</div>
                  <div className={styles.featureInfo}>
                    <div className={styles.featureName}>{item.feature}</div>
                    <div className={styles.featureMeta}>
                      사용률 {item.usage}% · 이탈률 {item.bounce}% · {item.sessions.toLocaleString()}회
                    </div>
                  </div>
                  <div className={styles.featureStatus}>
                    <CheckCircle size={18} className={styles.successIcon} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.subTitle}>🔴 심각 기능 (즉시 개선 필요)</h3>
            <div className={styles.featureList}>
              {criticalFeatures.map((item, index) => (
                <div key={index} className={`${styles.featureItem} ${styles.critical}`}>
                  <div className={styles.featureRank}>!</div>
                  <div className={styles.featureInfo}>
                    <div className={styles.featureName}>{item.feature}</div>
                    <div className={styles.featureMeta}>
                      사용률 {item.usage}% · 이탈률 {item.bounce}%
                    </div>
                    <div className={styles.featureAction}>{item.action}</div>
                  </div>
                  <div className={styles.featureStatus}>
                    <AlertTriangle size={18} className={styles.dangerIcon} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 🔍 2. 메뉴별 상세 분석 */}
      <Card>
        <h2 className={styles.sectionTitle}>메뉴별 상세 분석</h2>

        <div className={styles.statusLegend}>
          <span>🟢 핵심: 고사용률 + 저이탈률</span>
          <span>🟡 주의: 중간 이탈률 (30~50%)</span>
          <span>🔴 심각: 고이탈률 (50%+)</span>
          <span>⚠️ 개선필요: 고사용률 + 고이탈률</span>
        </div>

        <div className={styles.menuTable}>
          {menuAnalysis.map((item, index) => (
            <div key={index} className={styles.menuRow}>
              <div className={styles.menuMain} onClick={() => item.subMenus.length > 0 && toggleMenu(item.menu)}>
                <div className={styles.menuInfo}>
                  {item.subMenus.length > 0 && (
                    <span className={styles.expandIcon}>
                      {expandedMenu === item.menu ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  )}
                  <span className={styles.menuName}>{item.menu}</span>
                  <span className={styles.menuStatus}>{item.status}</span>
                </div>
                <div className={styles.menuStats}>
                  <span>사용률: <strong>{item.usage}%</strong></span>
                  <span>이탈률: <strong>{item.bounce}%</strong></span>
                  <span>세션: <strong>{item.sessions.toLocaleString()}회</strong></span>
                  <span className={styles.menuTrend}>{item.trend}</span>
                  <button className={styles.detailBtn}>상세보기</button>
                </div>
              </div>

              {expandedMenu === item.menu && item.subMenus.length > 0 && (
                <div className={styles.subMenuList}>
                  {item.subMenus.map((sub, subIndex) => (
                    <div key={subIndex} className={styles.subMenuItem}>
                      <ArrowRight size={14} className={styles.arrowIcon} />
                      <span className={styles.subMenuName}>{sub.name}</span>
                      <span>사용률: {sub.usage}%</span>
                      <span>이탈률: {sub.bounce}%</span>
                      <span>{sub.sessions.toLocaleString()}회</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 🤖 3. AI 기능 분석 */}
      <Card>
        <h2 className={styles.sectionTitle}>
          <Sparkles size={20} />
          AI 기능 집중 분석
        </h2>

        <div className={styles.aiPrioritySection}>
          <h3 className={styles.subTitle}>🎯 우선순위 액션 리스트</h3>
          {aiFeatures.sort((a, b) => a.priority - b.priority).map((item, index) => (
            <div key={index} className={`${styles.aiPriorityItem} ${styles[item.status.includes('심각') ? 'critical' : item.status.includes('주의') ? 'warning' : 'normal']}`}>
              <div className={styles.aiPriorityRank}>{item.priority}순위</div>
              <div className={styles.aiPriorityInfo}>
                <div className={styles.aiPriorityHeader}>
                  <strong>{item.name}</strong>
                  <span className={styles.aiPriorityMeta}>
                    {item.subject} · {item.target} · {item.sessions.toLocaleString()}회 · {item.trend}
                  </span>
                </div>
                <div className={styles.aiPriorityMetrics}>
                  <span>재시도율: <strong className={item.retryRate >= 80 ? styles.danger : styles.warning}>{item.retryRate}%</strong></span>
                  {item.avgRetries > 0 && <span>평균 횟수: <strong>{item.avgRetries}회</strong></span>}
                  <span className={styles.aiStatus}>{item.status}</span>
                </div>
                <div className={styles.aiPriorityAction}>→ {item.action}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className={styles.subTitle}>AI 기능 활용도 테이블</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>AI 기능</th>
                <th>대상</th>
                <th>총 세션</th>
                <th>사용률 추이</th>
                <th>재시도율</th>
                <th>평균 횟수</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {aiFeatures.map((item, index) => (
                <tr key={index}>
                  <td className={styles.bold}>{item.name}</td>
                  <td>{item.subject} {item.target}</td>
                  <td>{item.sessions.toLocaleString()}</td>
                  <td className={item.trend.includes('↗️') ? styles.positive : styles.negative}>{item.trend}</td>
                  <td>
                    <span className={item.retryRate >= 80 ? styles.danger : item.retryRate >= 30 ? styles.warning : styles.success}>
                      {item.retryRate}%
                    </span>
                  </td>
                  <td>{item.avgRetries > 0 ? `${item.avgRetries}회` : '-'}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default FeatureAnalysis
