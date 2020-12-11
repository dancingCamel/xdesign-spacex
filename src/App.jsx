import "./App.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LaunchItem from "./components/LaunchItem";
import Logo from "./assets/spacex-logo.png";
import launchHome1x from "./assets/img/launch-home.png";
import launchHome2x from "./assets/img/launch-home@2x.png";
import launchHome3x from "./assets/img/launch-home@3x.png";
import refresh1x from "./assets/icon/refresh.png";
import refresh2x from "./assets/icon/refresh@2x.png";
import refresh3x from "./assets/icon/refresh@3x.png";
import select1x from "./assets/icon/select.png";
import select2x from "./assets/icon/select@2x.png";
import select3x from "./assets/icon/select@3x.png";
import sort1x from "./assets/icon/sort.png";
import sort2x from "./assets/icon/sort@2x.png";
import sort3x from "./assets/icon/sort@3x.png";

const AppWrapper = styled.div.attrs({ className: "app" })``;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    min-height: 8vh;
    font-size: calc(10px + 1vmin);
    padding: 10px 0px 0px 0px;
`;

const ContentWrapper = styled.div``;

const ButtonWrapper = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 30px;
    margin-bottom: 5px;
    padding-right: 50px;
    width: 400px;
`;

const LaunchWrapper = styled.section``;
const Left = styled.div`
    float: left;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
`;
const Right = styled.div`
    float: right;
    width: 50%;
    margin-right: 60px;
`;

const App = () => {
    const [launches, setLaunches] = useState([]);
    const [sortDirection, setSortDirection] = useState("ascending");
    const [directionDisplay, setDirectionDisplay] = useState("Descending");

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
        // direction = desc/asc
        if (direction === "descending") {
            setLaunches((launches) => {
                let temp = launches;
                // sort here and return sorted array
                temp.sort(function (a, b) {
                    return a.flight_number - b.flight_number;
                });
                return temp;
            });
        } else {
            setLaunches((launches) => {
                let temp = launches;
                // sort here and return sorted array
                temp.sort(function (a, b) {
                    return b.flight_number - a.flight_number;
                });
                return temp;
            });
        }
        // setLaunches = sorted list from current state of launches
    };

    const filterLaunches = (year) => {
        // setLaunches = launches from session storage filtered by year
        let allLaunches = JSON.parse(sessionStorage.getItem("latestLaunches"));
        allLaunches = allLaunches.filter(
            (launch) => launch.launch_year == year
        );
        console.log(allLaunches);
        // {todos.filter((todo) => !todo.complete).length} left to do
    };

    useEffect(() => {
        getAllLaunches();
    }, []);

    // call getAllLaunches when hit refresh button

    const handleSortclick = () => {
        console.log("clicked sort");

        setSortDirection((direction) => {
            if (direction === "ascending") {
                setDirectionDisplay("Ascending");
                return "descending";
            }
            setDirectionDisplay("Descending");

            return "ascending";
        });

        sortLaunches(sortDirection);
    };

    const handleReloadClick = () => {
        console.log("clicked reload");
        getAllLaunches();
        setSortDirection("ascending");
        setDirectionDisplay("Descending");
    };

    return (
        <AppWrapper>
            <Header>
                {/* flexbox header bar. justify-content between. align refresh button end */}
                <div>
                    {/* logo */}
                    <img src={Logo} alt="Space X Logo" id="logoImg" />
                    <span id="spacedText" className="normalFont">
                        LAUNCHES
                    </span>
                </div>
                <div id="refreshBtn" onClick={handleReloadClick}>
                    {/* refresh button */}
                    Reload Data
                    <img
                        src={refresh1x}
                        alt="Refresh Icon"
                        srcSet={`${refresh1x} 300w, ${refresh2x} 768w, ${refresh3x} 1240w`}
                        id="refreshIcon"
                    />
                </div>
            </Header>

            <main>
                <ContentWrapper>
                    {/* button go here. aligned on right */}
                    {/* page wrapper with flexbox justify-content-between */}
                    <ButtonWrapper>
                        <div className="select">
                            <select id="yearFilter">
                                <option value="">Filter by Year</option>
                                {/* dynamically update years */}
                            </select>
                        </div>
                        <div id="sortBtn" onClick={handleSortclick}>
                            Sort {directionDisplay}
                            <img
                                src={sort1x}
                                alt="Sort Icon"
                                srcSet={`${sort1x} 300w, ${sort2x} 768w, ${sort3x} 1240w`}
                                id="sortIcon"
                            />
                        </div>
                    </ButtonWrapper>

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
                                    date={launch.launch_date_unix}
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
