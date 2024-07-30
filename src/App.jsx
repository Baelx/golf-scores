import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Header } from './components/Header';
import { ScoreCard } from './components/ScoreCard';
import { Footer } from './components/Footer';
import { ModalContext, ScoreCardContext } from './utils/context';
import { useState } from 'react';
import { NewGameModal } from './components/NewGameModal';

function App() {
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [clearScoreCardForm, setClearScoreCardForm] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [playerCount, setPlayerCount] = useState(1);
  const [trackPutts, setTrackPutts] = useState(false);

  return (
    <ModalContext.Provider value={{
        showNewGameModal,
        setShowNewGameModal,
        courseName,
        setCourseName,
        playerCount,
        setPlayerCount,
        trackPutts,
        setTrackPutts
      }}>
      <div className="App">
        <Header />
        <main>
          <ScoreCardContext.Provider value={{clearScoreCardForm, setClearScoreCardForm}}>
            <ScoreCard />
            <NewGameModal />
          </ScoreCardContext.Provider>
        </main>
        <Footer />
      </div>
    </ModalContext.Provider>
  );
}

export default App;
