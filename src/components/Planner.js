import React, {useState} from 'react';
import styled from 'styled-components';
import {ArrowLeft, ArrowRight, Edit2, Delete} from 'react-feather';
import {remove} from "../features/meals/mealsSlice";

const PlannerNav = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid limegreen;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
`
const PlannerWrapper = styled.div`
  border: 1px solid limegreen;
  //background-color: darkseagreen;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
`
const Day = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid limegreen;
`
const DateCol = styled.div`
  padding-bottom: 19px;
  width: 7.5rem;
  font-size: 18px;
  font-weight: bold;
`
const SetList = styled.div`
  flex-grow: 1;
  //padding-right: 65px;
`
const Set = styled.div`
  display: flex;
  //justify-content: space-between;
  flex-grow: 1;
  margin-left: 3rem;
  margin-bottom: 1rem;
`
const SetName = styled.div`
  width: 5rem;
  font-size: 16px;
  font-weight: bold;
`
const MealsAdded = styled.ul`
  flex-grow: 1;
  list-style: none;
  margin: 0;
  padding-left: 3rem;
`
const Meal = styled.li`
  display: flex;
  margin-bottom: 0.5rem;
`
const ButtonAdd = styled.button`
  position: absolute;
  top: -10px;
  right: -79px;
  appearance: none;
  border: 0;
  background-color: darkolivegreen;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  width: 46px;
  padding: 0.74rem 0;
  font-size: 1.2rem;
`
const ButtonEdit = styled.button`
  appearance: none;
  border: 0;
  background-color: green;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1.3rem;
  height: 1.3rem;
  margin-left: auto;
`
const ButtonDelete = styled.button`
  appearance: none;
  border: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1.3rem;
  height: 1.3rem;
  margin-left: 0.5rem;
`

function Planner() {
  const handleAdd = () => {
    //
  }
  const handleEdit = (meal) => {
    //
  }
  const handleDelete = (id) => {
    //
  }

  return (
    <React.Fragment>
      <PlannerNav><ArrowLeft size={20} /> &nbsp;Неделя&nbsp; <ArrowRight size={20} /></PlannerNav>
      <PlannerWrapper>
        <Day>
          <DateCol>15 ноя. <br/>понедельник</DateCol>
          <SetList>
            <Set>
              <SetName>завтрак</SetName>
              <MealsAdded>
                <Meal>
                  meal 1
                  <ButtonEdit type='button' onClick={()=> handleEdit()}><Edit2 size={14} />️</ButtonEdit>
                  <ButtonDelete type='button' onClick={()=> handleDelete()}><Delete size={14} />️</ButtonDelete>
                </Meal>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <Set>
              <SetName>ужин</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <ButtonAdd type='button' onClick={handleAdd}>+</ButtonAdd>
          </SetList>
        </Day>
        <Day>
          <DateCol>16 ноя. <br/>вторник</DateCol>
          <SetList>
            <Set>
              <SetName>завтрак</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <Set>
              <SetName>обед</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <Set>
              <SetName>ужин</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <ButtonAdd type='button' onClick={handleAdd}>+</ButtonAdd>
          </SetList>
        </Day>
        <Day>
          <DateCol>17 ноя. <br/>среда</DateCol>
          <SetList>
            <Set>
              <SetName>завтрак</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <Set>
              <SetName>обед</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <Set>
              <SetName>перекус</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <ButtonAdd type='button' onClick={handleAdd}>+</ButtonAdd>
          </SetList>
        </Day>
        <Day>
          <DateCol>18 ноя. <br/>четверг</DateCol>
          <SetList>
            <Set>
              <SetName>завтрак</SetName>
              <MealsAdded>
                <li>meal 1</li>
                <li>meal 2</li>
                <li>meal 3</li>
                <li>meal 4</li>
              </MealsAdded>
            </Set>
            <ButtonAdd type='button' onClick={handleAdd}>+</ButtonAdd>
          </SetList>
        </Day>
        <Day>
          <DateCol>19 ноя. <br/>пятница</DateCol>
          <SetList>
            <ButtonAdd type='button' onClick={handleAdd}>+</ButtonAdd>
          </SetList>
        </Day>
      </PlannerWrapper>
    </React.Fragment>
  );
}

export default Planner;
