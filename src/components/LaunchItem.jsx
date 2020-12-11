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
    margin: 10px 20px;
    font-size: 2em;
`;

const Mission = styled.div.attrs({
    className: "normalFont",
})`
    margin: 10px 20px;
    font-size: 2em;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 10px;
`;

const RocketName = styled.div`
    align-self: flex-end;
    margin: 5px 0;
`;

const LaunchItem = ({ id, mission, rocket, date }) => {
    const unixDate = new Date(0);
    unixDate.setUTCSeconds(date);

    const readableDate = unixDate.toDateString();

    return (
        <div>
            <Box>
                <Left>
                    <Id>#{id}</Id>
                    <Mission>{mission}</Mission>
                </Left>
                <Right>
                    <div className="dateTag normalFont">{readableDate}</div>
                    <RocketName>{rocket}</RocketName>
                </Right>
            </Box>
        </div>
    );
};

export default LaunchItem;
