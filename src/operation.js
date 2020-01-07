const moment = require('moment');

const quickReply = require('./quickReply');

const TEAMS = {
  富邦: {
    name: '台北富邦勇士',
    games: require('./fubonGames.json'),
    streams: {
      lineToday: 'https://lin.ee/tWQDyfJ/fubon',
      camerabay: 'https://www.camerabay.tv/channel/ablfubon',
    },
  },
  夢想家: {
    name: '寶島夢想家',
    games: require('./dreamerGames.json'),
    streams: {
      lineToday: 'https://lin.ee/x1yx6T/dreamers',
      camerabay: 'https://www.camerabay.tv/channel/ablformosa',
    },
  },
};

function selectTeam(team) {
  return TEAMS[team] || {};
}

async function ReplyGameMessage(context, { team, subName, gameList }) {
  const isLord = gameList.challenge.split('vs')[1] === team.name;

  await context.sendText(
    `【${subName}下次賽程】(${isLord ? '主場' : '客場'})\n🏀 ${
      gameList.challenge
    }\n📍 ${gameList.location ? gameList.location : '查無此項'}\n⏰ ${
      gameList.time
    }\n\n👀 直播: \n${TEAMS[subName].streams.lineToday}\n${
      TEAMS[subName].streams.camerabay
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
  selectTeam,
  FindTodayGame,
  FindNextGame,
  ReplyGameMessage,
};
