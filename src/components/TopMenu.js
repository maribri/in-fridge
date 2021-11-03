import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const MenuNav = styled.nav`
  margin: -10px 0 50px -12px;
`
const MenuList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
`
const MenuLink = styled(Link)`
  display: inline-block;
  padding: 4px 12px;
`

function TopMenu() {
  const handleAdd = () => {
    //
  }

  return (
    <MenuNav>
      <MenuList>
        <li><MenuLink to="/">Продукты</MenuLink></li>
        <li><MenuLink to="/meals">Блюда</MenuLink></li>
        <li><MenuLink to="/planner">Планировщик</MenuLink></li>
        <li><MenuLink to="/shopping-list">Список покупок</MenuLink></li>
      </MenuList>
      {/*<ButtonAdd type='button' onClick={handleAdd}>Добавить +</ButtonAdd>*/}
    </MenuNav>
  );
}

export default TopMenu;
