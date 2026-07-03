// PDF 生成函數 - 簡化版本（使用打印功能）

export function generateDiaryPDF(content, topic) {
  const topicNames = {
    logic: '圖像邏輯推理',
    language: '實用語文',
    math: '實用數學',
  }

  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>小日記 - ${topicNames[topic]}</title>
      <style>
        body {
          font-family: 'Microsoft JhengHei', Arial, sans-serif;
          margin: 0;
          padding: 10mm;
        }
        @page {
          size: A4 landscape;
          margin: 10mm;
        }
        .diary-box {
          width: 180mm;
          height: 70mm;
          border: 2px solid #333;
          padding: 10mm;
          margin-bottom: 10mm;
          box-sizing: border-box;
          page-break-after: always;
          font-size: 12px;
          line-height: 1.6;
          font-family: 'Microsoft JhengHei', sans-serif;
        }
        .diary-box h3 {
          margin: 0 0 8px 0;
          font-size: 14px;
        }
        .diary-box pre {
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-size: 11px;
        }
      </style>
    </head>
    <body>
      <div class="diary-box">
        <h3>小日記 - ${topicNames[topic]}</h3>
        <pre>${content}</pre>
      </div>
      <script>
        window.print();
        window.close();
      </script>
    </body>
    </html>
  `)
  printWindow.document.close()
}

export function generateWorksheetPDF(content, subject, types) {
  const subjectNames = {
    language: '實用語文',
    math: '實用數學',
    social: '社會適應 / 職業認知',
  }

  const today = new Date().toLocaleDateString('zh-TW')

  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>學習單 - ${subjectNames[subject]}</title>
      <style>
        body {
          font-family: 'Microsoft JhengHei', Arial, sans-serif;
          margin: 0;
          padding: 20mm;
          line-height: 1.8;
        }
        @page {
          size: A4 portrait;
          margin: 20mm;
        }
        h1 {
          text-align: center;
          margin-bottom: 10px;
          font-size: 24px;
        }
        .date {
          text-align: center;
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        hr {
          margin-bottom: 20px;
          border: 1px solid #ccc;
        }
        .content {
          font-size: 14px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      </style>
    </head>
    <body>
      <h1>${subjectNames[subject]} 學習單</h1>
      <p class="date">出題日期：${today}</p>
      <hr>
      <div class="content">${content}</div>
      <script>
        window.print();
        window.close();
      </script>
    </body>
    </html>
  `)
  printWindow.document.close()
}

export function generateWorksheetWord(content, subject, types) {
  // 簡單的 Word 生成（使用 docx 庫）
  const subjectNames = {
    language: '實用語文',
    math: '實用數學',
    social: '社會適應 / 職業認知',
  }

  const today = new Date().toLocaleDateString('zh-TW')
  const filename = `學習單_${subjectNames[subject]}_${new Date().toISOString().split('T')[0]}.docx`

  // 創建簡單的 HTML 並用瀏覽器下載
  // 這是一個簡化版本，實際上應該使用 docx 庫
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Microsoft JhengHei'; margin: 20px; }
        h1 { text-align: center; }
        .date { text-align: center; color: #666; }
        pre { white-space: pre-wrap; word-wrap: break-word; line-height: 1.8; }
      </style>
    </head>
    <body>
      <h1>${subjectNames[subject]} 學習單</h1>
      <p class="date">出題日期：${today}</p>
      <hr>
      <pre>${content}</pre>
    </body>
    </html>
  `

  // 簡單下載為 HTML（可由用戶用 Word 打開）
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.replace('.docx', '.html')
  link.click()
  URL.revokeObjectURL(url)
}
