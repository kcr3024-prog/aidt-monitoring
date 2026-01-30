import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  BarChart3,
  AlertCircle,
  FileText,
  ChevronDown
} from 'lucide-react'
import styles from './Layout.module.css'
import { useState } from 'react'

const Layout = () => {
  const location = useLocation()
  const [statsOpen, setStatsOpen] = useState(true)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h1>AIDT 모니터링</h1>
          <p>실시간 관제 서비스</p>
        </div>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>실시간 관제</span>
          </Link>

          <Link
            to="/uuid-search"
            className={`${styles.navItem} ${isActive('/uuid-search') ? styles.active : ''}`}
          >
            <Search size={20} />
            <span>UUID 검색</span>
          </Link>

          <div className={styles.navGroup}>
            <button
              className={styles.navGroupHeader}
              onClick={() => setStatsOpen(!statsOpen)}
            >
              <div className={styles.navGroupTitle}>
                <BarChart3 size={20} />
                <span>서비스 통계</span>
              </div>
              <ChevronDown
                size={16}
                className={`${styles.chevron} ${statsOpen ? styles.chevronOpen : ''}`}
              />
            </button>

            {statsOpen && (
              <div className={styles.navSubItems}>
                <Link
                  to="/stats/usage"
                  className={`${styles.navSubItem} ${isActive('/stats/usage') ? styles.active : ''}`}
                >
                  사용자 분석
                </Link>
                <Link
                  to="/stats/features"
                  className={`${styles.navSubItem} ${isActive('/stats/features') ? styles.active : ''}`}
                >
                  기능별 분석
                </Link>
                <Link
                  to="/stats/journey"
                  className={`${styles.navSubItem} ${isActive('/stats/journey') ? styles.active : ''}`}
                >
                  사용자 여정
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/errors"
            className={`${styles.navItem} ${isActive('/errors') ? styles.active : ''}`}
          >
            <AlertCircle size={20} />
            <span>오류 관리</span>
          </Link>

          <Link
            to="/logging"
            className={`${styles.navItem} ${isActive('/logging') ? styles.active : ''}`}
          >
            <FileText size={20} />
            <span>로깅 체크</span>
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
