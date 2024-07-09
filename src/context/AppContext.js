import React, { useState } from 'react'
import { createContext } from "react";
import { baseurl, options } from "../baseURL";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [matchList, setMatchList] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prevStatus, setPrevStatus] = useState("");

  async function fetchData(matchStatus) {
    if (matchStatus === prevStatus) return;
    setPrevStatus(matchStatus);
    setLoading(true);
    let url = `${baseurl}/${matchStatus}`;

    try {
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

        const text = await resp.text();

        if (!text || text.trim() === '') {
          console.warn('Response body is empty or null');
          setLoading(false);
          return;
        }
        console.log("api : matchlist called");
        const data = JSON.parse(text);

        setMatchList(data);
    } 
    catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
    }
    setLoading(false);
  }

  const value = {
    matchList,
    fetchData,
    loading,
    setLoading,
    error,
    setError
  }
    
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;