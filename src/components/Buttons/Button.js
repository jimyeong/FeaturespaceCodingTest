import React from "react";
import styled from "styled-components";

const ButtonBlock = styled.button`
  background-color: ${(props) => props.backgroundColor};
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  &:hover {
    background-color: #08c;
  }
  &:active {
    background-color: #07c;
  }
  &:focus {
  }
`;

function Button({ children, ...rest }) {
  return <ButtonBlock {...rest}>{children}</ButtonBlock>;
}

export default Button;
