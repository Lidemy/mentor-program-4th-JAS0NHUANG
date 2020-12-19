import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Intersection = styled.div`
  position: relative;
  display: inline-block;
  margin: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 0px;
    top: 14px;
    background: #a4b5b9;
    height: 2px;
    width: 30px;
    z-index: 2;
  }
  &:after {
    content: "";
    position: absolute;
    left: 14px;
    top: 0px;
    background: #a4b5b9;
    height: 30px;
    width: 2px;
    z-index: 2;
  }
`;

const BlueStone = styled.div`
  border-radius: 50%;
  background: radial-gradient(farthest-corner at 6px 6px, #89edf6, #00137b);
  position: relative;
  z-index: 3;
  width: 26px;
  height: 26px;
  margin: 2px;
  box-shadow: 1px 1px 2px #87cdf6;
`;

const GreenStone = styled.div`
  border-radius: 50%;
  border: none;
  background: radial-gradient(farthest-corner at 6px 6px, #7be88c, #006323);
  position: relative;
  z-index: 3;
  width: 26px;
  height: 26px;
  margin: 2px;
  box-shadow: 1px 1px 2px #8ce68c;
`;

export default function Stone({
  stoneColor,
  handlePlaceStone,
  rowIndex,
  colIndex,
}) {
  return (
    <Intersection
      onClick={() => {
        handlePlaceStone(rowIndex, colIndex);
      }}
    >
      {stoneColor === "green" && <GreenStone />}
      {stoneColor === "blue" && <BlueStone />}
    </Intersection>
  );
}

Stone.propTypes = {
  stoneColor: PropTypes.string,
  handlePlaceStone: PropTypes.func,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

Stone.defaultProps = {
  stoneColor: null,
  handlePlaceStone: null,
  rowIndex: null,
  colIndex: null,
};
