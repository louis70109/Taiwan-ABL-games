# ABL 台灣隊賽程機器人 🇹🇼

這是我最近為了準備去 GDG Taichung 所做的 Side project，主要是因為最近看球賽看太多，因為賽程表都是固定的索性自己弄了一隻機器人出來查詢賽程。

主要用到下面兩個技術:
- [Bottender](https://github.com/Yoctol/bottender)
- Dialogflow: 負責分析使用者意圖

## 加入好友

<img height="200" border="0" alt="QRcode" src="https://i.imgur.com/WWcrP98.png">

<a href="https://line.me/R/ti/p/%40144vqxgp"><img height="50" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"></a>

## 準備
需要擁有 Dialogflow API 的 json key，若不知怎麼申請拿到的話可以參考[我的部落格](https://nijialin.com/2019/12/10/Bottender-x-Dialogflow-x-LINE/)

```
LINE_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
GOOGLE_APPLICATION_CREDENTIALS=
GOOGLE_APPLICATION_PROJECT_ID=
```
主要用到上述的四個 key，前兩個是 LINE bot 所需要的，後兩個則是 Dialogflow 的 Key。

## 本地端測試
```
yarn install
npx bottender dev --console
```
### 範例內容
- 富邦勇士下一場球賽
- 夢想家下次賽程何時
- 富邦今天的比賽
- 寶島夢想家今日賽程表

可以透過以上內容去對應測試，就會得到 Dialogflow 幫忙輸出的意圖。
