import { useState } from 'react'
import { Calendar } from 'lucide-react'
import styles from './DateRangePicker.module.css'

interface DateRangePickerProps {
  onDateChange: (startDate: string, endDate: string) => void
}

const DateRangePicker = ({ onDateChange }: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleApply = () => {
    if (startDate && endDate) {
      onDateChange(startDate, endDate)
    }
  }

  const setQuickRange = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)

    const endStr = end.toISOString().split('T')[0]
    const startStr = start.toISOString().split('T')[0]

    setStartDate(startStr)
    setEndDate(endStr)
    onDateChange(startStr, endStr)
  }

  return (
    <div className={styles.container}>
      <div className={styles.quickButtons}>
        <button onClick={() => setQuickRange(7)} className={styles.quickBtn}>
          최근 7일
        </button>
        <button onClick={() => setQuickRange(30)} className={styles.quickBtn}>
          최근 30일
        </button>
        <button onClick={() => setQuickRange(90)} className={styles.quickBtn}>
          최근 90일
        </button>
      </div>

      <div className={styles.datePickers}>
        <div className={styles.inputGroup}>
          <Calendar size={16} className={styles.icon} />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.dateInput}
          />
        </div>

        <span className={styles.separator}>~</span>

        <div className={styles.inputGroup}>
          <Calendar size={16} className={styles.icon} />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.dateInput}
          />
        </div>

        <button onClick={handleApply} className={styles.applyBtn}>
          적용
        </button>
      </div>
    </div>
  )
}

export default DateRangePicker
