import React, { useContext, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { AppContext } from '../context/AppContext';
import { playersearchurl, options } from '../baseURL';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const PlayerSearch = () => {

  const [inputValue, setInputValue] = useState("");
  const {loading, setLoading, setError} = useContext(AppContext);
  const [playerSData, setPlayerSData] = useState({});
  const [notValid, setNotValid] = useState(false);
  const [called, setCalled] = useState(false);
  const [playerSearchName, setPlayerSearchName] = useState(null);
  const [showXMark, setShowXMark] = useState(false);

  async function fetchPlayerSearch(playerName) {

    if (playerName === playerSearchName) return;
    if (playerName === "") {
        setNotValid(true);
        return;
    }
    setPlayerSearchName(playerName);
    setCalled(true);
    setNotValid(false);
    setLoading(true);
    const url = `${playersearchurl}${playerName}`;

    try {
        const resp = await fetch(url, options);
        
        if (resp.status === 429) {
            console.error("API call limit exceeded");
            setError("API call limit exceeded! That is it for today.");
            setLoading(false);
            return;
        }
        console.log("player search api called");
        
        const data = await resp.json();
        setPlayerSData(data);
    }
    catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
    }

    setLoading(false);
  }

  function inputChangeHandler(e) {
    setInputValue(e.target.value);
    if(e.target.value !== "") {
        setShowXMark(true);
    }
    else {
        setShowXMark(false);
    }
  }

  function xbuttonHandler() {
    setInputValue("");
    setShowXMark(false);
  }

  return (
    <div className="w-[90%] max-w-[1000px] mx-auto mb-4 mt-2 py-2 px-2">
        <div className='flex justify-center bg-[#00000080] py-4 px-2 rounded-md gap-8 relative shadow-matchCard'>

            <input type='text' placeholder='player name here...' value={inputValue} onChange={inputChangeHandler} spellCheck="false" className='text-white placeholder:text-slate-300 px-3 py-1 bg-transparent
            max-w-[350px] w-[70%] rounded-md outline outline-1 outline-slate-500 focus:outline-white'/>

            <button onClick={() => fetchPlayerSearch(inputValue)} className='border-2 rounded-full p-2  hover:border-yellow-300 hover:text-yellow-300 transition duration-300'><IoSearch /></button>

            <button onClick={xbuttonHandler} className={`hover:text-yellow-300 rounded-full p-1 absolute lg:right-[22rem] md:right-[32%] right-[28%] ${showXMark ? "inline" : "hidden"}`}><HiMiniXMark className='text-[1.6rem]'/></button>
        </div>
        
        {
            loading ? <Loader/> : (
                <div className='flex flex-wrap justify-around'>
                    <div className='w-full text-center py-2 text-yellow-300'>{playerSData?.category && !notValid ? `Search results for "${playerSData?.category}"` : null}</div>

                    {
                        notValid ? <div className='text-center text-yellow-300 py-2'>Enter a Valid input</div> : (
                            playerSData?.player ? (
                            playerSData?.player?.map((result) => (
                                <Link key={result?.id} to={result?.id} className='w-[45%] bg-[#00000080] rounded-md py-2 px-4 my-2 text-center shadow-matchCard group'>
                                    <div className='text-[1.2rem] group-hover:underline group-hover:text-yellow-300'>{result?.name}</div>
                                    <div className='text-slate-300'>{result?.teamName}</div>
                                </Link>
                            ))
                            ) : called ? (
                                <div>No matching search result</div>
                            ) : null
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default PlayerSearch