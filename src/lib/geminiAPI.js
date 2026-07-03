const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

const DIARY_PROMPTS = {
  logic: `你是特教班老師。生成一份適合輕度到中度認知功能缺損學生的圖像邏輯推理小日記。

要求：
- 內容要適合 18cm × 7cm 的格子（約 150-200 字）
- 包含：日期、簡單圖像描述、推理題目（1-2 題）、答案欄
- 使用簡單詞彙（國小 1-3 年級認知程度）
- 題目要生活化、有趣
- 答題方式可以是：選擇、配對、簡單填空

格式：
【日期】___年___月___日 星期___

【圖像邏輯推理】
[簡單圖像描述]

【題目】
1. [推理題目]
   答案：_____

【答案】
1. [正確答案]`,

  language: `你是特教班老師。生成一份適合輕度到中度認知功能缺損學生的實用語文小日記。

要求：
- 內容要適合 18cm × 7cm 的格子（約 150-200 字）
- 包含：日期、生活情景描述、語文題目（1-2 題）、答案欄
- 使用簡單詞彙（國小 1-3 年級認知程度）
- 題目要生活化，如：日常用語、簡單對話、詞彙理解
- 答題方式：選擇、配對、簡單填空

格式：
【日期】___年___月___日 星期___

【生活情景】
[簡單情景描述]

【題目】
1. [語文題目]
   答案：_____

【答案】
1. [正確答案]`,

  math: `你是特教班老師。生成一份適合輕度到中度認知功能缺損學生的實用數學小日記。

要求：
- 內容要適合 18cm × 7cm 的格子（約 150-200 字）
- 包含：日期、生活中的數學情景、數學題目（1-2 題）、答案欄
- 使用簡單詞彙（國小 1-3 年級認知程度）
- 題目要生活化，如：購物、時間、數量、金錢計算
- 答題方式：選擇、填空（簡單計算）

格式：
【日期】___年___月___日 星期___

【生活情景】
[簡單生活情景]

【題目】
1. [數學題目]
   答案：_____

【答案】
1. [正確答案]`
}

const WORKSHEET_PROMPTS = {
  language: `你是特教班老師。生成一份實用語文學習單。

要求：
- 題目難度：國小 1-3 年級（少部分 4-6 年級）
- 語句：能理解單句，訓練複合句（因果、條件）
- 內容生活化、實用
- 包含完整答案卷

科目名稱：實用語文
適用對象：輕度到中度認知功能缺損特教生`,

  math: `你是特教班老師。生成一份實用數學學習單。

要求：
- 題目難度：國小 1-3 年級（少部分 4-6 年級）
- 範圍：基本計算、購物、時間、金錢、數量
- 內容生活化、實用
- 包含完整答案卷

科目名稱：實用數學
適用對象：輕度到中度認知功能缺損特教生`,

  social: `你是特教班老師。生成一份社會適應 / 職業認知學習單。

要求：
- 題目難度：國小 1-3 年級（少部分 4-6 年級）
- 範圍：日常禮儀、工作常識、生活技能、職業認知
- 內容生活化、實用
- 包含完整答案卷

科目名稱：社會適應 / 職業認知
適用對象：輕度到中度認知功能缺損特教生`
}

export async function generateDiaryContent(topic, apiKey) {
  const prompt = DIARY_PROMPTS[topic]

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    }),
    params: {
      key: apiKey
    }
  })

  const fullUrl = GEMINI_API_URL + `?key=${apiKey}`
  const apiResponse = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    })
  })

  if (!apiResponse.ok) {
    throw new Error(`API 請求失敗: ${apiResponse.statusText}`)
  }

  const data = await apiResponse.json()

  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text
  }

  throw new Error('無法生成內容')
}

export async function generateWorksheetContent({ subject, types, count, apiKey }) {
  const basePrompt = WORKSHEET_PROMPTS[subject]
  const typesList = {
    multiple: '選擇題',
    filling: '填空題',
    matching: '配對題',
    mixed: '混合題型'
  }

  const selectedTypes = types.map(t => typesList[t]).join('、')
  const fullPrompt = `${basePrompt}

請生成 ${count} 題，題目類型：${selectedTypes}

格式要求：
- 清晰編號（1. 2. 3.等）
- 對於選擇題，提供 A、B、C、D 四個選項
- 對於配對題，提供配對項目清單
- 題目後面明確標示「答案：」區域
- 最後單獨列出完整答案卷

請確保：
- 題目循序漸進，從簡單到稍複雜
- 答案明確、唯一
- 生活應用相關性高`

  const fullUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`

  const apiResponse = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: fullPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2000,
      }
    })
  })

  if (!apiResponse.ok) {
    throw new Error(`API 請求失敗: ${apiResponse.statusText}`)
  }

  const data = await apiResponse.json()

  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text
  }

  throw new Error('無法生成內容')
}
