import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StepsWrapper = styled.div`
  margin: 20px auto;
  text-align: left;
`;

const PlayersInfo = styled.div`
  font-family: Courier, monospace;
  display: block;
`;

const WinMessage = styled.div`
  font-size: 32px;
  color: #023356;
  text-shadow: 0 0 2px #677889, 0 0 2px #677889;
  height: 50px;
`;

const StepsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const StepButton = styled.button`
  font-size: 18px;
  cursor: pointer;
  color: #012345;
  background: #dddedf;
  border: none;
  width: 64px;
  padding: 8px;
  margin: 5px;
  ${(props) => props.isCurrentStep && "background: #bccdcf"}
`;

const EmptyDiv = styled.div`
  width: 64px;
  padding: 8px;
  margin: 5px;
`;

const NextColor = styled.div`
  font-size: 28px;
  color: #012345;
  height: 50px;
`;

export default function Steps({
  board,
  records,
  handleRewind,
  thisStoneColor,
  winner,
}) {
  return (
    <StepsWrapper>
      <PlayersInfo>
        {winner && (
          <WinMessage>
            Winner:
            {winner.toUpperCase()}
          </WinMessage>
        )}
        {!winner && (
          <NextColor>
            Next:
            {thisStoneColor.toUpperCase()}
          </NextColor>
        )}
      </PlayersInfo>
      <StepsSection>
        {
          records.map((record, recordIndex) => {
            const recordKey = recordIndex;
            return (
              <StepButton
                key={recordKey}
                value={recordIndex}
                onClick={handleRewind}
                isCurrentStep={
                  JSON.stringify(board) === JSON.stringify(record.board)
                }
              >
                {" "}
                {recordIndex === 0 ? "Start" : recordIndex}
              </StepButton>
            );
          })
        }
        <EmptyDiv />
        <EmptyDiv />
        <EmptyDiv />
        <EmptyDiv />
        <EmptyDiv />
        <EmptyDiv />
      </StepsSection>
    </StepsWrapper>
  );
}

Steps.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  records: PropTypes.arrayOf(PropTypes.object),
  handleRewind: PropTypes.func,
  thisStoneColor: PropTypes.string,
  winner: PropTypes.string,
};

Steps.defaultProps = {
  board: [],
  records: [],
  handleRewind: null,
  thisStoneColor: null,
  winner: null,
};
