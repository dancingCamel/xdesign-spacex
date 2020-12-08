import React from "react";
import styled from "styled-components";

const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 2px 5px grey;
    width: 100%;
    margin: 10px;
`;

const Left = styled.div`
    display: flex;
    flex-direction: row;
`;

const Id = styled.div`
    margin: 20px;
`;

const Mission = styled.div`
    margin: 20px;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
`;

const LaunchItem = ({ key, id, mission, rocket, date }) => {
    return (
        <div>
            <Box>
                <Left>
                    <Id>#{id}</Id>
                    <Mission>{mission}</Mission>
                </Left>
                <Right>
                    <div className="dateTag">{date}</div>
                    <div className="rocketName">{rocket}</div>
                </Right>
            </Box>
        </div>
    );
};

export default LaunchItem;
