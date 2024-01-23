import { Link } from "react-router-dom";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";

export const TelInput = styled(PhoneInput)`
  width: 180px;
  input {
    color: #505050 !important;
    width: 100% !important;
  }
`;

export const SendButton = styled.button`
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.sendBtn};
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.sendBtn};
  cursor: pointer;
  border-radius: 16px;
  margin-left: 2rem;
  width: 152px;
`;

export const Header = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 3px solid #f5fbff;
`;

export const HeaderInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
`;

export const HeaderLocation = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: rgb(33, 116, 185);
`;

export const HeaderTitle = styled.h4`
  display: flex;
  justify-content: flex-start;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  color: #809fb8;
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;

  @media ${({ theme }) => theme.device.laptop} {
    /* flex-direction: column; */
  }
`;

export const HeaderAction = styled.div`
  /* width: 100%; */
  height: 50px;
  margin-left: 1rem;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid #d9e1e7;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.primary};

  // &:focus-within {
  //     // border: 2px solid #2174B9;
  //     color: ${({ theme }) => theme.colors.lightBlack};
  // }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.lightBlack};
  font-size: 0.8rem;

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.primary} !important;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary} !important;
    font-style: italic;
  }
  &:focus-within {
    // border: 2px solid #2174B9;
    color: ${({ theme }) => theme.colors.lightBlack};
  }
`;

export const BtnAction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ border }) => (border ? border : "#D9E1E7")};
  border-radius: 16px;
  color: ${({ color }) => color || "#D9E1E7"};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: ${({ bg }) => (bg ? bg : "#FFFFFF")};

  & span {
    color: ${({ color }) => color || "#505050"};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.btnHover};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const BtnIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;

export const PrimaryBtnOutlineActionModal = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0px 3px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;
  white-space: nowrap;

  & span {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.btnHover};
  }
`;

export const PrimaryBtnOutlineAction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;
  white-space: nowrap;

  & span {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.btnHover};
  }
`;

export const CancelBtnOutlineAction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.danger};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;
  white-space: nowrap;

  & span {
    color: ${({ theme }) => theme.colors.danger};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.btnHover};
  }
`;

export const SecondaryBtnOutlineActionModal = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  height: 32px;
  padding: 0px 3px;
  border: 2px solid
    ${({ theme, border }) => (border ? border : theme.colors.gray)};
  border-radius: 6px;
  color: ${({ theme, color }) => (color ? color : theme.colors.primary)};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;
  white-space: nowrap;

  & span {
    color: ${({ theme, color }) => (color ? color : theme.colors.primary)};
  }

  &:hover {
    background-color: ${({ theme, hov }) =>
      hov ? hov : theme.colors.btnHover};
  }
`;

export const SecondaryBtnOutlineAction = styled.button`
  display: flex;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
  height: 50px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid
    ${({ theme, border }) => (border ? border : theme.colors.gray)};
  //border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 16px;
  color: ${({ theme, color }) => (color ? color : theme.colors.primary)};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;

  & span {
    color: ${({ theme, color }) => (color ? color : theme.colors.primary)};
  }

  &:hover {
    background-color: ${({ theme, hov }) =>
      hov ? hov : theme.colors.btnHover};
  }
`;

export const DensityBtnOutlineAction = styled.button`
  display: flex;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
  border: none;
  height: 50px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;

  & span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const BtnSmOutlineAction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  /* padding: 0.5rem; */
  border: 2px solid
    ${({ border, theme }) => (border ? border : theme.colors.redLight)};
  border-radius: 8px;
  color: ${({ color, theme }) => color || theme.colors.secondary};
  cursor: pointer;
  font-size: 1rem;
  background-color: #ffffff;

  & span {
    color: ${({ color, theme }) => color || theme.colors.secondary};
  }

  &:hover {
    background-color: ${({ color, theme }) => color || theme.colors.btnHover};
    color: #ffffff;
  }
`;

export const PrimaryBtnOutlineLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;
  text-decoration: none;
  & span {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.btnHover};
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SecondaryBtnOutlineLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ border }) => (border ? border : "#D9E1E7")};
  border-radius: 16px;
  color: ${({ color }) => color || "#505050"};
  cursor: pointer;
  font-size: 0.9rem;
  background-color: #ffffff;
  text-decoration: none;
  & span {
    color: #505050;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.btnHover};
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid #f5fbff;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &.fadeOut {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }

  &.fadeIn {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
  
`;

export const FormGroupInvInfSpec = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.25rem;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  &.fadeOut {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }

  &.fadeIn {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const FormGroupInvInf = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.25rem;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  &.fadeOut {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }

  &.fadeIn {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;
export const GroupCommande = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.25rem;
`;
export const FormGroupInv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid #f5fbff;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  &.fadeOut {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }

  &.fadeIn {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;
export const FormGroupInvCommandes = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f5fbff;
  max-height: 100px;
  overflow-y: scroll;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  &.fadeOut {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 300ms, opacity 300ms;
  }

  &.fadeIn {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;
export const FormLabel = styled.label`
  // cursor: pointer;
  width: 58%;
  display: flex;
  margin: 0 0.5rem 0 0;
  padding: 0;
  width: 58%;
  text-align: center;
  /* white-space: nowrap; */
  color: ${({ theme, color }) => (color ? color : theme.colors.secondary)};
`;

export const FormInput = styled.input`
  /* flex: 1; */
  border: none;
  outline: none;
  flex: 1;
  /* width: 170px; */
  text-align: right;
  color: #505050;
  font-size: 0.8rem;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    font-style: italic;
  }
`;

export const FormSelect = styled.select`
  border: none;
  outline: none;
  /* min-width: 170px; */
  flex: 1;
  text-align: right;
  color: #505050;
`;

export const FormInterval = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.25rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const FormIntervalLabel = styled.label`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #f5fbff;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

export const FormIntervalValues = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const FormIntervalStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
`;

export const FormIntervalEnd = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

export const FormEntCanal = styled.div`
  width: 100%;
  border-bottom: 1px solid #f5fbff;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const FormECLabel = styled.label`
  color: ${({ theme }) => theme.colors.secondary};
  padding-left: 0;
  margin: 0.5rem 0;
  white-space: nowrap;
`;
export const FormECListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  border: 1px solid #d9e1e7;
  border-radius: 18px;
  padding: 0.5rem;
  width: 72%;
  margin: 0.5rem 0;
  @media (max-width: 1300px) {
    /* flex-direction: column; */
    display: block;
  }
`;

export const FormECListContainerAccountRequest = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  border: 1px solid #809fb866;
  border-radius: 18px;
  padding: 0.5rem;
  width: 80%;
  margin: 0.5rem 0;
  @media (max-width: 1000px) {
    /* flex-direction: column; */
    display: block;
  }
`;

export const FormECItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* width: 15%; */
`;

export const FormECILabel = styled.label`
  margin: 0;
  white-space: nowrap;
`;

export const FormECIValue = styled.div`
  margin: 0;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.success : theme.colors.secondary};
`;
