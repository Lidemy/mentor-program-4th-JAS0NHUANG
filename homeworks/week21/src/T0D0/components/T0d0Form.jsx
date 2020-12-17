import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const T0d0FormStyled = styled.form`
  margin-top: 8px;
  padding: 0 20px;
  min-height: 30px;
  background: #999;
`;

const T0d0Input = styled.input`
  font-size: 20px;
  margin-top: 8px;
  text-align: left;
  color: #efefef;
  border: none;
  outline: none;
  background: none;
  min-height: 30px;
  width: 100%;
`;

export default function T0d0Form({ value, handleSubmit, handleInput }) {
  return (
    <T0d0FormStyled action="" onSubmit={handleSubmit}>
      <T0d0Input
        type="text"
        placeholder="what to do?"
        value={value}
        onChange={handleInput}
        autoFocus
      />
    </T0d0FormStyled>
  );
}

T0d0Form.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInput: PropTypes.func,
};

T0d0Form.defaultProps = {
  value: null,
  handleSubmit: null,
  handleInput: null,
};
