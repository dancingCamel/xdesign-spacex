import "./App.css";
// build css from scss here
// https://techcookbook.com/react/use-scss-with-create-react-app#:~:text=%20Use%20SCSS%20with%20create-react-app%20%201%20Building,contents%20into%20the%20body%20of%20the...%20More%20
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LaunchItem from "./components/LaunchItem";
import Logo from "./assets/spacex-logo.png";
import launchHome1x from "./assets/img/launch-home.png";
import launchHome2x from "./assets/img/launch-home@2x.png";
import launchHome3x from "./assets/img/launch-home@3x.png";

const AppWrapper = styled.div`
    box-sizing: border-box;
`;

const Header = styled.header`
    display: flex;
    justify-content: between;
    align-items: flex-end;
    min-height: 8vh;
    font-size: calc(10px + 1vmin);
    color: white;
    width: 100vw;
    padding: 10px 5vmin 0px 5vmin;
`;

const ContentWrapper = styled.div`
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
`;

const LaunchWrapper = styled.section``;
const Left = styled.div`
    float: left;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Right = styled.div`
    float: right;
    width: 40%;
`;

const App = () => {
    const [launches, setLaunches] = useState([]);

    const getAllLaunches = async () => {
        const latestLaunches = await fetch(
            "https://api.spacexdata.com/v3/launches"
        );
        const latestLaunchesJson = await latestLaunches.json();

        sessionStorage.setItem(
            "latestLaunches",
            JSON.stringify(latestLaunchesJson)
        );

        setLaunches(latestLaunchesJson);
    };

    const sortLaunches = (direction) => {
        // maybe have a state to track asc/desc, clicking button toggles it. then use effect to call this funciton
        // direction = desc/asc
        if (direction === "descending") {
            setLaunches((launches) => {
                // sort here and return sorted array
            });
        } else {
            setLaunches((launches) => {
                // sort here and return sorted array
            });
        }
        // setLaunches = sorted list from current state of launches
    };

    const filterLaunches = (year) => {
        // setLaunches = launches from session storage filtered by year
        // {todos.filter((todo) => !todo.complete).length} left to do
    };

    useEffect(() => {
        getAllLaunches();
    }, []);

    // call getAllLaunches when hit refresh button

    return (
        <AppWrapper>
            <Header>
                {/* flexbox header bar. justify-content between. align refresh button end */}
                <div>
                    {/* logo */}
                    <img src={Logo} alt="Space X Logo" height="45px" />
                    <span>LAUNCHES</span>
                </div>
                <div className="refreshBtn">{/* refresh button */}</div>
            </Header>

            <main>
                <ContentWrapper>
                    {/* button go here. aligned on right */}
                    {/* page wrapper with flexbox justify-content-between */}
                    <LaunchWrapper>
                        <Left>
                            <img
                                src={launchHome1x}
                                alt="Photo of a launch"
                                srcSet={`${launchHome1x} 300w, ${launchHome2x} 768w, ${launchHome3x} 1240w`}
                                className="launchImage"
                                width="100%"
                            />
                        </Left>

                        <Right>
                            {/* loop over api return data and show on screen */}
                            {launches.map((launch) => (
                                <LaunchItem
                                    key={launch.mission_name}
                                    id={launch.flight_number}
                                    mission={launch.mission_name}
                                    rocket={launch.rocket.rocket_name}
                                    date={launch.launch_date_local}
                                />
                            ))}
                        </Right>
                    </LaunchWrapper>
                </ContentWrapper>
            </main>
        </AppWrapper>
    );
};

export default App;

// notes
// Designs are available from: [https://sketch.cloud/s/yyv1b/agmoaZP](https://sketch.cloud/s/yyv1b/agmoaZP)

// The API documentation is available from:
// Postman - [https://docs.spacexdata.com](https://docs.spacexdata.com/)
// GitHub - [https://github.com/r-spacex/SpaceX-API](https://github.com/r-spacex/SpaceX-API)

// ## Stories:

// - As a user, I want the ability to load the full list of SpaceX launches from the SpaceX API
// - As a user, I want the ability to reload the data to see any new changes
// - As a user, I want the ability to filter the launch list by year
// - As a user, I want the ability to sort all launches by date (ascending/descending)
