import { Modal, Row, Col } from "react-bootstrap";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
const EmployeeDetailsModif = ({ beforeDetails, afterDetails, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Employee Details - Before & After Modification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Details "Before" */}
          <Col sm={5}>
            <div className="employee-details">
              <img
                src={beforeDetails.image}
                style={{ maxWidth: "30%" }}
                alt="Employee"
              />
              <div>
                <strong>
                  {beforeDetails.firstname} {beforeDetails.lastname}
                </strong>
                <p>Email: {beforeDetails.email}</p>
                <p>Phone: {beforeDetails.phone}</p>
                <p>Job: {beforeDetails.job}</p>
              </div>
            </div>
          </Col>
          <Col
            sm={2}
            className="d-flex align-items-center justify-content-center"
          >
            <FaRegArrowAltCircleRight style={{ fontSize: "3rem" }} />
          </Col>
          {/* Details "After" */}
          <Col sm={5}>
            <div className="employee-details">
              <img
                src={afterDetails.image}
                style={{ maxWidth: "30%" }}
                alt="Employee"
              />
              <div>
                <strong>
                  {afterDetails.firstname} {afterDetails.lastname}
                </strong>
                <p>Email: {afterDetails.email}</p>
                <p>Phone: {afterDetails.phone}</p>
                <p>Job: {afterDetails.job}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeDetailsModif;