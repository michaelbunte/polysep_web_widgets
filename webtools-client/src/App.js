import './App.css';
import React, { useState } from 'react';

const font_family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
const input_style = {
  fontFamily: font_family,
  width: "170px",
  background: "white",
  color: "black",
  padding: "5px",
  borderRadius: "3px",
  border: "none"
};

function InputComponent({
  upper_text,
  lower_text,
  on_change = () => { },
  inner_value,
  min = 0,
  max = 10
}) {

  const is_valid = parseFloat(inner_value) >= min && parseFloat(inner_value) <= max;
  const error_style = is_valid || inner_value === "" ? { color: "rgba(0,0,0,0)", userSelect: "none" } : { color: "#ff6868"};

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0px"
    }}>
      <div style={{
        fontSize: "1.2rem",
        color: "white",
      }}>
        {upper_text}
      </div>
      <div style={{
        padding: "5px"
      }}>
        <input style={input_style}
          type="text" name="name" onChange={on_change} value={inner_value}
        />
      </div>
      <div style={{
        color: "#ffa200",
      }}
      >
        {lower_text}
      </div>
      <div style={error_style}>Invalid Input</div>
    </div>
  )
}

function MembraneSelect({
  inner_value,
  on_change = () => { }
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px"
    }}>
      <div style={{
        fontSize: "1.2rem",
        color: "white",
      }}>
        Membrane Type
      </div>
      <div style={{
        padding: "5px"
      }}>
        <select value={inner_value} style={input_style} onChange={on_change}>
          <option value="CSM RE4040BE">CSM RE4040BE</option>
          <option value="HID RO4040HF">HID RO4040HF</option>
        </select>
      </div>
    </div>
  )
}

function TextSideComponent({ outer_text, inner_text }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center"
    }}>
      <div style={{ color: "white" }}>
        {outer_text}
      </div>
      <div style={{
        width: "100px",
        background: "rgba(0,0,0,0)",
        color: "white",
        padding: "5px",
        margin: "10px",
        borderRadius: "3px",
        border: "2px solid white"
      }}>
        {inner_text}
      </div>
    </div>
  );
}

function TextTopComponent({ outer_text, inner_text }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "10px"
    }}>
      <div style={{
        color: "#ffa200",
        fontSize: "1.3rem"
      }}>
        {outer_text}
      </div>
      <div style={{
        width: "100px",
        background: "rgba(0,0,0,0)",
        color: "white",
        padding: "5px",
        margin: "10px",
        borderRadius: "3px",
        border: "2px solid white"
      }}>
        {inner_text}
      </div>
    </div>
  );
}


