import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/button';
import { scoreStateTemplate } from '../utils/scoreData';
import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../context/modalContext';

export const ScoreCard = () => {
  const [scoreInputs, setScoreInputs] = useState(JSON.parse(window.localStorage.getItem('golf-score')) || scoreStateTemplate);
  const {showModal, setShowModal} = useContext(ModalContext);

  const handleFormChange = (index, event) => {
    const scoreData = [...scoreInputs];
    scoreData[index][event.target.name] = Number(event.target.value);
    console.log('change', scoreData)
    localStorage.setItem('golf-score', JSON.stringify(scoreData));
    setScoreInputs(scoreData);
  }

  const handleDownloadBtn = () => {
    console.log('lol');
  }

    return (
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Control placeholder='course' />
            </Col>
          </Row>
          <Row>
            <Col className="hole-column-header" xs={1}>
              <span>Hole</span>
            </Col>
            <Col className="par-column-header" xs={1}>
              <span>Par</span>
            </Col>
            <Col xs={5}>
              <span>P1</span>
            </Col>
            <Col xs={5}>
              <span>P2</span>
            </Col>
          </Row>
          {scoreInputs.map((score, i) => (
            <Row key={i}>
              <Col className="hole-column" xs={1}>
                <span>{i + 1}</span>
              </Col>
              <Col className="par-column" xs={1}>
                <span>3</span>
              </Col>
              <Col xs={5}>
                <Form.Control
                  placeholder='putts'
                  name="p1putt"
                  type="number"
                  value={score.p1putt}
                  onChange={(event) => handleFormChange(i, event)}
                />
                <Form.Control
                  placeholder='total'
                  name="p1total"
                  type="number"
                  value={score.p1total}
                  onChange={(event) => handleFormChange(i, event)}
                />
              </Col>
              <Col xs={5}>
                <Form.Control
                  placeholder='putts'
                  name="p2putt"
                  type="number"
                  value={score.p2putt}
                  onChange={(event) => handleFormChange(i, event)}
                />
                <Form.Control
                    placeholder='total'
                    name="p2total"
                    type="number"
                    value={score.p2total}
                    onChange={(event) => handleFormChange(i, event)}
                />
              </Col>
            </Row>
            ))}
        </Form>
        <Row className="button-row">
          <Col>
            <Button className="download-btn" variant="dark">Download data</Button>
          </Col>
        </Row>
        <Row className="button-row">
          <Col>
            <Button variant="danger" onClick={() => setShowModal(true)}>Clear data</Button>
          </Col>
        </Row>
      </Container>
    );
}