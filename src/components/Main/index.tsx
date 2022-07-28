import React, { useState } from "react";
import Tabs from "../Tabs";
import Navbar from "../Navbar";

const Main = () => {
    const [tab, setTab] = useState('1');

    return (
        <div className="min-h-screen dark:bg-[#131619] transition ease-in-out delay-150">
            <Navbar tab={tab} setTab={setTab} />
            <Tabs tab={tab} />
        </div>
    )
}

export default Main;