import React from "react";
import styled from "styled-components";
import Stone from "./Stone";
import Steps from "./Steps";
import useGomoku from "../hooks/useGomoku";

const BoardWrapper = styled.div`
  width: 570px;
  height: 570px;
  margin: auto;
  background: #dddedf;
  box-sizing: content-box;
  border: solid 2px #a4b5b9;
`;

const Row = styled.div`
  font-family: Sans;
  margin-bottom: -4px;
`;

export default function Board() {
  const {
    board,
    records,
    handlePlaceStone,
    handleRewind,
    thisStoneColor,
    winner,
  } = useGomoku();

  return (
    <BoardWrapper>
      {
        board.map((row, rowIndex) => {
          const rowKey = rowIndex;
          return (
            <Row key={rowKey}>
              {
                row.map((intersection, colIndex) => {
                  const colKey = colIndex;
                  return (
                    <Stone
                      key={rowKey * 100 + colKey}
                      stoneColor={board[rowIndex][colIndex]}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      handlePlaceStone={handlePlaceStone}
                    />
                  );
                })
              }
            </Row>
          );
        })
      }
      <Steps
        board={board}
        records={records}
        handleRewind={handleRewind}
        thisStoneColor={thisStoneColor}
        winner={winner}
      />
    </BoardWrapper>
  );
}
