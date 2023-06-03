import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Header } from './components/Header';
import { ScoreCard } from './components/ScoreCard';
import { Footer } from './components/Footer';
import { ModalContext, ScoreCardContext } from './utils/context';
import { useState } from 'react';
import { ConfirmModal } from './components/ConfirmModal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [clearScoreCardForm, setClearScoreCardForm] = useState(false);

  return (
    <ModalContext.Provider value={{showModal, setShowModal}}>
      <div className="App">
        <Header />
        <main>
          <ScoreCardContext.Provider value={{clearScoreCardForm, setClearScoreCardForm}}>
            <ScoreCard />
            <ConfirmModal />
          </ScoreCardContext.Provider>
        </main>
        <Footer />
      </div>
    </ModalContext.Provider>
  );
}

export default App;
