import HomeNavigationBar from "./HomeNavigationBar";
import HomeSectionOne from "./HomeSectionOne";
import HomeSectionTwo from "./HomeSectionTwo";
import HomeSectionThree from "./HomeSectionThree";
import HomeSectionFour from "./HomeSectionFour";
import HomeSectionFooter from "./HomeSectionFooter";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import HomeNavigationBarUsers from "./HomeNavigationBarUsers";

function Home() {

    return (
        <>
            <HomeSectionOne/>
            <HomeSectionTwo />
            <HomeSectionThree />
            <HomeSectionFour />
            <HomeSectionFooter />
        </>
    )
}

export default Home;