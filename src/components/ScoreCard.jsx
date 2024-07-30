import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/button';
import { prepareStateJsonForCsvConversion, convertJsonToCsv, downloadCsv } from '../utils/csv';
import { scoreStateTemplate } from '../utils/scoreData';
import { useState, useEffect, useContext } from 'react';
import { ModalContext, ScoreCardContext } from '../utils/context';

export const ScoreCard = () => {
  const [scoreInputs, setScoreInputs] = useState(JSON.parse(localStorage.getItem('golf-score')) || scoreStateTemplate);
  const {courseName, setCourseName} = useContext(ModalContext);
  const {playerCount, setPlayerCount} = useContext(ModalContext);
  const {trackPutts, setTrackPutts} = useContext(ModalContext);
  const {clearScoreCardForm, setClearScoreCardForm} = useContext(ScoreCardContext);

  const handleFormChange = (index, event) => {
    const scoreData = [...scoreInputs];
    scoreData[index][event.target.name] = Number(event.target.value);
    // if (Number.isInteger(event.target.value)) {
    //   event.target.style
    // }
    localStorage.setItem('golf-score', JSON.stringify(scoreData));
    setScoreInputs(scoreData);
  }

  const handleDownloadBtn = () => {
    const preparedJson = prepareStateJsonForCsvConversion(scoreInputs, courseName);
    const csvData = convertJsonToCsv(preparedJson);
    downloadCsv(csvData);
  }

  useEffect(() => {
    if (clearScoreCardForm) {
      setScoreInputs(scoreStateTemplate);
    }
  }, [clearScoreCardForm]);

  useEffect(() => {
    if (clearScoreCardForm) {
      setClearScoreCardForm(false);
    }
  }, [scoreInputs]) 

    return (
      <Container>
        <Form>
        <Row>
          <h2 className='course-heading'>{courseName}</h2>
        </Row>
          <Row>
            <Col className="hole-column-header" xs={1}>
              <span>Hole</span>
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
              <Col xs={5}>
                <label>
                  Putts
                </label>
                <Form.Control
                  className="score-input"
                  placeholder='putts'
                  name="p1putt"
                  type="number"
                  inputMode="numeric"
                  value={score.p1putt}
                  onChange={(event) => handleFormChange(i, event)}
                />
                <label>
                  Total
                </label>
                <Form.Control
                  className="score-input"
                  placeholder='total'
                  name="p1total"
                  type="number"
                  inputMode="numeric"
                  value={score.p1total}
                  onChange={(event) => handleFormChange(i, event)}
                />
              </Col>
              <Col xs={5}>
                <label>
                  Putts
                </label>
                <Form.Control
                  className="score-input"
                  placeholder='putts'
                  name="p2putt"
                  type="number"
                  inputMode="numeric"
                  value={score.p2putt}
                  onChange={(event) => handleFormChange(i, event)}
                />
                <label>
                  Total
                </label>
                <Form.Control
                    className="score-input"
                    placeholder='total'
                    name="p2total"
                    type="number"
                    inputMode="numeric"
                    value={score.p2total}
                    onChange={(event) => handleFormChange(i, event)}
                />
              </Col>
            </Row>
            ))}
        </Form>
        <Row className="button-row">
          <Col>
            <Button className="download-btn" variant="primary" onClick={handleDownloadBtn}>Download data</Button>
          </Col>
        </Row>
      </Container>
    );
}