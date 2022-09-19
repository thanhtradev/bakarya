import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Theme from "./Theme/Theme";
import Body from "./components/Body";
import NewsFeed from "./NewsFeed/NewsFeed";
import SideBarLeft from "./components/SideBar/SideBarLeft";
import SideBarRight from "./components/SideBar/SideBarRight";
// We import all the components we need in our app
// import Navbar from "./components/navbar";
// import RecordList from "./components/recordList";
// import Edit from "./components/edit";
// import Create from "./components/create";

const App = () => {
  // return (
  //   <div>
  //     <Navbar />
  //     <Routes>
  //       <Route exact path="/" element={<RecordList />} />
  //       <Route path="/edit/:id" element={<Edit />} />
  //       <Route path="/create" element={<Create />} />
  //     </Routes>
  //   </div>
  // );
  return (
    <Theme>
      <Header />
      <Body>
        <SideBarLeft />
        <NewsFeed />
        <SideBarRight />
      </Body>
    </Theme>
  );
};

export default App;
