import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as ViewMoreIcon } from "assets/icons/view-more.svg";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  background-color: transparent;
  transition: all 0.5s ease;

  ${(props) =>
    props.isoptionsvisible &&
    css`
      background-color: #0a0722;
    `};
`;

const StyledViewMoreIcon = styled(ViewMoreIcon)`
  width: 50px;
  height: 50px;
  padding: 10px;
  fill: #ccc;
  cursor: pointer;
  transition: transform 0.5s ease;

  &:hover {
    fill: #fff;
  }

  ${(props) =>
    props.isoptionsvisible &&
    css`
      transform: rotate(180deg);
    `};
`;

const StyledOptionsContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 150px;
  height: 0px;
  opacity: 0;
  overflow: hidden;
  transition: opacity, height 0.5s ease;

  ${(props) =>
    props.isoptionsvisible &&
    css`
      height: 60px;
      opacity: 1;
    `};
`;

const StyledOptionsIcons = css`
  width: 45px;
  height: 45px;
  padding: 10px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s 0.5s ease;
  cursor: pointer;

  ${(props) =>
    props.isoptionsvisible &&
    css`
      opacity: 1;
    `};
`;

const StyledEditIcon = styled(EditIcon)`
  ${StyledOptionsIcons};
  &:hover {
    fill: #0e66fe;
  }
  ${(props) =>
    props.actionname === "edit" &&
    css`
      fill: #fff;
      background-color: #0e66fe;
      &:hover {
        fill: #fff;
        background-color: #0e66fe;
      }
    `};
`;

const StyledTrashIcon = styled(TrashIcon)`
  ${StyledOptionsIcons};
  &:hover {
    fill: #d50000;
  }
  ${(props) =>
    props.actionname === "delete" &&
    css`
      fill: #fff;
      background-color: #d50000;
      &:hover {
        fill: #fff;
        background-color: #d50000;
      }
    `};
`;

const OptionsMenu = ({ actionName, setActionName, setActionEnabled }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  return (
    <StyledWrapper isoptionsvisible={isOptionsVisible ? 1 : 0}>
      <StyledViewMoreIcon
        onClick={() => {
          setIsOptionsVisible(!isOptionsVisible);
          setActionEnabled(false);
          setActionName(undefined);
        }}
        isoptionsvisible={isOptionsVisible ? 1 : 0}
      />
      <StyledOptionsContentWrapper isoptionsvisible={isOptionsVisible ? 1 : 0}>
        <StyledEditIcon
          onClick={() => {
            setActionEnabled(true);
            setActionName("edit");
          }}
          actionname={actionName}
          isoptionsvisible={isOptionsVisible ? 1 : 0}
        />
        <StyledTrashIcon
          onClick={() => {
            setActionEnabled(true);
            setActionName("delete");
          }}
          actionname={actionName}
          isoptionsvisible={isOptionsVisible ? 1 : 0}
        />
      </StyledOptionsContentWrapper>
    </StyledWrapper>
  );
};

export default OptionsMenu;
