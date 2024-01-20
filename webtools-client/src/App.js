import logo from './logo.svg';
import './App.css';

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
  lower_text
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
        {upper_text}
      </div>
      <div style={{
        padding: "5px"
      }}>
        <input style={input_style}
          type="text" name="name" />
      </div>
      <div style={{
        color: "#ffa200",
      }}
      >
        {lower_text}
      </div>
    </div>
  )
}

function MembraneSelect() {
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
        <select value="ZZZ" style={input_style}>
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
    // border: "10px red solid"
  };

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
    fontFamily: font_family
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
              <InputComponent upper_text="Temperature" lower_text="15-25°C" />
              <InputComponent upper_text="Bulk Nitrate" lower_text="27-185 mg/L" />
              <InputComponent upper_text="Bulk Salt" lower_text="1450-4800 mg/L" />
              <InputComponent upper_text="Transmembrane Pressure" lower_text="160-230 PSI" />
              <MembraneSelect />
              <button style={calculate_button_style} onClick={()=>{console.log("clicked")}}>
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
