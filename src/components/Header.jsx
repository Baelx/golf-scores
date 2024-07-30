import tiger from '../tiger.png';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useContext } from 'react';
import { ModalContext } from '../utils/context';

export const Header = () => {
  const {showNewGameModal, setShowNewGameModal} = useContext(ModalContext);

  return (
    <header>
        <img src={tiger} className="App-logo" alt="logo" />
        <h1>Golf Scores</h1>
        <span className="heading-spacer"></span>
        <button className="new-game-btn"
                    variant="outlined"
                    color="info"
                    size="large"
                    onClick={() => setShowNewGameModal(true)}>
            <RefreshIcon />
        </button>
    </header>
  )
}