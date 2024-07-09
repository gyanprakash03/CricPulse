import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { playerurl, options } from '../baseURL';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Player = () => {

  const { playerID } = useParams();
  const {loading, setLoading, setError} = useContext(AppContext);
  const [playerData, setPlayerData] = useState({});
  const [fullBio, setFullBio] = useState(false);
  const [showBat, setShowBat] = useState(true);
  const [showBowl, setShowBowl] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [playerApiID, setPlayerApiID] = useState(null);

  async function fetchPlayer(playerID) {
    if (playerID === playerApiID) return;
    setPlayerApiID(playerID);
    setLoading(true);
    const url = `${playerurl}/${playerID}`;

    try {
        const resp = await fetch(url, options);

        if (resp.status === 429) {
            console.error("API call limit exceeded");
            setError("API call limit exceeded! That is it for today.");
            setLoading(false);
            return;
        }

        const data = await resp.json();
        console.log("player api called");

        setPlayerData(data);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        setPlayerData({});
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPlayer(playerID);
  
  }, [playerID])



  return (
    <div className="w-[90%] max-w-[1000px] mx-auto mb-4 mt-2 bg-[#00000080] rounded-md py-2 px-4 shadow-matchCard">
        {
            loading ? <Loader/> : Object.keys(playerData).length === 0? <Error/> : (
                <div className='w-full'>

                    <div className='flex flex-col justify-center items-center py-6'>
                        <img src={playerData?.image} alt='' onError={(e) => e.target.src = '/public/no_face.jpg'} className='w-40 rounded-full border-2 border-black'/>
                        <div className='text-[2rem] pt-1'>{playerData?.name}</div>
                        <div className='text-[1.4rem] text-slate-400'>{playerData?.intlTeam}</div>
                    </div>

                    <div className='text-center text-[1.6rem] border-y py-1 text-yellow-300'>Information</div>

                    <div className='w-full flex text-[1.2rem] py-5 h-80 sm:h-fit'>
                        <div className='text-right w-1/2 h-full'>
                            <div className='border-r border-slate-500 pr-[15%] w-full h-[20%]'>Date of Birth</div>
                            <div className='border-r border-slate-500 pr-[15%] w-full h-[20%]'>Birth Place</div>
                            <div className='border-r border-slate-500 pr-[15%] w-full h-[20%]'>Role</div>
                            <div className='border-r border-slate-500 pr-[15%] w-full h-[20%]'>Batting style</div>
                            <div className='border-r border-slate-500 pr-[15%] w-full h-[20%]'>Bowling style</div>
                        </div>
                        <div className='w-1/2 h-full'>
                            <div className='border-l border-slate-500 pl-[15%] w-full h-[20%]'>{playerData?.DoB}</div>
                            <div className='border-l border-slate-500 pl-[15%] w-full h-[20%]'>{playerData?.birthPlace}</div>
                            <div className='border-l border-slate-500 pl-[15%] w-full h-[20%]'>{playerData?.role}</div>
                            <div className='border-l border-slate-500 pl-[15%] w-full h-[20%]'>{playerData?.bat}</div>
                            <div className='border-l border-slate-500 pl-[15%] w-full h-[20%]'>{playerData?.bowl}</div>
                        </div>
                    </div>

                    <div className='text-center text-[1.6rem] border-y py-1 text-yellow-300'>Teams</div>
                    <div className='flex flex-wrap justify-center items-center text-center py-4 text-[1.2rem]'>
                        {
                            playerData?.teams?.split(",").map((team, index) => (
                                <div key={index} className='md:w-1/3 sm:w-1/2 w-full py-2'>{team}</div>
                            ))
                        }
                    </div>

                    <div className='text-center text-[1.6rem] border-y py-1 text-yellow-300'>Biography</div>

                    {
                        fullBio ? (
                            <div className='py-4 text-[1.2rem] sm:text-left text-center'>
                                <div dangerouslySetInnerHTML={{ __html: playerData?.bio }} />
                                <button onClick={() => setFullBio(false)} className='font-semibold text-center w-full text-red-400 hover:text-red-600 py-2 underline'>Collapse</button>
                            </div>
                        ) : (
                            <div className='py-4 text-[1.2rem] sm:text-left text-center'>
                                <div dangerouslySetInnerHTML={{ __html: playerData?.bio?.slice(0, 500) + '...' }} />
                                <button onClick={() => setFullBio(true)} className='font-semibold text-center w-full text-red-400 hover:text-red-600 py-2 underline'>Expand</button>
                            </div>
                        )
                    }

                    <div className='text-center text-[1.6rem] border-y py-1 text-yellow-300'>Rankings</div>
                    <div className='flex text-[1.4rem] py-1 border-b cursor-pointer'>
                        <div onClick={ () => {
                            setShowBowl(false);
                            setShowAll(false);
                            setShowBat(true);
                        }} 
                        className={`w-1/3 text-center border-r ${showBat ? "bg-[#1a12ff32]" : ""}`}>Batting</div>

                        <div onClick={ () => {
                            setShowBat(false);
                            setShowAll(false);
                            setShowBowl(true);
                        }} 
                        className={`w-1/3 text-center ${showBowl ? "bg-[#1a12ff32]" : ""}`}>Bowling</div>

                        <div onClick={ () => {
                            setShowBat(false);
                            setShowBowl(false);
                            setShowAll(true);
                        }} 
                        className={`w-1/3 text-center border-l ${showAll ? "bg-[#1a12ff32]" : ""}`}>All Rounder</div>
                    </div>

                    {
                        showBat ? (
                            <div className='flex text-[1.2rem] py-5'>
                                <div className='text-right w-1/2'>
                                    <div className='border-r border-slate-500 pr-[15%]'>Test Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>ODI Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>T20I Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>Test Best Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>ODI Best Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>T20I Best Rank</div>
                                </div>

                                <div className='w-1/2'>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bat?.testRank ? playerData?.rankings?.bat?.testRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bat?.odiRank ? playerData?.rankings?.bat?.odiRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bat?.t20Rank ? playerData?.rankings?.bat?.t20Rank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bat?.testBestRank ? playerData?.rankings?.bat?.testBestRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bat?.odiBestRank ? playerData?.rankings?.bat?.odiBestRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bat?.t20BestRank ? playerData?.rankings?.bat?.t20BestRank : "---"}</div>
                                </div>
                            </div>
                        ) : showBowl ? (
                            <div className='flex text-[1.2rem] py-5'>
                                <div className='text-right w-1/2'>
                                    <div className='border-r border-slate-500 pr-[15%]'>Test Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>ODI Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>T20I Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>Test Best Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>ODI Best Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>T20I Best Rank</div>
                                </div>

                                <div className='w-1/2'>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bowl?.testRank ? playerData?.rankings?.bowl?.testRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bowl?.odiRank ? playerData?.rankings?.bowl?.odiRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bowl?.t20Rank ? playerData?.rankings?.bowl?.t20Rank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bowl?.testBestRank ? playerData?.rankings?.bowl?.testBestRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bowl?.odiBestRank ? playerData?.rankings?.bowl?.odiBestRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.bowl?.t20BestRank ? playerData?.rankings?.bowl?.t20BestRank : "---"}</div>
                                </div>
                            </div>
                        ) : showAll ? (
                            <div className='flex text-[1.2rem] py-5'>
                                <div className='text-right w-1/2'>
                                    <div className='border-r border-slate-500 pr-[15%]'>Test Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>ODI Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>T20I Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>Test Best Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>ODI Best Rank</div>
                                    <div className='border-r border-slate-500 pr-[15%]'>T20I Best Rank</div>
                                </div>

                                <div className='w-1/2'>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.all?.testRank ? playerData?.rankings?.all?.testRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.all?.odiRank ? playerData?.rankings?.all?.odiRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.all?.t20Rank ? playerData?.rankings?.all?.t20Rank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.all?.testBestRank ? playerData?.rankings?.all?.testBestRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.all?.odiBestRank ? playerData?.rankings?.all?.odiBestRank : "---"}</div>
                                    <div className='border-l border-slate-500 pl-[15%]'>{playerData?.rankings?.all?.t20BestRank ? playerData?.rankings?.all?.t20BestRank : "---"}</div>
                                </div>
                            </div>
                        ) : "---"
                    }

                </div>
            )
        }
    </div>
  )
}

export default Player