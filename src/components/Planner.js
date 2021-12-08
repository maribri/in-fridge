import React, {useState} from 'react';
import styled from 'styled-components';
import {ArrowLeft, ArrowRight, Edit2, Delete} from 'react-feather';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {remove} from '../features/meals/mealsSlice';
import AddPlanForm from './AddPlanForm';
import Modal from './Modal';
import {DAYS, MONTHS } from '../app/constants';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const PlannerNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid limegreen;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
`
const PlannerNavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid limegreen;
  border-radius: 10px;
  padding: 0.5rem 0.5rem;
  margin: 0 1rem;
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
  text-transform: lowercase;
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
  appearance: none;
  display: block;
  border: 0;
  background-color: darkolivegreen;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 6px 0;
  padding: 0.74rem 0;
  width: 100%;
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
  const plans = useSelector((state) => state.plans.value);
  const meals = useSelector((state) => state.meals.value);
  //const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState({open: false, plan: {}});

  const handleAdd = (day) => {
    setAddFormOpen(true);
  }
  const handleEdit = (meal) => {
    //
  }
  const handleDelete = (id) => {
    //
  }
  const handleClose = () => {
    setAddFormOpen(false);
    setEditFormOpen({open: false, plan: {}});
  }

  const getCurrentDate = () => {
    return Date.now();
  }

  const getSetsByDate = (timestamp) => {
    const filtered = plans.filter((plan) => {
        return plan.date === timestamp;
      }
    );
    console.log(filtered);
    return filtered;
  }

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekDays = Array.from({length: 7}).map((_,index) => {
    const weekDay = new Date();
    weekDay.setDate(weekStart.getDate() + index);
    return weekDay;
  });
  console.log(weekDays)

  return (
    <React.Fragment>
      <PlannerNav>
        <PlannerNavButton><ArrowLeft size={20} /></PlannerNavButton>
        &nbsp;Неделя&nbsp;
        <PlannerNavButton><ArrowRight size={20} /></PlannerNavButton>
      </PlannerNav>
      <DayPicker />

      <PlannerWrapper>
        {weekDays.map((weekDay)=>
          <Day key={weekDay.getDate()+weekDay.getMonth()+weekDay.getFullYear()}>
            <DateCol>{weekDay.getDate()} {MONTHS[weekDay.getMonth()]} <br/>{DAYS[weekDay.getDay()]}<br/>t {Date.parse(weekDay.getFullYear()+'-'+weekDay.getMonth()+'-'+weekDay.getDate())}</DateCol>
            <SetList>
              {getSetsByDate(Date.parse(weekDay.getFullYear()+'-'+weekDay.getMonth()+'-'+weekDay.getDate())).map((filteredDay)=>
                <Set>
                  <SetName>{filteredDay.set}</SetName>
                  <MealsAdded>
                    {filteredDay.meals.map((meal, i)=><Meal>{meal[i]}</Meal>)}
                  </MealsAdded>
                  <ButtonEdit type='button' onClick={()=> handleEdit()}><Edit2 size={14} />️</ButtonEdit>
                  <ButtonDelete type='button' onClick={()=> handleDelete()}><Delete size={14} />️</ButtonDelete>
                </Set>)}
              {/*<Set>
                <SetName>ужин</SetName>
                <MealsAdded>
                  <Meal>meal 1</Meal>
                  <Meal>meal 2</Meal>
                </MealsAdded>
                <ButtonEdit type='button' onClick={()=> handleEdit()}><Edit2 size={14} />️</ButtonEdit>
                <ButtonDelete type='button' onClick={()=> handleDelete()}><Delete size={14} />️</ButtonDelete>
              </Set>*/}
              <ButtonAdd type='button' onClick={()=> handleAdd(weekDay)}>+</ButtonAdd>
            </SetList>
          </Day>
        )}
        <Day>
          <DateCol>26 ноя. <br/>пятница</DateCol>
          <SetList>
            <ButtonAdd type='button' onClick={()=> handleAdd(1632253539470)}>+</ButtonAdd>
          </SetList>
        </Day>
      </PlannerWrapper>
      {addFormOpen && <Modal handleClose={handleClose}><AddPlanForm/></Modal>}
    </React.Fragment>
  );
}

export default Planner;
