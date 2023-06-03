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
  const [courseName, setCourseName] = useState(localStorage.getItem('course-name') || '');
  const [scoreInputs, setScoreInputs] = useState(JSON.parse(localStorage.getItem('golf-score')) || scoreStateTemplate);
  const {showModal, setShowModal} = useContext(ModalContext);
  const {clearScoreCardForm, setClearScoreCardForm} = useContext(ScoreCardContext);

  const handleFormChange = (index, event) => {
    const scoreData = [...scoreInputs];
    scoreData[index][event.target.name] = Number(event.target.value);
    localStorage.setItem('golf-score', JSON.stringify(scoreData));
    setScoreInputs(scoreData);
  }

  const handleCourseChange = (event) => {
    setCourseName(event.target.value);
    localStorage.setItem('course-name', event.target.value);
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
            <Col className="course-column">
              <label>Course</label>
              <Form.Control placeholder='course' onChange={handleCourseChange}/>
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
                <label>
                  Putts
                </label>
                <Form.Control
                  placeholder='putts'
                  name="p1putt"
                  type="number"
                  pattern="[0-9]*"
                  value={score.p1putt}
                  onChange={(event) => handleFormChange(i, event)}
                />
                <label>
                  Total
                </label>
                <Form.Control
                  placeholder='total'
                  name="p1total"
                  type="number"
                  pattern="[0-9]*"
                  value={score.p1total}
                  onChange={(event) => handleFormChange(i, event)}
                />
              </Col>
              <Col xs={5}>
                <label>
                  Putts
                </label>
                <Form.Control
                  placeholder='putts'
                  name="p2putt"
                  type="number"
                  pattern="[0-9]*"
                  value={score.p2putt}
                  onChange={(event) => handleFormChange(i, event)}
                />
                <label>
                  Total
                </label>
                <Form.Control
                    placeholder='total'
                    name="p2total"
                    type="number"
                    pattern="[0-9]*"
                    value={score.p2total}
                    onChange={(event) => handleFormChange(i, event)}
                />
              </Col>
            </Row>
            ))}
        </Form>
        <Row className="button-row">
          <Col>
            <Button className="download-btn" variant="dark" onClick={handleDownloadBtn}>Download data</Button>
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