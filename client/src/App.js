import React from "react";
import "./App.css";
// We use Route in order to define the different routes of our application
import { Route, Switch, Redirect } from "react-router-dom";
import Theme from "./Theme/Theme";
import Body from "./components/Body";
import NewsFeed from "./pages/NewsFeed";
import SideBarLeft from "./components/SideBar/SideBarLeft";
import SideBarRight from "./components/SideBar/SideBarRight";
import { Box } from "@mui/material";
import HeaderNews from "./components/NewsFeed/HeaderNewsFeed/HeaderNews";
import ShoppingPage from "./pages/ShoppingPage";
import LiveStreamPage from "./pages/LiveStreamPage";
import SavedRecipePage from "./pages/SavedRecipePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Theme>
      <Body>
        <Switch>
          <Route path='/home/*'>
            <SideBarLeft
              xs='flex'
              md='flex'
              justifyContent='flex-start'
              stackAlignItem='flex-start'
            />
            <Box sx={{ height: "4.1rem" }}>
              <HeaderNews />
            </Box>
            <Switch>
              <Route path='/home/recipe-page'>
                <NewsFeed />
              </Route>
              <Route path='/home/shopping-page'>
                <ShoppingPage />
              </Route>
              <Route path='/home/livestream-page'>
                <LiveStreamPage />
              </Route>
              <Route path='/home/saved-recipe-page'>
                <SavedRecipePage />
              </Route>
              <Route path='/'>
                <Redirect to='/home/recipe-page' />
              </Route>
            </Switch>
            <SideBarRight
              xs='flex'
              md='none'
              justifyContent='flex-end'
              stackAlignItem='flex-end'
              direction='row-reverse'
            />
          </Route>
          <Route path='/login-page'>
            <LoginPage />
          </Route>
          <Route path='/'>
            <Redirect to='/home/recipe-page' />
          </Route>
        </Switch>
      </Body>
    </Theme>
  );
};

export default App;
