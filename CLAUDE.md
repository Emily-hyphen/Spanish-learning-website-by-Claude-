# CLAUDE.md — 西班牙文學習網站（Español para hablantes de chino）

> AI 在新增或修改任何內容前，請先完整閱讀本文件。本文件是這個專案的唯一規則來源。

## 1. 專案目的

- 做一個給**華語母語者**使用的西班牙文自學網站，程度從**零基礎 A1 到 B1**。
- 最終目標：學習者學完後，能**自己說出完整的句子**，而不只是背單字。
- 內容涵蓋：發音、問候語、數字、動詞變化、日常對話片語、文法。
- 所有西班牙文內容**都必須附上英文對照**，並以繁體中文作為主要說明語言。
- 網站要能直接部署在 GitHub Pages，不需要後端、不需要打包工具。

## 2. 技術限制

- 只使用純 **HTML + CSS + JavaScript**（不用框架、不用 npm build）。
- 不使用外部 API 金鑰。發音使用瀏覽器內建的 **Web Speech API**（`speechSynthesis`），語言代碼 `es-ES`（備用 `es-MX`）。
- 外部資源盡量不用；字體使用系統字體堆疊，不載入網路字體。
- 所有頁面必須在手機與桌機都能正常瀏覽（responsive）。
- 用繁體中文（台灣用語）撰寫說明文字；程式碼註解可用繁體中文。

## 3. 專案結構與命名規則

```
/
├── CLAUDE.md                  # 本文件
├── README.md                  # 專案簡介與線上網址
├── index.html                 # 首頁：課程目錄（依 A1 / A2 / B1 分組）
├── data/
│   └── lessons.json           # 課程清單（首頁目錄由此產生）
├── assets/
│   ├── css/style.css          # 全站唯一樣式表
│   └── js/
│       ├── tts.js             # 發音按鈕（朗讀、慢速、重複）
│       ├── quiz.js            # 小測驗邏輯
│       └── main.js            # 共用功能（導覽、目錄載入）
└── lessons/
    ├── _template.html         # 新課程一律複製這份
    └── a1-01-pronunciation.html
```

- 課程檔名格式：`{等級}-{兩位數編號}-{英文主題}.html`，全小寫、用連字號。
  例：`a1-03-numbers.html`、`a2-05-past-tense.html`、`b1-02-subjunctive.html`。
- 不使用中文或空格作為檔名。
- 新增課程後，**必須同步更新** `data/lessons.json`，否則首頁不會顯示。
- 課程頁 `<body>` 必須有 `data-root="../"` 與 `data-lesson="檔名（不含 .html）"`；頁尾放 `<nav class="lesson-nav" id="lesson-nav"></nav>`，由 `main.js` 自動產生上一課／下一課。
- `lessons.json` 每筆欄位：`level`、`num`、`file`、`zh`、`en`、`ready`（課程完成才設為 `true`，否則首頁顯示「即將推出」）。
- 圖片（若有）放在 `assets/img/`，檔名全小寫英文。

## 4. 課程清單規劃（可持續擴充）

**A1（零基礎）**
1. 發音與字母（pronunciation）
2. 問候語與自我介紹（greetings）
3. 數字 0–100（numbers）
4. 名詞的性與數、冠詞（nouns-articles）
5. ser 與 estar（ser-estar）
6. 現在式規則動詞 -ar / -er / -ir（present-regular）
7. 家人與描述人物（family-adjectives）
8. 時間、星期、月份、日期（time-dates）
9. 點餐與購物（food-shopping）
10. 問路與交通（directions）
11. 不規則動詞 tener / ir / hacer（present-irregular）
12. A1 複習與綜合測驗（a1-review）

