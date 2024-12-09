import React from 'react';
import styled from 'styled-components';

const Switch = ({ toggleTheme, isChecked }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={toggleTheme} />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(75, 73, 74);
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.3em;
    background-color: black;
    box-shadow: inset 8px -4px 0 0 white;
    transition: 0.4s;
  }

  .switch input:checked + .slider {
    background-color: #2196f3;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.5em);
    background-color: yellow;
    box-shadow: none;
  }
`;

export default Switch;