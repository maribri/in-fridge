import React from 'react';
import styled from 'styled-components';
import ProductsList from './components/ProductsList';

const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
`

function App() {
  return (
    <Container>
      <ProductsList/>
    </Container>
  );
}

export default App;