**A2**
1. 反身動詞與日常作息（reflexive-routine）
2. 完成式 pretérito perfecto（present-perfect）
3. 簡單過去式 pretérito indefinido（preterite）
4. 未完成過去式 imperfecto（imperfect）
5. 過去式比較：indefinido vs. imperfecto（past-compare）
6. 直接與間接受詞代名詞（object-pronouns）
7. 未來式與 ir a + 原形（future）
8. 比較級與最高級（comparatives）
9. 旅行與訂房（travel-hotel）
10. 健康與看醫生（health）
11. 命令式（imperative）
12. A2 複習與綜合測驗（a2-review）

**B1**
1. 虛擬式現在式入門（subjunctive-present）
2. 表達情感與願望（emotions-wishes）
3. 條件式（conditional）
4. 過去完成式（past-perfect）
5. si 條件句（if-clauses）
6. 關係代名詞（relative-pronouns）
7. 被動語態與 se 的用法（passive-se）
8. 連接詞與銜接語（connectors）
9. 表達意見與討論（opinions）
10. 工作與面試（work）
11. B1 綜合複習與模擬測驗（b1-review）

## 5. 每一課的固定格式（不可省略、順序不可更動）

每個課程頁面必須依序包含下列 5 個區塊，並使用 `_template.html` 中已定義的 HTML 結構與 class：

1. **學習目標（`section.objectives`）**
   - 3–5 條，以「學完後你可以……」開頭，要具體、可驗證。
2. **單字表（`section.vocab`）**
   - 表格欄位固定：西班牙文｜發音按鈕｜詞性（含陰陽性）｜中文｜English。
   - 每課 10–20 個單字；名詞必須標示性別（m. / f.），並標示冠詞。
3. **例句（`section.examples`）**
   - 每課 6–10 句，每句包含：西班牙文、發音按鈕、中文、English。
   - 例句必須使用本課單字與文法，並避免過於生硬的課本句子，優先使用日常真的會說的話。
4. **文法重點（`section.grammar`）**
   - 用繁體中文說明規則，並與華語對比（例如華語沒有名詞性別、沒有動詞變位）。
   - 動詞變位一律用表格呈現：yo / tú / él·ella·usted / nosotros / vosotros / ellos·ellas·ustedes。
   - 每個規則至少配 2 個例句，每句附中文與 English。
   - 易錯點用 `div.tip` 標示。
5. **小練習（`section.practice`）**
   - 至少 5 題互動測驗，題型可混合：選擇題、填空題、聽力題（點發音按鈕後選答案）。
   - 答題後立即顯示對錯與簡短解釋。
   - 測驗資料寫在頁面內的 `<script type="application/json" id="quiz-data">`，由 `quiz.js` 讀取。

> 發音課（a1-01）與複習課可以調整第 2、4 區塊的內容形式，但仍需保留 5 個區塊標題。

## 6. 西班牙文內容規則

- 所有西班牙文必須使用正確**重音符號與特殊符號**：á é í ó ú ñ ü ¿ ¡。疑問句與感嘆句要有開頭的倒問號 ¿ 與倒驚嘆號 ¡。
- 以**拉丁美洲與西班牙通用**的說法為主；若兩地用法不同，用 `div.tip` 註明（例如 vosotros 在西班牙使用、拉美多用 ustedes）。
- 每個西班牙文詞句旁都要有**中文**與 **English** 對照。
- 難度控制：A1 課程只使用 A1 已教過的單字與文法；後面的課程可以使用前面教過的內容，但不要突然出現未教過的難詞。若必須出現，要加註解。
- 不確定的語言知識（例如罕見用法、地區差異）不要編造；寧可省略或標註「請再查證」。
- 文化小知識可以用 `div.culture` 加入，每課最多 1–2 則。

## 7. 發音與互動規則

- 每個西班牙文單字、例句旁都要有發音按鈕：`<button class="speak" data-text="Buenos días">🔊</button>`。
- 發音按鈕要支援：
  - 點一次：正常速度朗讀
  - 長按或旁邊的 🐢 按鈕：慢速朗讀（rate 約 0.6）
  - 重複聆聽：可連續點擊重播
