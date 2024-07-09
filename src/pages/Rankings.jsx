import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { rankingurl, options } from '../baseURL';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Rankings = () => {

  const [format, setFormat] = useState("");
  const [category, setCategory] = useState("");
  const {loading, setLoading, setError} = useContext(AppContext);
  const [invalid, setInvalid] = useState(false);
  const [rankingData, setRankingData] = useState({});
  const [apiCalled, setApiCalled] = useState(false);
  const [prevFormat, setPrevFormat] = useState(null);
  const [prevCategory, setPrevCategory] = useState(null);

  async function fetchRanking() {
    if (!format || !category) {
      setInvalid(true);
      return;
    }
    if (format === prevFormat && category == prevCategory) return;

    setPrevFormat(format);
    setPrevCategory(category);
    setApiCalled(true);
    setInvalid(false);
    setLoading(true);
    const url = `${rankingurl}/${category}?formatType=${format}`;

    try {
      console.log("url : " , url);
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
      console.log("rankings api called");

      const data = await resp.json();
      setRankingData(data);
    }
    catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    }
    setLoading(false);
  }

  return (
    <div className="w-[90%] max-w-[1000px] mx-auto mb-4 mt-2 py-2 px-2">

      <div className='bg-[#00000080] rounded-md py-2 px-4 mb-4'>

        <div className='text-center text-[1.4rem] text-yellow-300'>Select Format</div>

        <div className='flex justify-around text-[1.2rem] my-3'>

          <div onClick={() => setFormat("test")} className={`py-1 px-3 cursor-pointer border border-yellow-300 rounded-md ${format === "test" ? "bg-yellow-300 text-black" : ""}`}>Test</div>
          <div onClick={() => setFormat("odi")} className={`py-1 px-3 cursor-pointer border border-yellow-300 rounded-md ${format === "odi" ? "bg-yellow-300 text-black" : ""}`}>ODI</div>
          <div onClick={() => setFormat("t20")} className={`py-1 px-3 cursor-pointer border border-yellow-300 rounded-md ${format === "t20" ? "bg-yellow-300 text-black" : ""}`}>T20</div>
        </div>

      </div>

      <div className='bg-[#00000080] rounded-md py-2 px-4 mb-4'>

        <div className='text-center text-[1.4rem] text-yellow-300'>Select Category</div>

        <div className='flex flex-col items-center sm:flex-row text-center gap-4 sm:justify-around text-[1.2rem] my-3'>

          <div onClick={() => setCategory("batsmen")} 
          className={`py-1 px-3 cursor-pointer border border-yellow-300 rounded-md ${category === "batsmen" ? "bg-yellow-300 text-black" : ""}`}>Batsman</div>

          <div onClick={() => setCategory("bowlers")} 
          className={`py-1 px-3 cursor-pointer border border-yellow-300 rounded-md ${category === "bowlers" ? "bg-yellow-300 text-black" : ""}`}>Bowler</div>

          <div onClick={() => setCategory("allrounders")} 
          className={`py-1 px-3 cursor-pointer border border-yellow-300 rounded-md ${category === "allrounders" ? "bg-yellow-300 text-black" : ""}`}>All rounder</div>

          <div onClick={() => setCategory("teams")} 
          className={`py-1 px-3 cursor-pointer border border-yellow-300 rounded-md ${category === "teams" ? "bg-yellow-300 text-black" : ""}`}>Teams</div>
        </div>

      </div>

      <div className='text-center text-[1.3rem] font-semibold my-4'>
        <button onClick={fetchRanking} className='py-1 px-4 border-2 border-red-500 rounded-md hover:bg-red-500 transition duration-400'>Get Ranking</button>
      </div>

      {
        loading ? <Loader/> : invalid ? <div className='text-center text-yellow-300 text-[1.2rem]'>Select a Format and Category</div> : apiCalled ? ( category === "teams" ? 
          <div className='bg-[#00000080] rounded-md py-2 px-4 mt-4'>
            <div className='flex w-full border-b py-2 text-base sm:text-[1.3rem] text-center'>
              <div className='w-[25%]'>Rank</div>
              <div className='w-[25%]'>Player Name</div>
              <div className='w-[25%]'>Points</div>
              <div className='w-[25%]'>Rating</div>
            </div>

            {
              rankingData?.rank?.map((ranking) => (
                <div key={ranking?.id} className='flex border-b border-slate-600 py-2 text-base sm:text-[1.2rem] text-center'>
                  <div className='w-[25%]'>{ranking?.rank}</div>
                  <Link to={`/players/${ranking?.id}`} className='w-[25%] hover:underline hover:text-yellow-300'>{ranking?.name}</Link>
                  <div className='w-[25%]'>{ranking?.points}</div>
                  <div className='w-[25%]'>{ranking?.rating}</div>
                </div>
              ))
            }
          </div> : 
          <div className='bg-[#00000080] rounded-md py-2 px-4 mt-4'>
            <div className='flex w-full border-b py-2 text-base sm:text-[1.3rem] text-center'>
              <div className='w-[25%]'>Rank</div>
              <div className='w-[25%]'>Player Name</div>
              <div className='w-[25%]'>Country</div>
              <div className='w-[25%]'>Rating</div>
            </div>

            {
              rankingData?.rank?.map((ranking) => (
                <div key={ranking?.id} className='flex border-b border-slate-600 py-2 text-base sm:text-[1.2rem] text-center'>
                  <div className='w-[25%]'>{ranking?.rank}</div>
                  <Link to={`/players/${ranking?.id}`} className='w-[25%] hover:underline hover:text-yellow-300'>{ranking?.name}</Link>
                  <div className='w-[25%]'>{ranking?.country}</div>
                  <div className='w-[25%]'>{ranking?.rating}</div>
                </div>
              ))
            }
          </div>
        ) : null
      }
    </div>
    
  )
}

export default Rankings;