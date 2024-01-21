import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function Tile({
    contents,
    width = "210px",
    type = "blue",
    on_click = () => { }
}) {

    const base_style = {
        width: width,
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.1rem",
        boxShadow: "5px 5px 30px black",
        userSelect: "none"
    };

    const type_styles = {
        white: { background: "white", color: "black" },
        lightblue: { background: "#1a8bcf", color: "white", cursor: "pointer" },
        deepblue: { background: "#00359e", color: "white", cursor: "pointer" },
        blue: { background: "#204e79", color: "white" }
    }

    const mixed_style = { ...base_style, ...type_styles[type] }

    return (
        <div style={mixed_style} onClick={on_click}>
            {contents}
        </div>
    )
}

function nextModelType(current_type) {
    const type_map = {
        "Hourly": "Weekly",
        "Weekly": "Monthly",
        "Monthly": "Hourly"
    }
    return type_map[current_type];
}


function WaterConsumption() {
    const [model_types, set_model_types] = useState({
        "bluerock": "Hourly",
        "santateresa": "Hourly",
        "pryorfarms": "Hourly"
    })

    const [bluerock_range, set_bluerock_range] = useState(
        [{ startDate: new Date(), endDate: new Date(), key: 'selection' }]
    );
    const [santa_teresa_range, set_santa_teresa_range] = useState(
        [{ startDate: new Date(), endDate: new Date(), key: 'selection' }]
    );
    const [pryor_farms_range, set_pryor_farms_range] = useState(
        [{ startDate: new Date(), endDate: new Date(), key: 'selection' }]
    );

    const [current_display_date_range, set_current_display_date_range] = useState("");

    const bluerock_date_picker = <div style={{ height: "380px" }}>
        <DateRange
            editableDateInputs={true}
            onChange={item => set_bluerock_range([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={bluerock_range}
            months={2}
            direction="horizontal"
        />
    </div>

    const pryor_farms_date_picker = <div style={{ height: "380px" }}>
        <DateRange
            editableDateInputs={true}
            onChange={item => set_pryor_farms_range([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={pryor_farms_range}
            months={2}
            direction="horizontal"
        />
    </div>
    const santa_teresa_date_picker = <div style={{ height: "380px" }}>
        <DateRange
            editableDateInputs={true}
            onChange={item => set_santa_teresa_range([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={santa_teresa_range}
            months={2}
            direction="horizontal"
        />
    </div>

    const date_picker_holder = current_display_date_range === "" ?
        { display: "none" } : {
            width: "100%",
            height: "100%",
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            background: "rgb(0,0,0,0.5)"
        };

    function reformate_range(range_state) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        try {
            let start = range_state[0]["startDate"].toLocaleDateString('en-us', options);
            let end = range_state[0]["endDate"].toLocaleDateString('en-us', options);
            return `${start} - ${end}`;
        } catch (e) { return ""; }
    }

    const row_style = {
        display: "flex",
        gap: "20px",
        marginBottom: "20px"
    }

    return (
        <div style={{
            background: "linear-gradient(#001369, #0080b3)",
            minHeight: "100vh",
        }}>
            <div style={date_picker_holder}
                onClick={() => set_current_display_date_range("")}
            >
                <div onClick={e => e.stopPropagation()}>
                    {current_display_date_range === "bluerock" && bluerock_date_picker}
                    {current_display_date_range === "santa_teresa" && santa_teresa_date_picker}
                    {current_display_date_range === "pryor_farms" && pryor_farms_date_picker}
                </div>
            </div>
            <div style={{
                color: "white",
                fontSize: "2.7rem",
                fontWeight: "500",
                textAlign: "center",
                padding: "26px"
            }}>
                WATER CONSUMPTION FORECASTING
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
            }}>
                <div style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={row_style}>
                        <Tile contents="Site" type="white" width="210px" />
                        <Tile contents="Model Type" type="white" width="230px" />
                        <Tile contents="Forcasting Period" type="white" width="340px" />
                        <Tile contents="Individual" type="white" width="210px" />
                    </div>
                    <div style={row_style}>
                        <Tile contents="Blue Rock" type="blue" width="210px" />
                        <Tile contents={model_types["bluerock"]} type="lightblue"
                            width="230px"
                            on_click={() => set_model_types((old) => ({ ...old, "bluerock": nextModelType(old["bluerock"]) }))} />
                        <Tile
                            contents={reformate_range(bluerock_range)}
                            type="lightblue" width="340px"
                            on_click={() => set_current_display_date_range("bluerock")}
                        />
                        <Tile contents="Calculate" type="deepblue" width="210px" />
                    </div>
                    <div style={row_style}>
                        <Tile contents="Santa Teresa" type="blue" width="210px" />
                        <Tile contents={model_types["santateresa"]} type="lightblue"
                            width="230px"
                            on_click={() => set_model_types((old) => ({ ...old, "santateresa": nextModelType(old["santateresa"]) }))} />
                        <Tile
                            contents={reformate_range(santa_teresa_range)}
                            type="lightblue" width="340px"
                            on_click={() => set_current_display_date_range("santa_teresa")}
                        />
                        <Tile contents="Calculate" type="deepblue" width="210px" />
                    </div>
                    <div style={row_style}>
                        <Tile contents="Pryor Farms" type="blue" width="210px" />
                        <Tile contents={model_types["pryorfarms"]} type="lightblue"
                            width="230px"
                            on_click={() => set_model_types((old) => ({ ...old, "pryorfarms": nextModelType(old["pryorfarms"]) }))} />
                        <Tile
                            contents={reformate_range(pryor_farms_range)}
                            type="lightblue" width="340px"
                            on_click={() => set_current_display_date_range("pryor_farms")}
                        />
                        <Tile contents="Calculate" type="deepblue" width="210px" />
                    </div>
                </div>
                <div style={{
                    background: "white",
                    minWidth: "300px",
                    maxWidth: "310px",
                    padding: "20px 10px",
                    margin: "0px 20px"
                }}>
                    <div style={{ textAlign: "center" }}><b>Guidelines</b></div>
                    <ul>
                        <li>Minimum forecasting period: 24 hours</li>
                        <li>Maximum forecasting period: 1 year</li>
                        <li>Model Type: timestamp average</li>
                    </ul>
                    <div style={{ height: "20px" }} />
                    <div style={{ textAlign: "center" }}><b>Community Popultion (2024)</b></div>
                    <ul>
                        <li>BR: 16</li>
                        <li>ST: 34</li>
                        <li>PF: 36</li>
                    </ul>
                    <div style={{ textAlign: "center" }}><b>Links</b></div>
                    <ul>
                        <li>“Machine Learning Modeling of Water Use Patterns in Small Disadvantaged Communities” (Zhou et. al., 2021)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default WaterConsumption;