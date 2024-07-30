import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/container';
import { useContext, useEffect, useState } from 'react';
import { ModalContext, ScoreCardContext } from '../utils/context';
import { clearLocalStorage } from '../utils/localStorageService';

export const NewGameModal = () => {
  const {showNewGameModal, setShowNewGameModal} = useContext(ModalContext);
  const {formOptions, setFormOptions} = useContext(ModalContext);
  const {clearScoreCardForm, setClearScoreCardForm} = useContext(ScoreCardContext);
  const [confirmNewGame, setConfirmNewGame] = useState(false);
  const {courseName, setCourseName} = useContext(ModalContext);
  const {playerCount, setPlayerCount} = useContext(ModalContext);
  const {trackPutts, setTrackPutts} = useContext(ModalContext);

  useEffect(() => {
    if (confirmNewGame) {
        clearLocalStorage();
        setClearScoreCardForm(true);
    }
  }, [confirmNewGame])

  return (
    <div className="new-game-modal">
      <Modal centered show={showNewGameModal} onHide={() => setShowNewGameModal(false)}>
        { confirmNewGame ? <div>
            <Modal.Body>
                <Container>
                    <Form>
                        <Row>
                            <Col className="course-column">
                            <label htmlFor="course">Course</label>
                            <Form.Control id="course" type="text" value={courseName} onChange={event => setCourseName(event.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Players</label>
                                <div className='players-radio'>
                                    <Form.Check
                                        inline
                                        label="1"
                                        value={1}
                                        defaultChecked
                                        name="player-count"
                                        type='radio'
                                        onChange={event => setPlayerCount(event.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="2"
                                        value={2}
                                        name="player-count"
                                        type='radio'
                                        onChange={event => setPlayerCount(event.target.value)}
                                    />
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='track-putts-checkbox'>
                                    <Form.Check
                                        inline
                                        label="Track putts separately"
                                        type='checkbox'
                                        value={trackPutts}
                                        onChange={event => setTrackPutts(event.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' className='new-game-button' onClick={() => setShowNewGameModal(false)}>
                    New Game
                </Button>
            </Modal.Footer>
        </div> :
        <div>
            <Modal.Body>
                <p>This will clear the current score.</p>
                <p>Do you wish to proceed?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowNewGameModal(false)}>
                    Cancel
                </Button>
                <Button variant='primary' onClick={() => setConfirmNewGame(true)}>
                    New Game
                </Button>
            </Modal.Footer>
        </div> }
      </Modal>
    </div>
  );
}