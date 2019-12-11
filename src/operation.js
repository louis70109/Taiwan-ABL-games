const fubonGames = require('./fubonGames.json');
const dreamerGames = require('./dreamerGames.json');
const moment = require('moment');
const quickReply = require('./quickReply');

function select_team(team) {
  let name, games;
  if (team === '富邦') {
    name = '台北富邦勇士';
    games = fubonGames;
  } else {
    name = '寶島夢想家';
    games = dreamerGames;
  }
  return name, games;
}
async function find_next_game_by_team(context, name) {
  let now = moment().format('YYYY-MM-DD HH:mm');
  let team, games = select_team(name);
  // next game
  for (let index = 0; index < games.length; index++) {
    const el = games[index];
    if (now < el.time) {
      const lord = el.challenge.split('vs');
      await context.sendText(
        `【${name}下次賽程】(${lord[1] === team ? "主場" : "客場"})\n🏀 ${el.challenge}\n📍 ${el.location ? el.location : "查無此項"}\n⏰ ${el.time}`,
        quickReply(['富邦下一場', '夢想家下一場', '富邦今天賽程', '夢想家今日賽程'])
      );
      break;
    }
  }
}

async function find_current_game(context, name) {
  let now = moment().format('YYYY-MM-DD');
  let team, games = select_team(name);
  let today = true;
  for (let index = 0; index < games.length; index++) {
    const el = games[index];
    if (now === moment(el.time).format('YYYY-MM-DD')) {
      const lord = el.challenge.split('vs');
      await context.sendText(
        `【${name}今日賽程】(${lord[1] === team ? "主場" : "客場"})\n🏀 ${el.challenge}\n📍 ${el.location ? el.location : "查無此項"}\n⏰ ${el.time}`,
        quickReply(['富邦下一場', '夢想家下一場', '富邦今天賽程', '夢想家今日賽程'])
      );
      today = false;
      break;
    }
  }
  if (today) {
    await context.sendText(
      `【${name}】今天沒有比賽哦！🏀`,
      quickReply(['富邦下一場', '夢想家下一場', '富邦今天賽程', '夢想家今日賽程'])
    );
  }
}

module.exports = {
  find_next_game_by_team,
  find_current_game,
};