const moment = require('moment');

const quickReply = require('./quickReply');
const fubonGames = require('./fubonGames.json');
const dreamerGames = require('./dreamerGames.json');

function selectTeam(team) {
  let name, games;
  if (team === '富邦') {
    name = '台北富邦勇士';
    games = fubonGames;
  } else {
    name = '寶島夢想家';
    games = dreamerGames;
  }
  return [name, games];
}
async function FindNextGame(context, { name }) {
  let now = moment().format('YYYY-MM-DD HH:mm');
  let [team, games] = selectTeam(name);
  // next game
  for (let index = 0; index < games.length; index++) {
    const game = games[index];
    if (now < game.time) {
      const lord = game.challenge.split('vs');
      await context.sendText(
        `【${name}下次賽程】(${lord[1] === team ? '主場' : '客場'})\n🏀 ${
          game.challenge
        }\n📍 ${game.location ? game.location : '查無此項'}\n⏰ ${game.time}`,
        quickReply([
          '富邦下一場',
          '夢想家下一場',
          '富邦今天賽程',
          '夢想家今日賽程',
        ])
      );
      return;
    }
  }
}

async function FindCurrentGame(context, { name }) {
  let now = moment().format('YYYY-MM-DD');
  let [team, games] = selectTeam(name);
  let today = true;
  for (let index = 0; index < games.length; index++) {
    const game = games[index];
    if (now === moment(game.time).format('YYYY-MM-DD')) {
      const lord = game.challenge.split('vs');
      await context.sendText(
        `【${name}今日賽程】(${lord[1] === team ? '主場' : '客場'})\n🏀 ${
          game.challenge
        }\n📍 ${game.location ? game.location : '查無此項'}\n⏰ ${game.time}`,
        quickReply([
          '富邦下一場',
          '夢想家下一場',
          '富邦今天賽程',
          '夢想家今日賽程',
        ])
      );
      today = false;
      break;
    }
  }
  if (today) {
    await context.sendText(
      `【${name}】今天沒有比賽哦！🏀`,
      quickReply([
        '富邦下一場',
        '夢想家下一場',
        '富邦今天賽程',
        '夢想家今日賽程',
      ])
    );
  }
}

module.exports = {
  FindNextGame,
  FindCurrentGame,
};
