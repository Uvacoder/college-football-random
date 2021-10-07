import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DropDown from '../components/DropDown.js'
import React, { useState, useEffect, useRef } from 'react';
import { Button, ButtonGroup } from "@chakra-ui/react"
import ReactPlayer from "react-player";
import img from '../public/cover.png'

import useSWR from 'swr'


export async function getStaticProps() {
  const res = await fetch('https://api.collegefootballdata.com/teams/fbs?year=2020', {
    headers: {
      'Authorization': 'bearer sZuq+9VsXZ6DggGPyrOea2dLKndiG8VCK/bO1++yfv47YwQj2++R58P0xOyNYcnL',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
})
  const data = await res.json()
  const filesObject  = new Array();
  for (let i=0; i < data.length; i++) {
      let file = {
          value: data[i].id,
          label: data[i].school,
          color: data[i].color
      };
      filesObject.push(file)
  }

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { filesObject }, // will be passed to the page component as props
  }
}




 function Home({filesObject}){
  const [selectedTeam, setSelectedTeam] = useState([{}]);
  const [selectedTeamName, setSelectedTeamName] = useState([]);

  const [gameInfo, setGameInfo] = useState([{}]);
  const [teamYearInfo, setTeamYearInfo] = useState([{}]);
  const [playerStats, setPlayerStats] = useState([{}]);
  const [ID, setID] = useState([{}]);

  const [week, setWeek] = useState(null)
  const [seasonType, setSeasonType] = useState(null)

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  const [away, setAway] = useState();
  const [awayScore, setAwayScore] = useState();
  const [home, setHome] = useState();
  const [homeScore, setHomeScore] = useState();

  const [venue, setVenue] = useState();
  const [YTurl, setYTurl] = useState(null);

  const [wins, setWins] = useState();
  const [losses, setLosses] = useState();
  const [total, setTotal] = useState();

 
  const [passing, setPassing] = useState({   
    home: {name: "", CATT: "", yards: "", TD: "", INT:""},
    away: {name: "", CATT: "", yards: "", TD: "", INT:""}
  });

  const [rushing, setRushing] = useState({   
    home: {name: "", car: "", rYards: "", avg: "", rTD:""},
    away: {name: "", car: "", rYards: "", avg: "", rTD:""}
  });

  const [receiving, setReceiving] = useState({
    home: {name: "", rec: "", recYards: "", TD: ""},
    away: {name: "", rec: "", recYards: "", TD: ""}
  });

  const [tackles, setTackles] = useState([]);

  const [confWi, setConfW] = useState([]);
  const [confL, setConfL] = useState([]);
  const [totalConf, settotalConf] = useState([]);

  const initialRender = useRef(true);
  const initialRender2 = useRef(true);
  const initialRender3 = useRef(true);
  const initialRender4 = useRef(true);

  






  const handleCallback = (selectedItems) =>{
      setSelectedTeam({selectedItems})
    
}

useEffect(() => {
  console.log(playerStats)
}, [playerStats])


  const getRandomGame = async () => {
    setPassing({   
      home: {name: "", CATT: "", yards: "", TD: "", INT:""},
      away: {name: "", CATT: "", yards: "", TD: "", INT:""}
    });

  setRushing({   
    home: {name: "", car: "", rYards: "", avg: "", rTD:""},
    away: {name: "", car: "", rYards: "", avg: "", rTD:""}
  });
  setReceiving({
    home: {name: "", rec: "", recYards: "", TD: ""},
    away: {name: "", rec: "", recYards: "", TD: ""}
  });
  setWins(null)
  setLosses(null)
  setTotal(null)

    var str = selectedTeam.selectedItems[0].label
    setSelectedTeamName(selectedTeam.selectedItems[0].label)
    str = str.replace(/^"|"$/g, '');
    str = str.replace(' ', '%20')
      const getRandom = await fetch('/api/getRandom', { method: 'POST', body: str })
      .then(res => (res.json()))
      .then(res => setGameInfo(res))
 }

 useEffect(() => {
  if (initialRender.current) {
    initialRender.current = false;
  }
  else{
    if (typeof Object.keys(gameInfo) !== 'undefined' && Object.keys(gameInfo).length > 0) {

          if (Object.keys(gameInfo.data).length === 0){
          var str = selectedTeam.selectedItems[0].label
          str = str.replace(/^"|"$/g, '');
          str = str.replace(' ', '%20')
          fetch('/api/getRandom', { method: 'POST', body: str })
          .then(res => res.json())
          .then(res => setGameInfo(res))
        }else
        {
          setWeek(gameInfo.data[0].week)
          setSeasonType(gameInfo.data[0].season_type)
          setYear(gameInfo.data[0].start_date.substring(0, 4))
          setMonth(gameInfo.data[0].start_date.substring(5, 7))
          setDay(gameInfo.data[0].start_date.substring(8, 10))
          setAway(gameInfo.data[0].away_team)
          setAwayScore(gameInfo.data[0].away_points)
          setHome(gameInfo.data[0].home_team)
          setHomeScore(gameInfo.data[0].home_points)
          setVenue(gameInfo.data[0].venue)
          setYTurl(gameInfo.data[0].highlights)
          setID(gameInfo.data[0].id)

        }
      }
    }
}, [gameInfo]);


 useEffect(() =>{
  if (initialRender2.current) {
    initialRender2.current = false;
    return null
  }
   if(year === null){
    return null
   }
   else{
     var str = []
    var temp = selectedTeam.selectedItems[0].label
    temp = temp.replace(/^"|"$/g, '');
    temp = temp.replace(' ', '%20')
    str.push(temp)
    str.push(year)

      fetch('/api/teamRecord', { method: 'POST', 
    body: str })
    .then(res => (res.json()))
    .then(res => setTeamYearInfo(res))

    str.push(week)
    str.push(seasonType)
    str.push(ID)
  
    fetch('/api/playerStats', { method: 'POST', 
    body: str })
    .then(r => (r.json()))
    .then(r => setPlayerStats(r))
   }
 },[year])


 useEffect(() => {
  if (initialRender3.current) {
    initialRender3.current = false;
  }
  else{
    if(teamYearInfo===null){
      return null
    }
     else{
      setTotal(teamYearInfo.data[0].total.games)
      setWins(teamYearInfo.data[0].total.wins)
      setLosses(teamYearInfo.data[0].total.losses)
   }
  }

 }, [teamYearInfo])

 useEffect(() => {
  if (initialRender4.current) {
    initialRender4.current = false;
  }
  else{
    if(playerStats===null){
      return null
    }
     else{
      if(playerStats.data.length === 0)
      {
        console.log('it null')
      }
      else{
      var homeStats = [] 
      var awayStats = []


      function isPassing(stat) {
        return stat.name === 'passing';
      }
      function isRushing(stat) {
        return stat.name === 'rushing';
      }
      function isCatching(stat) {
        return stat.name === 'receiving';
      }


      homeStats = playerStats.data[0].teams[0].categories
      awayStats = playerStats.data[0].teams[1].categories

      var homePassing = homeStats.find(isPassing);
      var awayPassing = awayStats.find(isPassing);
      var homeRunning = homeStats.find(isRushing);
      var awayRunning = awayStats.find(isRushing);
      var homeReceiving = homeStats.find(isCatching);
      var awayReceiving = awayStats.find(isCatching);


        setPassing({
            home: {
              name: homePassing.types[0].athletes[0].name,
              CATT: homePassing.types[0].athletes[0].stat, 
              yards: homePassing.types[1].athletes[0].stat,  
              TD: homePassing.types[3].athletes[0].stat,  
              INT: homePassing.types[4].athletes[0].stat
            },
          away: {
            name: awayPassing.types[0].athletes[0].name,
            CATT: awayPassing.types[0].athletes[0].stat, 
            yards: awayPassing.types[1].athletes[0].stat,  
            TD: awayPassing.types[3].athletes[0].stat,  
            INT: awayPassing.types[4].athletes[0].stat
          }
        })
        setRushing({
          home: {
            name: homeRunning.types[0].athletes[0].name,
            carries: homeRunning.types[0].athletes[0].stat,
            avg: homeRunning.types[2].athletes[0].stat, 
            yardsRush: homeRunning.types[1].athletes[0].stat, 
            TDRush: homeRunning.types[3].athletes[0].stat, 
            },
          away: {
            name: awayRunning.types[0].athletes[0].name,
            carries: awayRunning.types[0].athletes[0].stat,
            avg: awayRunning.types[2].athletes[0].stat, 
            yardsRush: awayRunning.types[1].athletes[0].stat, 
            TDRush: awayRunning.types[3].athletes[0].stat, 
          },
        })
        setReceiving({
          home: {
            name: homeReceiving.types[0].athletes[0].name,
            rec: homeReceiving.types[0].athletes[0].stat, 
            recYards: homeReceiving.types[1].athletes[0].stat,  
            recTD: homeReceiving.types[3].athletes[0].stat
          },
          away: {
            name: awayReceiving.types[0].athletes[0].name,
            rec: awayReceiving.types[0].athletes[0].stat, 
            recYards: awayReceiving.types[1].athletes[0].stat,  
            recTD: awayReceiving.types[3].athletes[0].stat
          }
        });
      }
   }
  }

 }, [playerStats])




  return (
    <div className={styles.container}>
      <Head>
        <title>College Football Randomizer</title>
        <meta name="description" content="Find any random football game in seconds, using the college football randomizer!"/>
        <meta property="og:title" content="Find a random college football game in seconds!"/>
        <meta property="og:description" content="Waste away the day by finding a random college football game. Pick any of your favorite teams, and see what random game they played in."/>
        <meta property="og:url" content="https://CFBRandomizer.com"/>
        <meta property="og:type" content="website"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <Image 
        src={img}  
        width={700}
        height={288}
        alt="College Football Randomizer Logo" />

        <p className={styles.description}>
        Start by Picking one Team
        </p>

        <div className={styles.grid}>
          <span className={styles.card}>
            <DropDown filesObject = {filesObject} parentCallback = {handleCallback}/>

            <Button  size="sm" onClick={() => getRandomGame()}>
                    Engage Randomizer
            </Button>
          </span>


          <span
            className={styles.card}
          >
            <h2>Results &rarr;</h2>
            <div></div>
            <div>{!month ? month :<div>{month}/{day}/{year}</div>}</div>
            <div>{!home ? home : <div>{home}: {homeScore}</div>}</div>
            <div>{!away ? away : <div>{away}: {awayScore}</div>}</div>
            <div>{!home ? home : <div>at {home}</div>}</div>
            <div>{!venue ? venue : <div> Played At: {venue} </div>}</div>
            <div>{!total ? total : <div> Played {total} games, went {wins}-{losses} </div>}</div>

            <div>{!YTurl ? YTurl : <div> <ReactPlayer url = {YTurl}/> </div>}</div>




            <br></br>

            <div>{!passing.home.name ? passing.home.name : <div><div style={{fontWeight: "bold"}}>{home} Stats </div></div>}</div>
            <div>{!passing.home.name ? passing.home.name : <div> <div style={{fontWeight: "bold"}}>Passing:</div> {passing.home.name}: {passing.home.CATT}, {passing.home.yards} yards, {passing.home.TD} TD, {passing.home.INT} INT </div>} </div>
            <div>{!rushing.home.name ? rushing.home.name : <div> <div style={{fontWeight: "bold"}}>Rushing:</div> {rushing.home.name}: {rushing.home.carries} carries, {rushing.home.yardsRush} yards, {rushing.home.avg} average, {rushing.home.TDRush} TD </div>}</div>
            <div>{!receiving.home.name ? receiving.home.name :<div> <div style={{fontWeight: "bold"}}>Receiving:</div>{receiving.home.name}: {receiving.home.rec} receptions, {receiving.home.recYards} yards, {receiving.home.recTD} TD</div>}</div>

          <br></br>

            <div>{!passing.away.name ? passing.away.name : <div><div style={{fontWeight: "bold"}}>{away} Stats </div></div>}</div>
            <div>{!passing.away.name ? passing.away.name : <div><div style={{fontWeight: "bold"}}>Passing:</div> {passing.away.name}: {passing.away.CATT}, {passing.away.yards} yards, {passing.away.TD} TD, {passing.away.INT} INT </div>} </div>
            <div>{!rushing.away.name ? rushing.away.name : <div><div style={{fontWeight: "bold"}}>Rushing:</div> {rushing.away.name}: {rushing.away.carries} carries, {rushing.away.yardsRush} yards, {rushing.away.avg} average, {rushing.away.TDRush} TD </div>}</div>
            <div>{!receiving.away.name ? receiving.away.name :<div><div style={{fontWeight: "bold"}}>Receiving:</div> {receiving.away.name}: {receiving.away.rec} receptions, {receiving.away.recYards} yards, {receiving.away.recTD} TD</div>}</div>


            <p>
              
            </p>
          </span>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}





export default Home