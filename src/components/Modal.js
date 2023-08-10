import React from "react";

import Modal from "react-modal";

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal"
      overlayClassName="react-modal-overlay"
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