function App() {
  const [form_values, set_form_values] = useState({
    "temperature": { "value": "", "min": 15, "max": 25, "type": "text", },
    "bulknitrate": { "value": "", "min": 27, "max": 185, "type": "text", },
    "bulksalt": { "value": "", "min": 1450, "max": 4800, "type": "text", },
    "transmembranepressure": { "value": "", "min": 160, "max": 230, "type": "text", },
    "membranetype": { "value": "CSM RE4040BE", "type": "dropdown" }
  });

  function update_value(field_name) {
    return (e) => {
      const re = /^-?[0-9]*\.?[0-9]*$/;
      if (re.test(e.target.value) || e.target.value === "") {
        set_form_values((old) => ({ ...old, [field_name]: { ...old[field_name], "value": e.target.value } }))
      }
    };
  }

  function query_database() {
    // TODO
  }

  const category_style = {
    color: "#ffa200",
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "10px"
  };

  const inner_column_style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "340px",
  };


  // Coding like this isn't best practice but I really wanted to do this as 
  // a one liner
  // Sums up all of the invalid fields and checks if it's equal to 0
  let all_fields_valid = Object.keys(form_values).map(
    key => (form_values[key]["type"] === "text" &&
      (parseFloat(form_values[key]["value"]) > form_values[key]["max"] ||
      parseFloat(form_values[key]["value"]) < form_values[key]["min"] ||
        Number.isNaN(parseFloat(form_values[key]["value"])))
    ) ? 1 : 0
  ).reduce((x, y) => x + y, 0) === 0;


  const calculate_button_style = {
    marginTop: "20px",
    background: "rgba(0,0,0,0)",
    border: "2px white solid",
    color: "white",
    textAlign: "center",
    padding: "20px",
    fontSize: "1.4rem",
    borderRadius: "10px",
    fontWeight: "500",
    fontFamily: font_family,
    cursor: all_fields_valid ? "pointer" : "not-allowed",
    opacity: all_fields_valid ? "1" : "0.4"
  }


  return (
    <div >
      <div
        style={{
          background: "radial-gradient(#000000, #010f2e)",
          minHeight: "100vh"
        }}
      >
        <div style={{
          color: "white",
          textAlign: "center",
          padding: "20px",
          fontSize: "2rem",
          fontWeight: "500"
        }}>
          SOLUTE PERMEABILITY COEFFICIENT
        </div>
        <div style={{ margin: "0px 30px" }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            flexWrap: "wrap"
          }}
          >
            <div style={inner_column_style} >
              <div style={category_style}>
                INPUT PARAMETERS
              </div>
              <InputComponent
                upper_text="Temperature" lower_text="15-25°C"
                inner_value={form_values["temperature"]["value"]}
                min={form_values["temperature"]["min"]}
                max={form_values["temperature"]["max"]}
                on_change={update_value("temperature")}
              />
              <InputComponent
                upper_text="Bulk Nitrate" lower_text="27-185 mg/L"
                inner_value={form_values["bulknitrate"]["value"]}
                min={form_values["bulknitrate"]["min"]}
                max={form_values["bulknitrate"]["max"]}
                on_change={update_value("bulknitrate")}
              />
              <InputComponent
                upper_text="Bulk Salt" lower_text="1450-4800 mg/L"
                inner_value={form_values["bulksalt"]["value"]}
                min={form_values["bulksalt"]["min"]}
                max={form_values["bulksalt"]["max"]}
                on_change={update_value("bulksalt")}
              />
              <InputComponent
                upper_text="Transmembrane Pressure" lower_text="160-230 PSI"
                inner_value={form_values["transmembranepressure"]["value"]}
                min={form_values["transmembranepressure"]["min"]}
                max={form_values["transmembranepressure"]["max"]}
                on_change={update_value("transmembranepressure")}
              />
              <MembraneSelect
                inner_value={form_values["membranetype"]["value"]}
                on_change={(e) => { set_form_values((old) => ({ ...old, "membranetype": { ...old["membranetype"], "value": e.target.value } })) }}
              />
              <button
                style={calculate_button_style}
                onClick={all_fields_valid ? query_database : () => { }}
              >
                CALCULATE
              </button>
            </div>

            <div style={inner_column_style}>
              <div style={category_style}>
                OUTPUT PARAMETERS
              </div>
              <TextSideComponent outer_text={"Bₛ"} inner_text={"1234"} />
              <TextSideComponent outer_text={"Bₙ"} inner_text={"1234"} />
              <TextTopComponent outer_text={"Nitrate Passage %"} inner_text={"1234"} />
              <TextTopComponent outer_text={"Salt Passage %"} inner_text={"1234"} />
            </div>

            <div style={inner_column_style}>
              <div style={{ color: "white" }}>
                <div style={category_style}> ADDITIONAL INFORMATION </div>
                <ul>
                  <li>Bulk Nitrate, Bulk Salt: average between RO module feed and concentrate</li>
                  <li>Bulk Salt: difference between</li>
                  <li>CSM RE4040BE Specifications:</li>
                  <li>HID RO4040HF Specifications:</li>
                </ul>
                <div style={{ height: "40px" }} />
                <div style={category_style}> EQUATIONS </div>
                <ul>
                  <li>blah blah</li>
                </ul>
                <div style={{ height: "40px" }} />
                <div style={category_style}> LINKS </div>
                <ul>
                  <li>“Investigation into the Factors Affecting the Salt and Nitrate Passage Correlation for Reverse Osmosis Water Treatment” (Marki et. al., 2024). </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
