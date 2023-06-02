import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Header } from './components/Header';
import { ScoreCard } from './components/ScoreCard';
import { Footer } from './components/Footer';
import { ModalContext } from './context/modalContext';
import { useState } from 'react';
import { ConfirmModal } from './components/ConfirmModal';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ModalContext.Provider value={{showModal, setShowModal}}>
      <div className="App">
        <Header />
        <main>
          <ScoreCard />
        </main>
        <Footer />
        <ConfirmModal />
      </div>
    </ModalContext.Provider>
  );
}

export default App;
