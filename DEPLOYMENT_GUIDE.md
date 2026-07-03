# 🚀 部署到 GitHub Pages 完整指南

## ✅ 部署檢查清單

### 前置準備
- [ ] 已安裝 Git（檢查：`git --version`）
- [ ] 有 GitHub 帳號（沒有就[免費註冊](https://github.com/signup)）
- [ ] 已執行 `npm install`
- [ ] 已執行 `npm run build` 成功

### 部署步驟

#### 1️⃣ 建立 GitHub 倉庫

訪問 https://github.com/new

| 欄位 | 值 |
|------|-----|
| Repository name | `learning-material-generator` |
| Description | Special education material generator |
| Visibility | **Public** ✓ |
| Add .gitignore | No (已有) |
| Add license | No |

點擊 **「Create repository」**

---

#### 2️⃣ 連結本地倉庫到 GitHub

**在 PowerShell 中執行：**

```powershell
cd "D:\學習單製作網"
```

**複製下面的命令，用你的 GitHub 使用者名稱和倉庫 URL 替換：**

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/learning-material-generator.git
git push -u origin main
```

**範例（用你的真實 URL）：**
```powershell
git branch -M main
git remote add origin https://github.com/john-doe/learning-material-generator.git
git push -u origin main
```

系統會提示你登入 GitHub。使用你的帳號和密碼（或 Personal Access Token）。

---

#### 3️⃣ 啟用 GitHub Pages

1. 打開你的倉庫：`https://github.com/YOUR_USERNAME/learning-material-generator`
2. 點擊上方的 **「Settings」**標籤
3. 左側選單找到 **「Pages」**
4. 在 **「Source」** 下拉選單中選 **「GitHub Actions」**
5. 系統會自動部署（檢查 **「Actions」**標籤看進度）

---

#### 4️⃣ 等待部署完成

- 第一次部署需要 1-3 分鐘
- 在 **Actions** 標籤可以看到部署進度
- 綠色 ✅ 表示成功，紅色 ❌ 需要檢查日誌

---

#### 5️⃣ 訪問你的網站！

部署完成後，訪問：

```
https://YOUR_USERNAME.github.io/learning-material-generator
```

**例子：**
```
https://john-doe.github.io/learning-material-generator
```

---

## 🔄 更新網站

每次有修改時，執行：

```powershell
cd "D:\學習單製作網"
git add .
git commit -m "更新說明"
git push
```

GitHub Actions 會自動重新部署！

---

## 🆘 常見問題

### Q: Git push 失敗，說「permission denied」？

**A:** 使用 Personal Access Token 替代密碼：

1. 訪問 https://github.com/settings/tokens
2. 點擊 **「Generate new token」**
3. 選擇 **「Personal access tokens (classic)」**
4. 勾選 `repo` 和 `workflow`
5. 複製 token
6. 重新 push 時，用 token 作為密碼

### Q: 網站還是看不到頁面？

**A:** 檢查以下幾點：

1. 倉庫是否為 **Public**？
2. Actions 標籤是否顯示綠色 ✅？
3. 倉庫設定的 Pages Source 是否設為 **GitHub Actions**？
4. 給 GitHub 1-2 分鐘時間部署

### Q: 如何修改網站網址？

**A:** 如果你有自己的網域，可以在 Settings → Pages 中設定自訂網域。

### Q: 可以用其他部署方式嗎？

**A:** 可以！支援的方式：
- ✅ GitHub Pages（推薦 - 免費）
- ✅ Vercel（免費，更快）
- ✅ Netlify（免費）
- ✅ 自架伺服器

---

## 📝 部署完成後

網站部署完成後，你可以：

1. **分享連結給其他老師**
   ```
   https://YOUR_USERNAME.github.io/learning-material-generator
   ```

2. **每月更新試題**
   - 修改程式碼
   - `git push` 推送
   - 自動重新部署

3. **收集反饋意見**
   - GitHub Issues
   - Email
   - 或其他溝通方式

---

## 🎉 恭喜！

你現在擁有一個全功能的線上教材產生器，可以與全校特教老師分享使用！

---

**需要幫助？** 提出 Issue 或聯絡技術支援。
