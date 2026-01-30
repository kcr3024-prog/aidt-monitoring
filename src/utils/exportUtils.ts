export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert('내보낼 데이터가 없습니다.')
    return
  }

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header]
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToExcel = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert('내보낼 데이터가 없습니다.')
    return
  }

  const headers = Object.keys(data[0])
  let excelContent = '<table><thead><tr>'

  headers.forEach(header => {
    excelContent += `<th>${header}</th>`
  })
  excelContent += '</tr></thead><tbody>'

  data.forEach(row => {
    excelContent += '<tr>'
    headers.forEach(header => {
      excelContent += `<td>${row[header] !== null && row[header] !== undefined ? row[header] : ''}</td>`
    })
    excelContent += '</tr>'
  })
  excelContent += '</tbody></table>'

  const BOM = '\uFEFF'
  const blob = new Blob([BOM + excelContent], {
    type: 'application/vnd.ms-excel;charset=utf-8;'
  })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.xls`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const printReport = () => {
  window.print()
}
