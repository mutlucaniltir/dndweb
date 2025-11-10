import './App.css';
import CharacterStatus from './components/CharacterStatus';
import Inventory from './components/Inventory';
import Chat from './components/Chat'; // Renamed from ChatLog to Chat

function App() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column p-3">
      <div className="row flex-grow-1">
        <div className="col-md-3">
          <CharacterStatus />
        </div>
        <div className="col-md-6">
          <Chat />
        </div>
        <div className="col-md-3">
          <Inventory />
        </div>
      </div>
    </div>
  );
}

export default App;
