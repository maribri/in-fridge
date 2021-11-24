import React, {useState} from 'react';
import styled from 'styled-components';
import {Portal, PortalWithState} from 'react-portal';

const FormWrapper = styled.div`
  background-color: white;
  outline: 1px solid #85c985;
  position: fixed;
  top: 5rem;
  right: 1rem;
  width: 570px;
`;

function Modal(props) {
  return (
    <Portal>
      <FormWrapper>
        <button type='button' onClick={()=> props.handleClose()}>X️</button>
        {props.children}
      </FormWrapper>
    </Portal>
  );
  /*return (
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({openPortal, closePortal, isOpen, portal}) => (
        <React.Fragment>
          <button onClick={openPortal}>
            Open Portal
          </button>
          {portal(
            <p>
              This is more advanced Portal. It handles its own state.{' '}
              <button onClick={closePortal}>Close me!</button>
              , hit ESC or
              click outside of me.
            </p>
          )}
          {props.children}
        </React.Fragment>
      )}
    </PortalWithState>
  );*/
}

export default Modal;
