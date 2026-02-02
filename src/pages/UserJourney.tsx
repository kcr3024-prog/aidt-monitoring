import { useState } from 'react'
import { Card } from '../components/Card'
import AIInsight from '../components/AIInsight'
import PageHeader from '../components/PageHeader'
import { ArrowRight, AlertTriangle, Lightbulb, Filter } from 'lucide-react'
import { exportToExcel, printReport } from '../utils/exportUtils'
import styles from './UserJourney.module.css'

const UserJourney = () => {
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const [subject, setSubject] = useState('all')
  const [target, setTarget] = useState('student')
  const [period, setPeriod] = useState('3months')
  const [customDateStart, setCustomDateStart] = useState('')
  const [customDateEnd, setCustomDateEnd] = useState('')

  // 주요 여정 패턴
  const allJourneys = [
    {
      name: '일반 학습 패턴',
      users: 2450,
      percentage: 34,
      path: '로그인 → 학생 홈 → GNB/교과서 → 목차 → 수업 컨텐츠 → 문제풀이',
      avgTime: '18분',
      completion: 67,
      subject: 'math',
      target: 'student'
    },
    {
      name: '과제 수행 패턴',
      users: 1832,
      percentage: 26,
      path: '로그인 → 수업 시작 알림 → GNB/과제 → 과제 안내 → 과제 수행 → 제출',
      avgTime: '12분',
      completion: 89,
      subject: 'all',
      target: 'student'
    },
    {
      name: '평가 응시 패턴',
      users: 1245,
      percentage: 17,
      path: '로그인 → 학생 홈 → 평가 현황 → 평가 안내 → 평가 응시 → 제출',
      avgTime: '25분',
      completion: 92,
      subject: 'math',
      target: 'student'
    },
    {
      name: 'AI 맞춤 학습 패턴',
      users: 892,
      percentage: 12,
      path: '로그인 → GNB/교과서 → AI 맞춤 학습 → 문제풀이 → 재출제 → 문제풀이',
      avgTime: '15분',
      completion: 43,
      subject: 'math',
      target: 'student'
    },
    {
      name: '스피킹 연습 패턴',
      users: 678,
      percentage: 9,
      path: '로그인 → GNB/교과서 → AI 스피킹 → 발음 연습 → 결과 확인',
      avgTime: '10분',
      completion: 72,
      subject: 'english',
      target: 'student'
    },
    {
      name: '수업 관리 패턴',
      users: 1120,
      percentage: 15,
      path: '로그인 → 교사 홈 → 수업자료실 → 수업진행 → 학생 관리',
      avgTime: '22분',
      completion: 85,
      subject: 'all',
      target: 'teacher'
    }
  ]

  // 필터 적용
  const topJourneys = allJourneys.filter(j => {
    const matchSubject = subject === 'all' || j.subject === 'all' || j.subject === subject
    const matchTarget = target === 'all' || j.target === target
    return matchSubject && matchTarget
  })

  // 여정 시각화 데이터
  const journeyFlow = {
    entry: { name: '로그인', users: 10000 },
    step1: [
      { name: '학생 홈', users: 4200, percentage: 42 },
      { name: 'GNB/교과서', users: 3500, percentage: 35 },
      { name: '수업 알림 클릭', users: 2300, percentage: 23 }
    ],
    step2: [
      { name: '과제/평가 현황', users: 3100, percentage: 74, parent: '학생 홈' },
      { name: '나의 이야기', users: 900, percentage: 21, parent: '학생 홈' },
      { name: '목차', users: 2800, percentage: 80, parent: 'GNB/교과서' },
      { name: 'AI 맞춤 학습', users: 500, percentage: 14, parent: 'GNB/교과서' },
      { name: '수업 화면', users: 1800, percentage: 78, parent: '수업 알림 클릭' }
    ],
    step3: [
      { name: '과제 수행', users: 2600, percentage: 84, parent: '과제/평가 현황' },
      { name: '수업 컨텐츠', users: 1900, percentage: 68, parent: '목차' },
      { name: '이탈', users: 900, percentage: 32, parent: '목차', critical: true }
    ]
  }

  // 이탈 지점 분석
  const dropOffPoints = [
    {
      point: '교과서 > 목차',
      dropCount: 900,
      dropRate: 32,
      prevStep: '목차 진입',
      severity: 'critical',
      nextAction: '다른 메뉴로 이동: 45% | 서비스 종료: 38% | 뒤로가기 후 재시도: 17%'
    },
    {
      point: '스스로학습 리포트',
      dropCount: 85,
      dropRate: 83,
      prevStep: '리포트 조회',
      severity: 'critical',
      nextAction: '서비스 종료: 65% | 다른 메뉴로 이동: 28% | 재조회: 7%'
    },
    {
      point: '수업진행',
      dropCount: 650,
      dropRate: 53,
      prevStep: '수업 종료',
      severity: 'warning',
      nextAction: '로그아웃: 52% | 다른 수업 시작: 31% | 추가 학습: 17%'
    }
  ]

  // 코호트별 여정 비교
  const cohortComparison = [
    {
      group: '신규 사용자 (첫 1주)',
      journey: '탐색 중심 (여러 메뉴 클릭)',
      avgSteps: 8.2,
      completion: 35,
      insight: '네비게이션을 어려워함'
    },
    {
      group: '활성 사용자',
      journey: '최단 경로 (바로 목적지)',
      avgSteps: 4.1,
      completion: 82,
      insight: '효율적으로 움직임'
    },
    {
      group: '이탈 위험 사용자',
      journey: '같은 곳 반복 방문',
      avgSteps: 3.5,
      completion: 18,
      insight: '목적을 찾지 못함'
    }
  ]

  // 비정상 여정
  const abnormalJourneys = [
    {
      pattern: '무한 루프 패턴',
      users: 235,
      description: '과제 안내 → 뒤로가기 → 과제 안내 → 뒤로가기 (반복)',
      cause: '과제 수행 버튼을 못 찾음'
    },
    {
      pattern: '즉시 이탈 패턴',
      users: 189,
      description: '로그인 → 교과서 목차 → 3초 내 이탈',
      cause: '원하는 단원을 못 찾음'
    },
    {
      pattern: '재시도 과다 패턴',
      users: 156,
      description: 'AI 맞춤 학습 → 재출제 → 재출제 → 재출제 (5회+)',
      cause: 'AI 품질 문제'
    }
  ]

  const aiInsights = [
    '신규 사용자는 평균 8.2단계를 거치며 완료율이 35%에 불과합니다. 온보딩 개선이 시급합니다.',
    '교과서>목차 이탈률 32%는 정보 구조 문제를 시사합니다. 검색 기능 추가를 권장합니다.',
    'AI 맞춤 학습 완료율 43%는 개선이 필요합니다. 난이도 선택 옵션 추가로 70% 달성 가능합니다.',
    '235명의 사용자가 무한 루프에 빠져있습니다. UI/UX 개선이 필요합니다.'
  ]

  const aiSuggestions = [
    {
      title: '교과서 > 목차 이탈률 32% 개선',
      actions: ['검색 기능 추가', '최근 본 단원 바로가기'],
      effect: '이탈률 10%p 감소'
    },
    {
      title: 'AI 맞춤 학습 완료율 43% → 70% 개선',
      actions: ['AI 출제 품질 개선', '난이도 선택 옵션 추가'],
      effect: '완료율 27%p 증가'
    },
    {
      title: '신규 사용자 온보딩 개선',
      actions: ['주요 여정 가이드 투어 추가'],
      effect: '신규 사용자 완료율 35% → 55%'
    }
  ]

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const handleExport = () => {
    const exportData = topJourneys.map(journey => ({
      패턴명: journey.name,
      사용자수: `${journey.users.toLocaleString()}명`,
      비율: `${journey.percentage}%`,
      경로: journey.path,
      평균시간: journey.avgTime,
      완료율: `${journey.completion}%`
    }))
    exportToExcel(exportData, '사용자_여정_분석')
  }

  return (
    <div className={styles.container}>
      <PageHeader
        title="사용자 여정 분석"
        subtitle="사용자 행동 패턴과 페이지 전환 흐름을 파악합니다"
        onRefresh={handleRefresh}
        onExport={handleExport}
        onPrint={printReport}
        showDatePicker={true}
        onDateChange={(start, end) => console.log('Date changed:', start, end)}
      />

      <AIInsight insights={aiInsights} />

      {/* AI 인사이트 제안 버튼 */}
      <Card>
        <button
          className={styles.suggestionBtn}
          onClick={() => setShowAISuggestions(!showAISuggestions)}
        >
          <Lightbulb size={18} />
          AI 인사이트 제안 보기
          <span className={styles.badge}>{aiSuggestions.length}개</span>
        </button>

        {showAISuggestions && (
          <div className={styles.suggestionsList}>
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className={styles.suggestionItem}>
                <div className={styles.suggestionHeader}>
                  <span className={styles.suggestionNum}>{index + 1}</span>
                  <h4>{suggestion.title}</h4>
                </div>
                <ul className={styles.suggestionActions}>
                  {suggestion.actions.map((action, i) => (
                    <li key={i}>- {action}</li>
                  ))}
                </ul>
                <div className={styles.suggestionEffect}>
                  예상 효과: {suggestion.effect}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 여정 필터 & 설정 */}
      <Card>
        <h3 className={styles.sectionTitle}>
          <Filter size={18} />
          여정 필터 & 설정
        </h3>
        <div className={styles.filterGroup}>
          <div className={styles.filterRow}>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>교과</label>
              <select
                className={styles.filterSelect}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="math">수학</option>
                <option value="english">영어</option>
              </select>
            </div>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>대상</label>
              <select
                className={styles.filterSelect}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="student">학생</option>
                <option value="teacher">교사</option>
              </select>
            </div>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>기간</label>
              <div className={styles.periodGroup}>
                <button
                  className={`${styles.periodBtn} ${period === '3months' ? styles.active : ''}`}
                  onClick={() => { setPeriod('3months'); setCustomDateStart(''); setCustomDateEnd(''); }}
                >
                  최근 3개월
                </button>
                <button
                  className={`${styles.periodBtn} ${period === '6months' ? styles.active : ''}`}
                  onClick={() => { setPeriod('6months'); setCustomDateStart(''); setCustomDateEnd(''); }}
                >
                  최근 6개월
                </button>
                <button
                  className={`${styles.periodBtn} ${period === 'custom' ? styles.active : ''}`}
                  onClick={() => setPeriod('custom')}
                >
                  직접 설정
                </button>
              </div>
            </div>
          </div>
          {period === 'custom' && (
            <div className={styles.filterRow}>
              <div className={styles.dateRange}>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={customDateStart}
                  onChange={(e) => setCustomDateStart(e.target.value)}
                />
                <span className={styles.dateSeparator}>~</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={customDateEnd}
                  onChange={(e) => setCustomDateEnd(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 주요 여정 패턴 */}
      <Card>
        <h2 className={styles.sectionTitle}>주요 여정 패턴 (Top Journeys)</h2>
        <p className={styles.sectionSubtitle}>가장 많이 사용되는 경로 Top 10</p>

        <div className={styles.journeyList}>
          {topJourneys.map((journey, index) => (
            <div key={index} className={styles.journeyItem}>
              <div className={styles.journeyHeader}>
                <div className={styles.journeyRank}>{index + 1}</div>
                <div className={styles.journeyInfo}>
                  <h4 className={styles.journeyName}>[{journey.name}]</h4>
                  <div className={styles.journeyMeta}>
                    {journey.users.toLocaleString()}명 ({journey.percentage}%)
                  </div>
                </div>
                <div className={styles.journeyCompletion}>
                  <span className={`${styles.completionBadge} ${journey.completion >= 80 ? styles.success : journey.completion >= 60 ? styles.warning : styles.danger}`}>
                    완료율 {journey.completion}%
                    {journey.completion >= 80 && ' ✅'}
                    {journey.completion < 60 && ' ⚠️'}
                  </span>
                </div>
              </div>
              <div className={styles.journeyPath}>{journey.path}</div>
              <div className={styles.journeyStats}>
                평균 소요 시간: {journey.avgTime}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 여정 시각화 */}
      <Card>
        <h2 className={styles.sectionTitle}>여정 시각화</h2>
        <p className={styles.sectionSubtitle}>전체 사용자 흐름을 한눈에</p>

        <div className={styles.sankeyDiagram}>
          {/* Entry Point */}
          <div className={styles.sankeyColumn}>
            <div className={styles.sankeyNode}>
              <div className={styles.sankeyNodeName}>{journeyFlow.entry.name}</div>
              <div className={styles.sankeyNodeCount}>{journeyFlow.entry.users.toLocaleString()}명</div>
            </div>
          </div>

          <div className={styles.sankeyArrow}>
            <ArrowRight size={24} />
          </div>

          {/* Step 1 */}
          <div className={styles.sankeyColumn}>
            {journeyFlow.step1.map((node, index) => (
              <div key={index} className={styles.sankeyNode}>
                <div className={styles.sankeyNodeName}>{node.name}</div>
                <div className={styles.sankeyNodeCount}>
                  {node.users.toLocaleString()}명 ({node.percentage}%)
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sankeyArrow}>
            <ArrowRight size={24} />
          </div>

          {/* Step 2 */}
          <div className={styles.sankeyColumn}>
            {journeyFlow.step2.map((node, index) => (
              <div key={index} className={styles.sankeyNode}>
                <div className={styles.sankeyNodeParent}>{node.parent}</div>
                <div className={styles.sankeyNodeName}>{node.name}</div>
                <div className={styles.sankeyNodeCount}>
                  {node.users.toLocaleString()}명 ({node.percentage}%)
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sankeyArrow}>
            <ArrowRight size={24} />
          </div>

          {/* Step 3 */}
          <div className={styles.sankeyColumn}>
            {journeyFlow.step3.map((node, index) => (
              <div
                key={index}
                className={`${styles.sankeyNode} ${node.critical ? styles.critical : ''}`}
              >
                <div className={styles.sankeyNodeParent}>{node.parent}</div>
                <div className={styles.sankeyNodeName}>{node.name}</div>
                <div className={styles.sankeyNodeCount}>
                  {node.users.toLocaleString()}명 ({node.percentage}%)
                  {node.critical && ' 🔴'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.note}>
          💡 클릭하면 상세 보기 | 각 노드(메뉴)를 클릭하면 해당 메뉴의 상세 정보 팝업 | 이탈한 사용자들이 어디로 갔는지 추적
        </div>
      </Card>

      {/* 이탈 지점 분석 */}
      <Card>
        <h2 className={styles.sectionTitle}>
          <AlertTriangle size={20} />
          이탈 지점 분석
        </h2>
        <p className={styles.sectionSubtitle}>사용자들이 어디서 많이 떠나는지</p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>이탈 지점</th>
                <th>이탈 인원</th>
                <th>이탈률</th>
                <th>이전 단계</th>
                <th>심각도</th>
                <th>이탈 후 행동</th>
              </tr>
            </thead>
            <tbody>
              {dropOffPoints.map((point, index) => (
                <tr key={index} className={styles[point.severity]}>
                  <td className={styles.bold}>{point.point}</td>
                  <td>{point.dropCount.toLocaleString()}명</td>
                  <td className={styles.bold}>{point.dropRate}%</td>
                  <td>{point.prevStep}</td>
                  <td>
                    <span className={`${styles.severityBadge} ${styles[point.severity]}`}>
                      {point.severity === 'critical' ? '🔴 높음' : '🟡 중간'}
                    </span>
                  </td>
                  <td className={styles.nextAction}>{point.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 코호트별 여정 비교 */}
      <Card>
        <h2 className={styles.sectionTitle}>코호트별 여정 비교</h2>
        <p className={styles.sectionSubtitle}>사용자 그룹별로 다른 패턴</p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>그룹</th>
                <th>주요 여정</th>
                <th>평균 단계 수</th>
                <th>완료율</th>
                <th>인사이트</th>
              </tr>
            </thead>
            <tbody>
              {cohortComparison.map((cohort, index) => (
                <tr key={index}>
                  <td className={styles.bold}>{cohort.group}</td>
                  <td>{cohort.journey}</td>
                  <td>{cohort.avgSteps}단계</td>
                  <td>
                    <span className={cohort.completion >= 70 ? styles.success : cohort.completion >= 40 ? styles.warning : styles.danger}>
                      {cohort.completion}%
                    </span>
                  </td>
                  <td className={styles.insight}>{cohort.insight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.insightBox}>
          <strong>인사이트:</strong><br />
          • 신규 사용자는 네비게이션을 어려워함 → 온보딩 개선 필요<br />
          • 활성 사용자는 효율적으로 움직임 → 이들의 패턴을 신규에게 가이드
        </div>
      </Card>

      {/* 비정상 여정 탐지 */}
      <Card>
        <h2 className={styles.sectionTitle}>
          <AlertTriangle size={20} />
          비정상 여정 탐지
        </h2>
        <p className={styles.sectionSubtitle}>예상과 다른 이상한 패턴들</p>

        <div className={styles.abnormalList}>
          {abnormalJourneys.map((item, index) => (
            <div key={index} className={styles.abnormalItem}>
              <div className={styles.abnormalHeader}>
                <h4>
                  <span className={styles.abnormalNum}>{index + 1}</span>
                  {item.pattern}
                </h4>
                <span className={styles.abnormalUsers}>{item.users}명</span>
              </div>
              <div className={styles.abnormalDesc}>{item.description}</div>
              <div className={styles.abnormalCause}>→ 원인: {item.cause}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default UserJourney
