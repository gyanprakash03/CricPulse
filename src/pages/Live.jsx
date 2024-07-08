import React, { useContext } from "react";
import "../App.css";
import { AppContext } from "../context/AppContext";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Live = () => {
  const { matchList, loading } = useContext(AppContext);

  return (
    <div className="w-[90%] max-w-[1000px] mx-auto flex flex-wrap justify-evenly items-center mb-4 perspective-1000 preserve-3d">
      {loading ? (<Loader />) : Object.keys(matchList).length === 0 ? <Error/> : (
        matchList?.typeMatches?.length > 0 && matchList.typeMatches.map((type) => {
          return (
            type?.seriesMatches?.length > 0 && type.seriesMatches.map((series) => {
              if (series?.seriesAdWrapper?.matches?.length > 0) {
                return series.seriesAdWrapper.matches.map((match) => {
                  const matchId = match?.matchInfo?.matchId;
                  return <Card key={matchId} ID={matchId} match={match} />
                });
              }
            })
          );
        })
      )}
    </div>
  );
};

export default Live;
