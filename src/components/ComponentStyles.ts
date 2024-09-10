import styled, { css } from 'styled-components';
import { InputProps } from "../types/types";

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #cccc;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Header = styled.header`
  padding: 8px;
  background-color: #ff5023;
  color: white;
  text-align: center;
`;

export const Footer = styled.footer`
  padding: 8px;
  background-color: #ff5023;
  color: white;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

export const Container = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input<InputProps>`
  padding: 8px;
  border: 1px solid #cccc;
  border-radius: 8px;
  margin-bottom: 8px;
  color: #37394f;
`;



export const ErrorLabel = styled.label`
  color: red;
  font-size: 12px;
  margin-bottom: 4px;
  margin-left:4px;
`;

export const Button = styled.button<{ disabled: boolean }>`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.disabled ? '#ccc' : '#BF4F74'};
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background-color: ${props => !props.disabled && '#9f3d62'};
  }
`;

