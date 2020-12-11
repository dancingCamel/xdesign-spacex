import "./App.css";
import React, { useEffect, useState, useRef } from "react";
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
    const [loadCount, setLoadCount] = useState(0);
    const [launches, setLaunches] = useState([]);
    const [sortDirection, setSortDirection] = useState("ascending");
    const [directionDisplay, setDirectionDisplay] = useState("Descending");
    const [years, setYears] = useState([]);

    const yearFilterRef = useRef();

    const getAllLaunches = async () => {
        const latestLaunches = await fetch(
            "https://api.spacexdata.com/v3/launches"
        );
        const latestLaunchesJson = await latestLaunches.json();

        sessionStorage.setItem(
            "latestLaunches",
            JSON.stringify(latestLaunchesJson)
        );

        setLaunches((current) => {
            return latestLaunchesJson;
        });
        setLoadCount((count) => {
            return (count += 1);
        });
    };

    const getYears = () => {
        let years = [];

        launches.forEach((launch) => {
            if (!years.includes(launch.launch_year)) {
                years.push(launch.launch_year);
            }
        });

        const yearsOptions = years.map((year, i) => {
            return (
                <option key={i} value={year}>
                    {year}
                </option>
            );
        });

        setYears(yearsOptions);
    };

    const sortLaunches = (direction) => {
        if (direction === "descending") {
            setLaunches((launches) => {
                let temp = launches;

                temp.sort(function (a, b) {
                    return a.flight_number - b.flight_number;
                });

                return temp;
            });
        } else {
            setLaunches((launches) => {
                let temp = launches;

                temp.sort(function (a, b) {
                    return b.flight_number - a.flight_number;
                });

                return temp;
            });
        }
    };

    const filterLaunches = (year) => {
        let allLaunches = JSON.parse(sessionStorage.getItem("latestLaunches"));
        let filteredLaunches;
        filteredLaunches = allLaunches.filter(
            (launch) => launch.launch_year == year
        );

        setLaunches(filteredLaunches);
    };

    useEffect(() => {
        getAllLaunches();
    }, []);

    useEffect(() => {
        getYears();
    }, [loadCount]);

    const handleSortclick = () => {
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
        getAllLaunches();
        setSortDirection("ascending");
        setDirectionDisplay("Descending");
        yearFilterRef.current.value = "";
    };

    const handleFilterYear = () => {
        if (yearFilterRef.current.value === "") {
            const allLaunches = JSON.parse(
                sessionStorage.getItem("latestLaunches")
            );
            setLaunches((current) => {
                return allLaunches;
            });
            setSortDirection("ascending");
            setDirectionDisplay("Descending");
        } else {
            filterLaunches(yearFilterRef.current.value);
        }
    };

    return (
        <AppWrapper>
            <Header>
                <div>
                    <img src={Logo} alt="Space X Logo" id="logoImg" />
                    <span id="spacedText" className="normalFont">
                        LAUNCHES
                    </span>
                </div>
                <div id="refreshBtn" onClick={handleReloadClick}>
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
                    <ButtonWrapper>
                        <div className="select">
                            <select
                                id="yearFilter"
                                ref={yearFilterRef}
                                onChange={handleFilterYear}
                            >
                                <option value="">Filter by Year</option>
                                {/* dynamically update years */}
                                {years}
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

// Designs are available from: [https://sketch.cloud/s/yyv1b/agmoaZP](https://sketch.cloud/s/yyv1b/agmoaZP)
