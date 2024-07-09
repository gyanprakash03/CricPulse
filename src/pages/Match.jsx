import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { matchurl, imageurl, options } from '../baseURL';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Match = () => {

  const { matchID } = useParams();
  const {loading, setLoading, setError} = useContext(AppContext);
  const [matchData, setMatchData] = useState({});
  const [showInnings1, setShowInnings1] = useState(true);
  const [showInnings2, setShowInnings2] = useState(false);
  const [potmImage, setPotmImage] = useState(null);
  const [matchApiID, setMatchApiID] = useState(null);
  const [potmApiID, setpotmApiID] = useState(null);
//   const [prevMatchID, setPrevMatchID] = useState(null);

  async function fetchMatch(matchID) {
    if (matchID === matchApiID) return;
    setMatchApiID(matchID);
    setLoading(true);
    const url = `${matchurl}/${matchID}/hscard`;

    try {
        // console.log("url :", url);
        const resp = await fetch(url, options);
        
        if (resp.status === 429) {
            console.error("API call limit exceeded");
            setError("API call limit exceeded! That is it for today.");
            setLoading(false);
            return;
        }
        else if (!resp.ok) {
            console.error('HTTP Error:', resp.status);
            setError(`HTTP error: ${resp.status}`);
            setLoading(false);
            return;
        }

        console.log("Match api called");
        const data = await resp.json();
        setMatchData(data);
    }
    catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMatch(matchID);
  }, [matchID]);

  const scoreCard = matchData?.scoreCard;
  const matchHeader = matchData?.matchHeader;

  async function fetchPotmImage(imageID, setImage) {
    if (imageID === potmApiID) return;
    setpotmApiID(imageID);
    const url = `${imageurl}/c${imageID}/i.jpg?p=de`;

    try {
        const response = await fetch(url, options);

        if (response.status === 429) {
            console.error("API call limit exceeded");
            setError("API call limit exceeded! That is it for today.");
            setLoading(false);
            return;
        }

        console.log("potm api called");
        const result = await response.blob();
        const imageUrl = URL.createObjectURL(result);

        setImage(imageUrl);
    } 
    catch (error) {
        console.error(error);
        setImage(null);
    }
  }

  useEffect(() => {
    if (matchHeader?.playersOfTheMatch?.[0]) {
        // setPrevMatchID(matchID);
        fetchPotmImage(matchHeader?.playersOfTheMatch?.[0]?.faceImageId, setPotmImage);
    }
  }, [matchHeader?.playersOfTheMatch?.[0]]);

  return (
    <div className="w-[90%] max-w-[1000px] mx-auto mb-4 mt-2 bg-[#00000080] rounded-md py-2 px-4 shadow-matchCard">
        {
            loading ? <Loader/> : Object.keys(matchData).length === 0 ? <Error/> : (
                <div className='w-full'>

                    <div className='flex justify-between text-[1.2rem]'>
                        <div className='text-blue-300'>{matchHeader?.seriesName}</div>
                        <div>{matchHeader?.matchDescription}</div>
                    </div>

                    <div className='text-[1.4rem] mt-1 text-yellow-300'>{matchData?.status}</div>

                    {
                        matchHeader?.playersOfTheMatch?.[0] ? (
                            <div className='flex justify-center my-6'>
                                <Link to={`/players/${matchHeader?.playersOfTheMatch?.[0]?.id}`}
                                className='flex gap-4 items-center px-3 group'>

                                    <img src={potmImage} alt='' onError={(e) => e.target.src = '/no_face.jpg'} className='w-20 rounded-full border-2 border-black' />
                                    <div>
                                        <div className='text-[1.2rem] group-hover:underline'>{matchHeader?.playersOfTheMatch?.[0]?.fullName}</div>
                                        <div className='text-slate-400'>{matchHeader?.playersOfTheMatch?.[0]?.teamName}</div>
                                        <div>Player of the match</div>
                                    </div>

                                </Link>
                            </div>
                            
                        ) : ""
                    }

                    <div className='flex items-center justify-evenly mt-6 border-t py-8'>
                        <div className='flex flex-col items-center'>

                            <div className='text-[1.6rem] text-center font-semibold text-red-400'>{scoreCard?.[0]?.batTeamDetails?.batTeamName}</div>
                            <div className='text-[1.4rem]'>{scoreCard?.[0]?.scoreDetails?.runs ? `${scoreCard?.[0]?.scoreDetails?.runs}/${scoreCard?.[0]?.scoreDetails?.wickets}` : "Yet to Bat"}</div>

                            <div className='text-[1.2rem] text-slate-400'>{scoreCard?.[0]?.scoreDetails?.overs ? `(${scoreCard?.[0]?.scoreDetails?.overs})` : "---"}</div>

                            <div className='text-[1.2rem]'>{scoreCard?.[0]?.scoreDetails?.runRate ? `Runrate : ${scoreCard?.[0]?.scoreDetails?.runRate}` : "---"}</div>
                        </div>

                        <div className='flex flex-col items-center'>

                            <div className='text-[1.6rem] text-center font-semibold text-red-400'>{scoreCard?.[1]?.batTeamDetails?.batTeamName}</div>
                            <div className='text-[1.4rem]'>{scoreCard?.[1]?.scoreDetails?.runs ? `${scoreCard?.[1]?.scoreDetails?.runs}/${scoreCard?.[1]?.scoreDetails?.wickets}` : "Yet to Bat"}</div>

                            <div className='text-[1.2rem] text-slate-400'>{scoreCard?.[1]?.scoreDetails?.overs ? `(${scoreCard?.[1]?.scoreDetails?.overs})` : "---"}</div>

                            <div className='text-[1.2rem]'>{scoreCard?.[1]?.scoreDetails?.runRate ? `Runrate : ${scoreCard?.[1]?.scoreDetails?.runRate}` : "---"}</div>
                        </div>
                    </div>

                    <div className='flex justify-between text-[1.4rem] border-y py-1 text-center cursor-pointer'>
                        <div onClick={() => {
                            setShowInnings2(false);
                            setShowInnings1(true);
                        }} 
                        className={`border-r w-1/2 ${showInnings1 ? "bg-[#1a12ff32]" : ""}`}>1st Innings</div>

                        <div onClick={() => {
                            setShowInnings1(false);
                            setShowInnings2(true);
                        }} 
                        className={`border-l w-1/2 ${showInnings2 ? "bg-[#1a12ff32]" : ""}`}>2nd Innings</div>
                    </div>

                    {showInnings1 ? (
                        <div className='mt-2'>
                            <div className='flex w-full text-[1.2rem] border-b text-blue-400'>
                                <div className='w-[35%] text-center p-2 hidden sm:block'>Batsman name</div>
                                <div className='w-[35%] text-center p-2 sm:hidden'>Batsman</div>

                                <div className='flex w-[65%] justify-around p-2 text-center'>
                                    <div className='w-[20%] hidden sm:block'>Runs</div>
                                    <div className='w-[20%] hidden sm:block'>Balls</div>
                                    <div className='w-[20%] hidden sm:block'>Fours</div>
                                    <div className='w-[20%] hidden sm:block'>Sixes</div>
                                    <div className='w-[20%] hidden sm:block'>SR</div>

                                    <div className='w-[20%] sm:hidden'>R</div>
                                    <div className='w-[20%] sm:hidden'>B</div>
                                    <div className='w-[20%] sm:hidden'>4s</div>
                                    <div className='w-[20%] sm:hidden'>6s</div>
                                    <div className='w-[20%] sm:hidden'>SR</div>
                                </div>
                            </div>

                            {scoreCard?.[0]?.batTeamDetails?.batsmenData && Object.entries(scoreCard?.[0]?.batTeamDetails?.batsmenData)?.map(([key, batsman]) => {
                                return <div key={key} className='flex flex-col border-b border-slate-600'>
                                    <div  className='flex w-full text-[1.2rem]'>
                                        <Link to={`/players/${batsman?.batId}`}
                                        className='w-[35%] text-center p-2 hover:underline hover:text-yellow-300'>{batsman?.batName}</Link>

                                        <div className='flex w-[65%] justify-around p-2 text-center'>
                                            <div className='w-[20%]'>{batsman?.runs}</div>
                                            <div className='w-[20%]'>{batsman?.balls}</div>
                                            <div className='w-[20%]'>{batsman?.fours}</div>
                                            <div className='w-[20%]'>{batsman?.sixes}</div>
                                            <div className='w-[20%]'>{batsman?.strikeRate}</div>
                                        </div>
                                    </div>
                                    <div className='w-[35%] text-center text-[0.9rem] text-slate-400'>{batsman?.outDesc === "" ? "Yet to Bat" : batsman?.outDesc}</div>
                                </div>
                            })}

                            <div className='flex justify-evenly text-[1.4rem] py-6 border-b text-yellow-300'>
                                <div>Extras</div>
                                <div>{scoreCard?.[0]?.extrasData?.total}</div>
                            </div>

                            <div className='flex w-full text-[1.2rem] border-b mt-2 text-blue-400'>
                                <div className='w-[35%] text-center p-2 hidden sm:block'>Bowler name</div>
                                <div className='w-[35%] text-center p-2 sm:hidden'>Bowler</div>
                                <div className='flex w-[65%] justify-around p-2 text-center'>
                                    <div className='w-[20%] hidden sm:block'>Overs</div>
                                    <div className='w-[20%] hidden sm:block'>Maidens</div>
                                    <div className='w-[20%] hidden sm:block'>Wickets</div>
                                    <div className='w-[20%] hidden sm:block'>Runs</div>
                                    <div className='w-[20%] hidden sm:block'>Eco</div>

                                    <div className='w-[20%] sm:hidden'>O</div>
                                    <div className='w-[20%] sm:hidden'>M</div>
                                    <div className='w-[20%] sm:hidden'>W</div>
                                    <div className='w-[20%] sm:hidden'>R</div>
                                    <div className='w-[20%] sm:hidden'>Eco</div>
                                </div>
                            </div>

                            {scoreCard?.[0]?.bowlTeamDetails?.bowlersData && Object.entries(scoreCard?.[0]?.bowlTeamDetails?.bowlersData)?.map(([key, bowler]) => {
                                return <div key={key} className='flex w-full text-[1.2rem] border-b border-slate-600'>
                                        <Link to={`/players/${bowler?.bowlerId}`}
                                        className='w-[35%] text-center p-2 hover:underline hover:text-yellow-300'>{bowler?.bowlName}</Link>
                                        <div className='flex w-[65%] justify-around p-2 text-center'>
                                            <div className='w-[20%]'>{bowler?.overs}</div>
                                            <div className='w-[20%]'>{bowler?.maidens}</div>
                                            <div className='w-[20%]'>{bowler?.wickets}</div>
                                            <div className='w-[20%]'>{bowler?.runs}</div>
                                            <div className='w-[20%]'>{bowler?.economy}</div>
                                        </div>
                                </div>
                            })}

                            <div className='w-full text-center text-[1.4rem] mt-6 py-2 border-b text-yellow-300'>Fall of Wickets</div>
                            <div className='flex text-center text-[1.2rem] py-2 border-b text-blue-400'>
                                <div className='w-[33%]'>Wkt no.</div>
                                <div className='w-[33%]'>Player name</div>
                                <div className='w-[33%]'>Over</div>
                            </div>

                            {scoreCard?.[0]?.wicketsData && Object.entries(scoreCard?.[0]?.wicketsData)?.map(([key, wicket]) => {
                                return <div key={key} className='flex text-center text-[1.2rem] py-2 border-b border-slate-600'>
                                    <div className='w-[33%]'>{wicket?.wktNbr}</div>
                                    <div className='w-[33%]'>{wicket?.batName}</div>
                                    <div className='w-[33%]'>{wicket?.wktOver}</div>
                                </div>
                            })}

                            <div className='w-full text-center text-[1.4rem] mt-6 py-2 border-b text-yellow-300'>Partnerships</div>
                            <div className='flex w-full text-[1.2rem] py-2 border-b text-blue-400'>
                                <div className='flex w-[60%] text-center'>
                                    <div className='w-[50%]'>Player 1</div>
                                    <div className='w-[50%]'>Player 2</div>
                                </div>
                                <div className='flex w-[40%] text-center'>
                                    <div className='w-[50%]'>Runs</div>
                                    <div className='w-[50%]'>Balls</div>
                                </div>
                            </div>

                            {scoreCard?.[0]?.partnershipsData && Object.entries(scoreCard?.[0]?.partnershipsData)?.map(([key, partnership]) => {
                                return <div key={key}>
                                    <div className='flex w-full text-[1.2rem] py-2 border-b border-slate-600'>
                                        <div className='flex w-[60%] text-center'>
                                            <div className='w-[50%]'>{partnership?.bat1Name}</div>
                                            <div className='w-[50%]'>{partnership?.bat2Name}</div>
                                        </div>
                                        <div className='flex w-[40%] text-center'>
                                            <div className='w-[50%]'>{partnership?.totalRuns}</div>
                                            <div className='w-[50%]'>{partnership?.totalBalls}</div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    ) : showInnings2 ? (
                        <div className='mt-2'>
                            <div className='flex w-full text-[1.2rem] border-b text-blue-400'>
                                <div className='w-[35%] text-center p-2 hidden sm:block'>Batsman name</div>
                                <div className='w-[35%] text-center p-2 sm:hidden'>Batsman</div>

                                <div className='flex w-[65%] justify-around p-2 text-center'>
                                    <div className='w-[20%] hidden sm:block'>Runs</div>
                                    <div className='w-[20%] hidden sm:block'>Balls</div>
                                    <div className='w-[20%] hidden sm:block'>Fours</div>
                                    <div className='w-[20%] hidden sm:block'>Sixes</div>
                                    <div className='w-[20%] hidden sm:block'>SR</div>

                                    <div className='w-[20%] sm:hidden'>R</div>
                                    <div className='w-[20%] sm:hidden'>B</div>
                                    <div className='w-[20%] sm:hidden'>4s</div>
                                    <div className='w-[20%] sm:hidden'>6s</div>
                                    <div className='w-[20%] sm:hidden'>SR</div>
                                </div>
                            </div>

                            {scoreCard?.[1]?.batTeamDetails?.batsmenData && Object.entries(scoreCard?.[1]?.batTeamDetails?.batsmenData)?.map(([key, batsman]) => {
                                return <div key={key} className='flex flex-col border-b border-slate-600'>
                                    <div  className='flex w-full text-[1.2rem]'>
                                        <Link to={`/players/${batsman?.batId}`}
                                        className='w-[35%] text-center p-2 hover:underline hover:text-yellow-300'>{batsman?.batName}</Link>

                                        <div className='flex w-[65%] justify-around p-2 text-center'>
                                            <div className='w-[20%]'>{batsman?.runs}</div>
                                            <div className='w-[20%]'>{batsman?.balls}</div>
                                            <div className='w-[20%]'>{batsman?.fours}</div>
                                            <div className='w-[20%]'>{batsman?.sixes}</div>
                                            <div className='w-[20%]'>{batsman?.strikeRate}</div>
                                        </div>
                                    </div>
                                    <div className='w-[35%] text-center text-[0.9rem] text-slate-400'>{batsman?.outDesc === "" ? "Yet to Bat" : batsman?.outDesc}</div>
                                </div>
                            })}

                            <div className='flex justify-evenly text-[1.4rem] py-6 border-b text-yellow-300'>
                                <div>Extras</div>
                                <div>{scoreCard?.[1]?.extrasData?.total}</div>
                            </div>

                            <div className='flex w-full text-[1.2rem] border-b mt-2 text-blue-400'>
                                <div className='w-[35%] text-center p-2 hidden sm:block'>Bowler name</div>
                                <div className='w-[35%] text-center p-2 sm:hidden'>Bowler</div>
                                <div className='flex w-[65%] justify-around p-2 text-center'>
                                    <div className='w-[20%] hidden sm:block'>Overs</div>
                                    <div className='w-[20%] hidden sm:block'>Maidens</div>
                                    <div className='w-[20%] hidden sm:block'>Wickets</div>
                                    <div className='w-[20%] hidden sm:block'>Runs</div>
                                    <div className='w-[20%] hidden sm:block'>Eco</div>

                                    <div className='w-[20%] sm:hidden'>O</div>
                                    <div className='w-[20%] sm:hidden'>M</div>
                                    <div className='w-[20%] sm:hidden'>W</div>
                                    <div className='w-[20%] sm:hidden'>R</div>
                                    <div className='w-[20%] sm:hidden'>Eco</div>
                                </div>
                            </div>

                            {scoreCard?.[1]?.bowlTeamDetails?.bowlersData && Object.entries(scoreCard?.[1]?.bowlTeamDetails?.bowlersData)?.map(([key, bowler]) => {
                                return <div key={key} className='flex w-full text-[1.2rem] border-b border-slate-600'>
                                        <Link to={`/players/${bowler?.bowlerId}`}
                                        className='w-[35%] text-center p-2 hover:underline hover:text-yellow-300'>{bowler?.bowlName}</Link>
                                        <div className='flex w-[65%] justify-around p-2 text-center'>
                                            <div className='w-[20%]'>{bowler?.overs}</div>
                                            <div className='w-[20%]'>{bowler?.maidens}</div>
                                            <div className='w-[20%]'>{bowler?.wickets}</div>
                                            <div className='w-[20%]'>{bowler?.runs}</div>
                                            <div className='w-[20%]'>{bowler?.economy}</div>
                                        </div>
                                </div>
                            })}

                            <div className='w-full text-center text-[1.4rem] mt-6 py-2 border-b text-yellow-300'>Fall of Wickets</div>
                            <div className='flex text-center text-[1.2rem] py-2 border-b text-blue-400'>
                                <div className='w-[33%]'>Wkt no.</div>
                                <div className='w-[33%]'>Player name</div>
                                <div className='w-[33%]'>Over</div>
                            </div>

                            {scoreCard?.[1]?.wicketsData && Object.entries(scoreCard?.[1]?.wicketsData)?.map(([key, wicket]) => {
                                return <div key={key} className='flex text-center text-[1.2rem] py-2 border-b border-slate-600'>
                                    <div className='w-[33%]'>{wicket?.wktNbr}</div>
                                    <div className='w-[33%]'>{wicket?.batName}</div>
                                    <div className='w-[33%]'>{wicket?.wktOver}</div>
                                </div>
                            })}

                            <div className='w-full text-center text-[1.4rem] mt-6 py-2 border-b text-yellow-300'>Partnerships</div>
                            <div className='flex w-full text-[1.2rem] py-2 border-b text-blue-400'>
                                <div className='flex w-[60%] text-center'>
                                    <div className='w-[50%]'>Player 1</div>
                                    <div className='w-[50%]'>Player 2</div>
                                </div>
                                <div className='flex w-[40%] text-center'>
                                    <div className='w-[50%]'>Runs</div>
                                    <div className='w-[50%]'>Balls</div>
                                </div>
                            </div>

                            {scoreCard?.[1]?.partnershipsData && Object.entries(scoreCard?.[1]?.partnershipsData)?.map(([key, partnership]) => {
                                return <div key={key}>
                                    <div className='flex w-full text-[1.2rem] py-2 border-b border-slate-600'>
                                        <div className='flex w-[60%] text-center'>
                                            <div className='w-[50%]'>{partnership?.bat1Name}</div>
                                            <div className='w-[50%]'>{partnership?.bat2Name}</div>
                                        </div>
                                        <div className='flex w-[40%] text-center'>
                                            <div className='w-[50%]'>{partnership?.totalRuns}</div>
                                            <div className='w-[50%]'>{partnership?.totalBalls}</div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    ) : null}
                </div>
            )
        }
    </div>
  )
}

export default Match;