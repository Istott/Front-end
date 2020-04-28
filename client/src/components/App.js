import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import { Route } from "react-router-dom";
import ValueList from "./ValueList";
import PrivateRoute from "./PrviateRoute"


const App = () => {
  
    return (
      <div className="App">
        <Route exact path ="/" component={LoginPage}/>
        <PrivateRoute exact path="/essentials">
          <ValueList />
        </PrivateRoute>
      </div>
    );
  

}


export default App;
