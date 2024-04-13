import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ModalComponent({ open, toggle }) {
  const [card, setCard] = useState("");
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>Add your Card</ModalHeader>
        <ModalBody>
          <select
            name=""
            id=""
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="form-control"
          >
            <option value="Visa">Visa</option>
            <option value="Humo">Humo</option>
            <option value="UzCard">UzCard</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button onClick={toggle} className="btn btn-info">
            Order
          </button>
          <button onClick={toggle} className="btn btn-light border">
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
