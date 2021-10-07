import axios from "axios"


export default async (req, res) => {

    const { body } = req;
    const holder = body
    console.log(holder)
    var team = holder.substring(0, holder.indexOf(','));
    var splitter = ','
    var indexOf = holder.indexOf(splitter);
    var year = holder.slice(indexOf+splitter.length)



  var url = "https://api.collegefootballdata.com/records?year=" + year + "&team=" + team
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