- `tts.js` 要自動挑選西班牙文語音；若瀏覽器沒有西班牙文語音，要顯示提示「你的瀏覽器可能不支援西班牙文發音」，而不是讓頁面壞掉。
- 小測驗不使用 `<form>` 的預設送出；改用按鈕事件處理。
- 不使用 `localStorage` 以外的儲存方式；若要記錄進度，只用 `localStorage`，並要處理讀取失敗的情況。

## 8. 視覺風格

- 整體風格：**簡潔、明亮、留白多、閱讀舒適**。
- 色彩使用 CSS 變數，定義在 `style.css` 的 `:root`：
  - `--bg`：近白底（例如 `#fafaf7`）
  - `--text`：深灰（例如 `#222`）
  - `--primary`：主色，西班牙風格的暖紅或橘紅（例如 `#c8452b`）
  - `--accent`：輔助色，柔和黃（例如 `#f2b84b`）
  - 不要在課程頁面中直接寫死顏色，一律使用變數。
- 字體：系統字體堆疊，中文使用 `"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif`；內文行高 1.7 以上。
- 西班牙文用粗體或主色強調，中文用一般字重，English 用較淺的灰色與稍小字級，讓三種語言容易區分。
- 版面最大寬度約 800px，置中；手機版要可橫向捲動表格，不可讓頁面左右跑版。
- 支援深色模式（`prefers-color-scheme: dark`）為加分項。
- 每頁頂部要有導覽列（回首頁），底部要有「上一課／下一課」連結。

## 9. AI 修改與新增內容時的規則

1. **新增課程**：複製 `lessons/_template.html`，依第 5 節格式填入內容，並更新 `data/lessons.json`（該課 `ready` 改為 `true`）；上一課／下一課由 `main.js` 依此自動產生。
2. **不要擅自修改**共用檔案（`style.css`、`tts.js`、`quiz.js`、`main.js`）的既有功能；若需要新增功能，只能新增，不可破壞舊課程頁面。若必須修改，要先說明原因，並確認既有課程仍可正常運作。
3. **不要更動**每課 5 個區塊的順序與 class 名稱。
4. 一次只處理使用者要求的範圍，不要順手重寫其他課程。
5. 所有新增內容完成後，要自我檢查：
   - [ ] 5 個區塊齊全
   - [ ] 每個西班牙文都有中文與 English
   - [ ] 重音符號與 ¿ ¡ 正確
   - [ ] 發音按鈕可點擊
   - [ ] 測驗至少 5 題，答案與解釋正確
   - [ ] `lessons.json` 已更新
   - [ ] 檔名符合命名規則
   - [ ] 手機寬度下版面正常
6. 如果規則不夠明確或有衝突，先詢問使用者，不要自行猜測。
7. 完成後用繁體中文簡短回報：新增或修改了哪些檔案、哪些地方需要使用者再確認。

## 10. 部署與 Git 規則

- 部署方式：GitHub Pages，從 `main` 分支的根目錄發布。
- Commit 訊息格式：`類型: 簡短說明`，例如 `feat: 新增 A1-03 數字課程`、`fix: 修正 a1-02 重音符號`、`style: 調整手機版表格`。
- 每新增一課，使用一個 commit。
- 本地預覽：因為首頁用 `fetch` 讀取 `lessons.json`，請用本機伺服器開啟（例如 `python3 -m http.server`），不要直接用 `file://` 開啟。
- `README.md` 要放上線上網址與專案簡介。

## 11. 目前進度

- [x] 建立共用樣式與腳本（style.css、tts.js、quiz.js、main.js）
- [x] 建立 `_template.html`
- [x] 建立首頁 `index.html` 與 `lessons.json`
- [x] A1-01 發音與字母
- [x] A1-02 問候語與自我介紹
- [x] A1-03 數字 0–100
- [ ] 其餘課程依第 4 節清單陸續新增
