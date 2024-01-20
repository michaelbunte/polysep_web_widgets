import logo from './logo.svg';
import './App.css';

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
        <input type="text" name="name" />
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
        <select value="ZZZ">
          <option value="CSM RE4040BE">CSM RE4040BE</option>
          <option value="HID RO4040HF">HID RO4040HF</option>
        </select>
      </div>
    </div>
  )
}

function SideComponent({ outer_text, inner_text }) {
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
        background: "white",
        color: "black",
        padding: "5px",
        margin: "10px",
        borderRadius: "3px"
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
    alignItems: "center"
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
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "100px"
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
            <button style={calculate_button_style}>
              CALCULATE
            </button>
          </div>

          <div style={inner_column_style}>
            <div style={category_style}>
              OUTPUT PARAMETERS
            </div>
            <SideComponent outer_text={"Bₛ"} inner_text={"1234"} />
            <SideComponent outer_text={"Bₙ"} inner_text={"1234"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
