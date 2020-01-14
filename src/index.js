const dialogflow = require('@bottender/dialogflow');
const { chain, withProps } = require('bottender');

const { FindNextGame, FindTodayGame } = require('./operation');

async function Unknown(context) {
  await context.sendText('您輸入的內容我不懂哦~🏀');
}

module.exports = async function App() {
  return chain([
    dialogflow({
      projectId: process.env.GOOGLE_APPLICATION_PROJECT_ID,
      languageCode: 'zh-tw',
      timeZone: 'Asia/Taipei',
      actions: {
        'fubon-current-game': withProps(FindTodayGame, { name: '富邦' }),
        'fubon-next-game': withProps(FindNextGame, { name: '富邦' }),
        'dreamer-current-game': withProps(FindTodayGame, { name: '夢想家' }),
        'dreamer-next-game': withProps(FindNextGame, { name: '夢想家' }),
      },
    }),
    Unknown,
  ]);
};
