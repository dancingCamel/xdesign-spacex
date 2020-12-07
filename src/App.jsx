import "./App.css";
// build css from scss here
// https://techcookbook.com/react/use-scss-with-create-react-app#:~:text=%20Use%20SCSS%20with%20create-react-app%20%201%20Building,contents%20into%20the%20body%20of%20the...%20More%20
import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import LaunchItem from "./components/LaunchItem";

const PageWrapper = styled.div`
    display: flex;
    justify-content: between;
`;
const Left = styled.div`
    width: 40%;
`;
const Right = styled.div`
    width: 60%;
`;

const App = () => {
    // hit api when page loads using hook
    // call api when hit refresh button - save data to somewhere

    // have function to sort return data using data from memory
    // have another function that filters data by year / filter is a state that changes the api call - watch for it changing. should be a dropdown

    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            <body>
                <PageWrapper>
                    {/* page wrapper with flexbox justify-content-between */}
                    <Left>
                        {/* import image at 80 vh and vertically centered with flexbox */}
                    </Left>

                    <Right>
                        {/* buttons div with styled components. flexbox flex end*/}
                        {/* loop over api return data and show on screen */}
                    </Right>
                </PageWrapper>
            </body>
        </div>
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
