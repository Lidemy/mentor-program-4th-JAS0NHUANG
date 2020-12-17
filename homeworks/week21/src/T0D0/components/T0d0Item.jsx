import React from "react";
import styled from "styled-components";

const T0d0Wrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  min-height: 26px;
  &:hover {
    background: #999;
    color: #fff;
  }
`;

const T0d0Checkbox = styled.div`
  cursor: pointer;
  min-width: 60px;
  ${(props) =>
    props.isDone &&
    `
    color: #ccc;
  `}
`;
const T0d0Content = styled.div`
  text-align: left;
  flex-grow: 1;
  flex-shrink: 1;
  word-wrap: anywhere;
  white-space: pre-wrap;
  ${(props) =>
    props.isDone &&
    `
    text-decoration: line-through;
    color: #ccc;
  `}
`;

const T0d0ContentEdit = styled.form`
  text-align: left;
  flex-grow: 1;
  flex-shrink: 1;
  word-wrap: anywhere;
  white-space: pre-wrap;
  input {
    outline: none;
    border: none;
    width: 100%;
    text-align: left;
  }
`;

const T0d0Delete = styled.div`
  cursor: pointer;
  min-width: 30px;
`;

export default function T0d0Item({
  t0d0,
  value,
  handleDelete,
  handleToggleIsDone,
  handleInput,
  handleEditing,
  handleEditSubmit,
}) {
  const handleIsDoneClick = () => {
    handleToggleIsDone(t0d0.t0d0Id);
  };

  const handleDeleteClick = () => {
    handleDelete(t0d0.t0d0Id);
  };

  const handleContentClick = () => {
    handleEditing(t0d0.t0d0Id);
  };

  return (
    <T0d0Wrapper t0d0Id={t0d0.t0d0Id}>
      <T0d0Checkbox onClick={handleIsDoneClick} isDone={t0d0.isDone}>
        -[{t0d0.isDone ? "V" : " "}]
      </T0d0Checkbox>
      {!t0d0.isEditing ? (
        <T0d0Content isDone={t0d0.isDone} onClick={handleContentClick}>
          {t0d0.t0d0Content}
        </T0d0Content>
      ) : (
        <T0d0ContentEdit onSubmit={handleEditSubmit}>
          <input
            type="text"
            defaultValue={t0d0.t0d0Content}
            value={value}
            onChange={handleInput}
            onBlur={handleContentClick}
            autoFocus
          />
        </T0d0ContentEdit>
      )}
      <T0d0Delete onClick={handleDeleteClick}>X</T0d0Delete>
    </T0d0Wrapper>
  );
}
