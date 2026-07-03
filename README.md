# 📚 特教學習單與小日記產生器

一個為特教老師設計的 AI 驅動教材生成工具，可自動生成符合輕度至中度認知功能缺損學生需求的學習單和小日記。

## ✨ 功能特色

- **小日記產生器**：A4 橫切 4 等分（18cm × 7cm）
  - 圖像邏輯推理
  - 實用語文
  - 實用數學

- **學習單產生器**：A4 標準尺寸
  - 實用語文
  - 實用數學
  - 社會適應 / 職業認知

- **靈活的答題方式**
  - 選擇題
  - 填空題
  - 配對題
  - 混合題型

- **完整的答案卷**：每份教材都附答案，方便批改

- **多格式輸出**：PDF 和 Word 格式，方便編輯

## 🚀 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 開發模式
```bash
npm run dev
```
應用將在 `http://localhost:3000` 打開

### 3. 構建生產版本
```bash
npm run build
```

生成的文件在 `dist/` 目錄中

## 🔑 使用 Google Gemini API

本工具使用 Google Gemini API 來生成試題。

### 獲取 API 金鑰

1. 訪問 [Google AI Studio](https://ai.google.dev)
2. 點擊「Get API Key」
3. 建立新的 API 金鑰
4. 在應用中複製貼上金鑰

### API 配額

- Google Gemini 提供免費試用額度
- 初期可免費生成數千份試題
- 詳細定價見 [Google AI 定價](https://ai.google.dev/pricing)

## 📖 使用說明

### 小日記使用流程
1. 點擊首頁「小日記」按鈕
2. 選擇主題（圖像邏輯推理、實用語文或實用數學）
3. 點擊「生成小日記」
4. 輸入 Google Gemini API 金鑰
5. 查看預覽並下載 PDF

### 學習單使用流程
1. 點擊首頁「學習單」按鈕
2. 選擇科目（實用語文、實用數學或社會適應）
3. 選擇答題類型（可複選）
4. 設定題目數量（1-20 題）
5. 點擊「生成學習單」
6. 輸入 Google Gemini API 金鑰
7. 選擇下載格式（PDF 或 Word）

## 🛠️ 技術棧

- **React 18** - UI 框架
- **Vite** - 構建工具
- **Google Generative AI API** - 試題生成
- **GitHub Pages** - 部署平台

## 📦 部署到 GitHub Pages

### 1. 建立 GitHub 倉庫
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOU/learning-material-generator.git
git push -u origin main
```

### 2. 設定 GitHub Pages

在 `vite.config.js` 中設定 `base`：
```javascript
export default defineConfig({
  base: '/learning-material-generator/', // 如果倉庫不是個人網站
  // ...
})
```

### 3. 自動部署

創建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📝 試題質量

所有試題遵循以下標準：

- **難度等級**：國小 1-3 年級（少部分 4-6 年級）
- **識字量**：符合輕度至中度認知功能缺損
- **句式**：從單句到日常複合句
- **實用性**：與學生日常生活高度相關
- **定期更新**：每月更新時事相關題目

## 🤝 貢獻

歡迎提交改進建議！

## 📄 授權

MIT License - 可自由使用和分享

## 📧 聯絡方式

有任何問題或建議，歡迎提出 Issue 或 Pull Request。

---

祝各位特教老師教學順利！🎓
