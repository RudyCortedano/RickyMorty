import "./styles/style.css";
import Home from "./components/Home";
import RickyMortyProvider from "./context/RickyMortyContext";

function App() {
  return (
    <RickyMortyProvider>
      <div className="App">
        <Home />
      </div>
    </RickyMortyProvider>
  );
}

export default App;
