export function getDate() {
  let date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}${month}${day}`;
}

export function processData(games){
  const graphData = games.map(game => (
    {
      homeTeam: game.game.homeTeam.Abbreviation, 
      goalsFor: parseInt(game.stats.GoalsFor["#text"]),
      goalsAgainst: parseInt(game.stats.GoalsAgainst["#text"]),
    }
  ));
  console.log(games);
  return graphData;
}