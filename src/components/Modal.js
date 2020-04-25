import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = props => {
  const { imageToggle, onClose, payload, modalId } = props;
  console.log(payload.url);
  return imageToggle && modalId === payload.id ? (
    <div className="modal-container">
      <div onClick={() => onClose} />
      <img className="madal-img" src={payload.url} alt="" />
    </div>
  ) : (
    <></>
  );
};

export default Modal;
