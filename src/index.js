const dialogflow = require('dialogflow');
const { withProps } = require('bottender');

const { FindNextGame, FindTodayGame } = require('./operation');

const PROJECT_ID = process.env.GOOGLE_APPLICATION_PROJECT_ID;

const sessionClient = new dialogflow.SessionsClient();

async function Unknown(context) {
  await context.sendText('您輸入的內容我不懂哦~🏀');
}

module.exports = async function App(context) {
  if (context.event.isText) {
    const sessionPath = sessionClient.sessionPath(
      PROJECT_ID,
      context.session.id
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: context.event.text,
          languageCode: 'zh-tw',
        },
      },
      queryParams: {
        timeZone: 'Asia/Taipei',
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const { intent } = responses[0].queryResult;

    if (intent.displayName === 'fubon-next-game') {
      return withProps(FindNextGame, { name: '富邦' });
    } else if (intent.displayName === 'dreamer-next-game') {
      return withProps(FindNextGame, { name: '夢想家' });
    } else if (intent.displayName === 'dreamer-current-game') {
      return withProps(FindTodayGame, { name: '夢想家' });
    } else if (intent.displayName === 'fubon-current-game') {
      return withProps(FindTodayGame, { name: '富邦' });
    }

    return Unknown;
  }
};
