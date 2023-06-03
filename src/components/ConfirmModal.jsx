import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { ModalContext, ScoreCardContext } from '../utils/context';
import { clearLocalStorage } from '../utils/localStorageService';

export const ConfirmModal = () => {
  const {showModal, setShowModal} = useContext(ModalContext);
  const {clearScoreCardForm, setClearScoreCardForm} = useContext(ScoreCardContext);

  const handleClearData = () => {
    clearLocalStorage();
    setClearScoreCardForm(true);
    setShowModal(false);
  }

  return (
    <div className="clear-data-modal">
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>Are you sure you wish to clear the current score data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearData}>
            Clear data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}