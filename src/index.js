const dialogflow = require('dialogflow');
const { format } = require('date-fns'); 
const { find_next_game_by_team, find_current_game } = require('./operation')

const PROJECT_ID = process.env.GOOGLE_APPLICATION_PROJECT_ID;

const sessionClient = new dialogflow.SessionsClient();

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
    const { intent, parameters } = responses[0].queryResult;

    if (intent.displayName === 'fubon-next-game') {
      find_next_game_by_team(context, '富邦');
    } else if (intent.displayName === 'dreamer-next-game') {
      find_next_game_by_team(context, '夢想家');
    } else if (intent.displayName === 'dreamer-current-game') {
      find_current_game(context, '夢想家');
    } else if (intent.displayName === 'fubon-current-game') {
      find_current_game(context, '富邦');
    } else await context.sendText('您輸入的內容我不懂哦~🏀');
  }
};