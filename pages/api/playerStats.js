import axios from "axios"


export default async (req, res) => {

    const { body } = req;
    const holder = body
    console.log(holder)
    var teamArray = []
    teamArray = holder.split(",");
    console.log(teamArray)
    console.log(teamArray[0])
    var team = teamArray[0]
    var year = teamArray[1]
    var week = teamArray[2]
    var seasonType = teamArray[3]
    var teamID = teamArray[4]
    var teamIDInt = parseInt(teamID);


 
  var url = "https://api.collegefootballdata.com/games/players?year=" + year + "&week" + week + "&seasonType=" + seasonType + "&team=" + team + "&gameId=" + teamIDInt
  console.log(url)
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