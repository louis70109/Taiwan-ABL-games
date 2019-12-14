const sut = require('./operation');

test.each([
  ['富邦', '台北富邦勇士'],
  ['夢想家', '寶島夢想家'],
])('selectTeam; %s; %s', async (team, expected) => {
  // arrange

  // action
  const actual = sut.selectTeam(team);

  // assert
  expect(actual.name).toEqual(expected);
});
