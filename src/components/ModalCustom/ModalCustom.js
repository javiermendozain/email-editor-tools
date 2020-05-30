// Dependencies
import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalCustom = ({
  isOpen,
  toggle,
  body = "",
  header = "",
  footer = "",
}) => {
  return (
    <>
      <Modal size="lg" isOpen={isOpen} toggle={toggle}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </Modal>
    </>
  );
};

export default ModalCustom;
