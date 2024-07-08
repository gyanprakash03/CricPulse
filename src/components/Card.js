import React, {useState, useEffect} from 'react';
import {imageurl, options} from "../baseURL"
import { Link } from 'react-router-dom';
import "../App.css";

const Card = ({ID, match}) => {

  const matchInfo = match.matchInfo;
  const matchScore = match.matchScore;

//   const [team1Image, setTeam1Image] = useState(null);
//   const [team2Image, setTeam2Image] = useState(null);

//   async function fetchTeamImage(imageID, setImage) {
//     const url = `${imageurl}/c${imageID}/i.jpg?p=de`;

//     try {
//         console.log("url:", url);
//         const response = await fetch(url, options);
//         const result = await response.text();
//         setImage(result);
//     } 
//     catch (error) {
//         console.error(error);
//         setImage(null);
//     }
//   }

//   useEffect(() => {
//       fetchTeamImage(matchInfo.team1.imageID, setTeam1Image);
//       fetchTeamImage(matchInfo.team2.imageID, setTeam2Image);
//   }, [matchInfo.team1.imageID, matchInfo.team2.imageID]);

  return (
    <Link to={`/match/${ID}`} className='w-[85%] max-w-[28rem] relative bg-[#00000079] rounded-md py-2 px-4 mt-4 shadow-matchCard hover:scale-[1.03] transition duration-500 overflow-hidden group'>

        <div className='h-[400px] w-[15%] bg-[#ffffff4a] -rotate-45 blur-2xl absolute -right-32 -top-32
        duration-[0ms] group-hover:right-[34rem] transition-all group-hover:duration-[1.2s]'></div>

        <div className='flex justify-between items-baseline flex-wrap'>
            <div className='text-[0.9rem] text-blue-300'>{matchInfo?.seriesName}</div>

            <div className='text-[0.8rem] '>{matchInfo?.matchDesc}</div>
        </div>

        <div className='flex justify-evenly items-center my-3'>
            <div className='flex flex-col items-center'>
                {/* <img src={team1Image} alt={`${matchInfo?.team1?.teamSName} logo`} /> */}   
                <div className='text-[1.4rem] font-semibold text-red-400'>{matchInfo?.team1?.teamSName}</div>

                <div className='mt-1 text-[1.2rem]'>{matchScore?.team1Score?.inngs1 ? `${matchScore.team1Score.inngs1.runs}/${matchScore.team1Score.inngs1.wickets}` : "Yet to Bat"}</div>
                <div>{matchScore?.team1Score?.inngs1?.overs ? `(${matchScore?.team1Score?.inngs1?.overs})` : ""}</div>
            </div>

            <div className='flex flex-col items-center self-start'>
                {/* <img src={team2Image} alt={`${matchInfo?.team2?.teamSName} logo`} /> */}
                <div className='text-[1.4rem] font-semibold text-red-400'>{matchInfo?.team2?.teamSName}</div>

                <div className='mt-1 text-[1.2rem]'>{matchScore?.team2Score?.inngs1 ? `${matchScore.team2Score.inngs1.runs}/${matchScore.team2Score.inngs1.wickets}` : "Yet to Bat"}</div>
                <div>{matchScore?.team2Score?.inngs1?.overs ? `(${matchScore?.team2Score?.inngs1?.overs})` : ""}</div>
            </div>
        </div>

        <div className='text-[1.2rem] text-yellow-300'>{matchInfo?.status}</div>

        <div className='flex justify-between text-[0.9rem] flex-wrap'>
            <div>
                {matchInfo?.venueInfo?.ground 
                    ? matchInfo.venueInfo.ground.length > 25 ? `${matchInfo.venueInfo.ground.slice(0, 25)}...`
                    : matchInfo.venueInfo.ground : ''
                }
            </div>
            <div>{`${matchInfo?.venueInfo?.city}`}</div>
        </div>

    </Link>
  )
}

export default Card