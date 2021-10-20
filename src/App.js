import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsList from './components/ProductsList';
import MealsList from './components/MealsList';
import Planner from './components/Planner';
import ShoppingList from './components/ShoppingList';
import {add} from "./features/meals/mealsSlice";
import {nanoid} from "nanoid";

const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
`
const ButtonClear = styled.button`
  position: fixed;
  top: 12px;
  right: 12px;
  padding: 0.6rem;
  color: #fff;
  text-shadow: 1px 1px #946262;
  background-color: #e68686;
  border: none;
  cursor: pointer;
`

function App() {
  const handleClear = async (e) => {
    e.preventDefault();
    //
  }

  return (
    <Router>
      <Container>
        <ButtonClear type='button' onClick={handleClear}>Clear storage</ButtonClear>
        <Switch>
          <Route path="/meals">
            <MealsList/>
          </Route>
          <Route path="/planner">
            <Planner/>
          </Route>
          <Route path="/shopping-list">
            <ShoppingList/>
          </Route>
          <Route path="/">
            <ProductsList/>
          </Route>
          <Route path="*">
            <div>404 not found</div>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
