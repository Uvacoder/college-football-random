import axios from "axios"
export default async (req, res) => {

    const { body } = req;
    const team = body
    var currentYear = 2020
    var startYear = 0

  var url = "https://api.collegefootballdata.com/records?team=" + team
  await axios
    .get(url,{
        headers: {
            'Authorization': 'bearer sZuq+9VsXZ6DggGPyrOea2dLKndiG8VCK/bO1++yfv47YwQj2++R58P0xOyNYcnL',
            'Accept': 'application/json',
            "Access-Control-Allow-Credentials": 'true',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json'
        },
    })
    .then(({ data }) => {
       startYear = currentYear - data.length
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
    

    const startWeek = 1
    const endWeek = 17

    var season = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    var year = Math.floor(Math.random() * (currentYear - startYear + 1) + startYear);
  
    if(season === 1){ //regular season week decider
      season = "regular"
      var week = Math.floor(Math.random() * (endWeek - startWeek + 1) + startWeek);
    }
    if(season === 2){
      season = "postseason"
      if(year >= 2014){ //checking if playoff
         week = Math.floor(Math.random() * (3 - 1 + 1) + 1);
      }else { //before 2014 post season was one week only
         var week = 1
      }
    }
   



  var url = 'https://api.collegefootballdata.com/games?year=' + year + '&week=' + week + '&seasonType=' + season + '&team=' + team
  await axios
    .get(url,{
        headers: {
            'Authorization': 'bearer sZuq+9VsXZ6DggGPyrOea2dLKndiG8VCK/bO1++yfv47YwQj2++R58P0xOyNYcnL',
            'Accept': 'application/json',
            "Access-Control-Allow-Credentials": 'true',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json'
        },
    })
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}