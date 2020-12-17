import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormInput = styled.div`
  font-size: 18px;
  text-align: left;
  padding-top: 15px;
  div {
    text-align: left;
  }
  span {
    color: #ef2334;
  }
  > label {
    font-weight: bold;
    font-size: 20px;
  }
`;

const TextInput = styled.input`
  font-size: 18px;
  text-align: left;
  border: none;
  background: #dddedf;
  padding: 5px;
  width: 60%;
`;

const Warnning = styled.p`
  color: #ef2334;
  height: 15px;
`;

function FormText({ isRequired, handleInput, userInputs, handleOnBlur, name }) {
  const value = userInputs[name].content;
  const { isValid } = userInputs[name];
  const { isEmpty } = userInputs[name];
  let warnningMessage = "";
  if (isEmpty === true) {
    warnningMessage = "Field required.";
  } else if (isValid === false) {
    warnningMessage = "Not valid input.";
  }

  return (
    <FormInput>
      <label htmlFor={name}>
        {name.toUpperCase()} {isRequired && <span>*</span>}
      </label>
      <br />
      <TextInput
        onChange={handleInput}
        onBlur={handleOnBlur}
        type={name === "email" ? "email" : "text"}
        name={name}
        placeholder="Your answer."
        value={value}
      />
      <br />
      <Warnning>{warnningMessage || ""}</Warnning>
    </FormInput>
  );
}

function FormRadio({ isRequired, userInputs, handleInput }) {
  const id = userInputs.type.content;
  return (
    <FormInput>
      <label htmlFor="type">
        YOUR TYPE
        {isRequired && <span>*</span>}
      </label>
      <br />
      <div>
        <label htmlFor="type_1">
          <input
            type="radio"
            name="type"
            id="type_1"
            onChange={handleInput}
            checked={id === "type_1"}
          />
          <span> </span>
          Super imagination in your bed
        </label>
        <br />
      </div>
      <br />
      <div>
        <label htmlFor="type_2">
          <input
            type="radio"
            name="type"
            id="type_2"
            onChange={handleInput}
            checked={id === "type_2"}
          />
          <span> </span>
          All done effortless on the floor.
        </label>
        <br />
      </div>
      <Warnning />
    </FormInput>
  );
}

const userInputProp = {
  nickname: PropTypes.object,
  email: PropTypes.object,
  phone: PropTypes.object,
  type: PropTypes.object,
  how: PropTypes.object,
  other: PropTypes.object,
};

FormText.propTypes = {
  isRequired: PropTypes.bool,
  handleInput: PropTypes.func,
  userInputs: PropTypes.shape(userInputProp),
  handleOnBlur: PropTypes.func,
  name: PropTypes.string,
};

FormText.defaultProps = {
  isRequired: true,
  handleInput: null,
  userInputs: {},
  handleOnBlur: null,
  name: "",
};

FormRadio.propTypes = {
  isRequired: PropTypes.bool,
  handleInput: PropTypes.func,
  userInputs: PropTypes.shape(userInputProp),
};

FormRadio.defaultProps = {
  isRequired: true,
  handleInput: null,
  userInputs: {},
};

export { FormText, FormRadio };
