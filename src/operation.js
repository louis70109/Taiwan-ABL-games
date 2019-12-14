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

  return {
    name: name,
    games: games,
  };
}

async function FindNextGame(context, { name }) {
  let now = moment();
  let team = selectTeam(name);

  const nextGame = team.games.find(game => now.isBefore(game.time));

  const isLord = nextGame.challenge.split('vs')[1] === team;
  await context.sendText(
    `【${team.name}下次賽程】(${isLord ? '主場' : '客場'})\n🏀 ${
      nextGame.challenge
    }\n📍 ${nextGame.location ? nextGame.location : '查無此項'}\n⏰ ${
      nextGame.time
    }`,
    quickReply(['富邦下一場', '夢想家下一場', '富邦今天賽程', '夢想家今日賽程'])
  );
}

async function FindTodayGame(context, { name }) {
  let now = moment();
  let team = selectTeam(name);

  const todayGame = team.games.find(game => now.isSame(game.time, 'day'));

  if (!todayGame) {
    await context.sendText(
      `【${team.name}】今天沒有比賽哦！🏀`,
      quickReply([
        '富邦下一場',
        '夢想家下一場',
        '富邦今天賽程',
        '夢想家今日賽程',
      ])
    );
    return;
  }

  const isLord = todayGame.challenge.split('vs')[1] === team;
  await context.sendText(
    `【${team.name}今日賽程】(${isLord ? '主場' : '客場'})\n🏀 ${
      todayGame.challenge
    }\n📍 ${todayGame.location ? todayGame.location : '查無此項'}\n⏰ ${
      todayGame.time
    }`,
    quickReply(['富邦下一場', '夢想家下一場', '富邦今天賽程', '夢想家今日賽程'])
  );
}

module.exports = {
  FindNextGame,
  FindTodayGame,
};
