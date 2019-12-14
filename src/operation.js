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

async function ReplyGameMessage(context, { team, subName, gameList }) {
  // gameType -> Next or Today
  const isLord = gameList.challenge.split('vs')[1] === team.name;

  await context.sendText(
    `【${subName}下次賽程】(${isLord ? '主場' : '客場'})\n🏀 ${
      gameList.challenge
    }\n📍 ${gameList.location ? gameList.location : '查無此項'}\n⏰ ${
      gameList.time
    }`,
    quickReply(['富邦下一場', '夢想家下一場', '富邦今天賽程', '夢想家今日賽程'])
  );
}

async function FindNextGame(context, { name }) {
  let now = moment();
  let team = selectTeam(name);

  const nextGame = team.games.find(game => now.isBefore(game.time));
  if (!nextGame) {
    await context.sendText(
      `【${name}】這季比賽結束囉！🏀`,
      quickReply([
        '富邦下一場',
        '夢想家下一場',
        '富邦今天賽程',
        '夢想家今日賽程',
      ])
    );
    return;
  }
  ReplyGameMessage(context, { team: team, subName: name, gameList: nextGame });
}

async function FindTodayGame(context, { name }) {
  let now = moment();
  let team = selectTeam(name);

  const todayGame = team.games.find(game => now.isSame(game.time, 'day'));

  if (!todayGame) {
    await context.sendText(
      `【${name}】今天沒有比賽哦！🏀`,
      quickReply([
        '富邦下一場',
        '夢想家下一場',
        '富邦今天賽程',
        '夢想家今日賽程',
      ])
    );
    return;
  }
  ReplyGameMessage(context, { team: team, subName: name, gameList: todayGame });
}

module.exports = {
  FindNextGame,
  FindTodayGame,
};
