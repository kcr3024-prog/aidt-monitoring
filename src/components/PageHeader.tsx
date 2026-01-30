import { useState, useEffect } from 'react'
import { RefreshCw, Download, Printer, Filter } from 'lucide-react'
import DateRangePicker from './DateRangePicker'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  subtitle?: string
  onRefresh?: () => void
  onExport?: () => void
  onPrint?: () => void
  showDatePicker?: boolean
  onDateChange?: (startDate: string, endDate: string) => void
  autoRefreshInterval?: number
}

const PageHeader = ({
  title,
  subtitle,
  onRefresh,
  onExport,
  onPrint,
  showDatePicker = false,
  onDateChange,
  autoRefreshInterval = 0
}: PageHeaderProps) => {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(autoRefreshInterval > 0)

  useEffect(() => {
    if (autoRefresh && autoRefreshInterval > 0) {
      const interval = setInterval(() => {
        handleRefresh()
      }, autoRefreshInterval)

      return () => clearInterval(interval)
    }
  }, [autoRefresh, autoRefreshInterval])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    if (onRefresh) {
      await onRefresh()
    }
    setLastUpdated(new Date())
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.updateInfo}>
            <span className={styles.updateText}>마지막 업데이트: {formatTime(lastUpdated)}</span>
            {autoRefreshInterval > 0 && (
              <label className={styles.autoRefreshToggle}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span>자동 갱신 ({autoRefreshInterval / 1000}초)</span>
              </label>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          {showDatePicker && (
            <button
              className={styles.actionBtn}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              필터
            </button>
          )}

          {onRefresh && (
            <button
              className={`${styles.actionBtn} ${isRefreshing ? styles.refreshing : ''}`}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw size={18} className={isRefreshing ? styles.spinning : ''} />
              새로고침
            </button>
          )}

          {onExport && (
            <button className={styles.actionBtn} onClick={onExport}>
              <Download size={18} />
              내보내기
            </button>
          )}

          {onPrint && (
            <button className={styles.actionBtn} onClick={onPrint}>
              <Printer size={18} />
              인쇄
            </button>
          )}
        </div>
      </div>

      {showFilters && showDatePicker && onDateChange && (
        <div className={styles.filterSection}>
          <DateRangePicker onDateChange={onDateChange} />
        </div>
      )}
    </div>
  )
}

export default PageHeader
