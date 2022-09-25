import React from "react";
import Header from "./components/Header/Header";
import "./App.css";
// We use Route in order to define the different routes of our application
import { Route, Switch, Redirect } from "react-router-dom";
import Theme from "./Theme/Theme";
import Body from "./components/Body";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import SideBarLeft from "./components/SideBar/SideBarLeft";
import SideBarRight from "./components/SideBar/SideBarRight";
import { Box } from "@mui/material";
import HeaderNews from "./components/NewsFeed/HeaderNewsFeed/HeaderNews";
import ShoppingPage from "./pages/ShoppingPage";
import LiveStreamPage from "./pages/LiveStreamPage";
import SavedRecipePage from "./pages/SavedRecipePage";
const App = () => {
  return (
    <Theme>
      <Body>
        <SideBarLeft xs='flex' md='flex' />
        <Box sx={{ height: "100%", height: "4.1rem" }}>
          <HeaderNews />
        </Box>
        <Switch>
          <Route path='/recipe-page'>
            <NewsFeed />
          </Route>
          <Route path='/shopping-page'>
            <ShoppingPage />
          </Route>
          <Route path='/livestream-page'>
            <LiveStreamPage />
          </Route>
          <Route path='/saved-recipe-page'>
            <SavedRecipePage />
          </Route>
          <Route path='/'>
            <Redirect to='/recipe-page' />
          </Route>
        </Switch>
        <SideBarRight xs='flex' md='none' />
      </Body>
    </Theme>
  );
};

export default App;
