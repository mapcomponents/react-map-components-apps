import MlLaufwettbewerbApp from "./components/MlLaufwettbewerbApp/MlLaufwettbewerbApp";
import { AppContextProvider } from "./components/MlLaufwettbewerbApp/assets/AppContext";
import './App.css';

function App() {
  return (
    <AppContextProvider>
      <div className="lw_map">
        <MlLaufwettbewerbApp />
      </div>
    </AppContextProvider>
  );
}

export default App;
