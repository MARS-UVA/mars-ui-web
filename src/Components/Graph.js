import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis } from 'recharts';
//rechart may not be the best choice due to animation

export default function MCurrentGraph() {
    const data = [
        {
            name: "Page A",
            x: 200,
            pv: 2400,
            amt: 2230
        },
        {
            name: "Page B",
            x: 300,
            pv: 1398,
            amt: 2210
        },
        {
            name: "Page C",
            x: 400,
            pv: 9800,
            amt: 2290
        },
        {
            name: "Page D",
            x: 500,
            pv: 3908,
            amt: 2000
        },
        {
            name: "Page E",
            x: 600,
            pv: 4800,
            amt: 2181
        },
        {
            name: "Page F",
            x: 700,
            pv: 3800,
            amt: 2500
        },
        {
            name: "Page G",
            x: 800,
            pv: 4300,
            amt: 2100
        }];

    const renderLineChart = (
        <div>
            <LineChart width={400} height={400} data={data}>
                <XAxis dataKey="name"  padding={{ left: 30, right: 30 }}/>
                <Line type="monotone" dataKey="x" stroke="#8884d8" />
            </LineChart>
        </div>

    );

    return (
        <div>
            {renderLineChart}
        </div>
    )
}