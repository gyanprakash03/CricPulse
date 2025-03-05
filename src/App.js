import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Live from "./pages/Live";
import Recent from "./pages/Recent";
import Upcoming from "./pages/Upcoming";
import Match from "./pages/Match";
import PlayerSearch from "./pages/PlayerSearch";
import Player from "./pages/Player";
import Rankings from "./pages/Rankings";
import ContactMe from "./pages/ContactMe";

function App() {
  return (
    <div className="box-border h-full w-full font-changa relative text-white m-0 p-0 pt-16 overflow-y-hidden ">
      {/* <video className="fixed -z-10 inset-0 h-full w-full object-cover" autoPlay loop muted>
        <source src="/Network-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <img src="/bg-1.jpg" alt="background" className="fixed -z-10 inset-0 h-full w-full object-cover"/>
      <Routes>
        <Route path="/" element = {<Navbar/>}>
          <Route index element = {<Live/>} />
          <Route path="/recent" element = {<Recent/>} />
          <Route path="/upcoming" element = {<Upcoming/>} />
          <Route path="/match/:matchID" element = {<Match/>} />
          <Route path="/players" element = {<PlayerSearch/>} />
          <Route path="/players/:playerID" element = {<Player/>} />
          <Route path="/rankings/men" element = {<Rankings/>} />
          <Route path="/contact-me" element = {<ContactMe/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
