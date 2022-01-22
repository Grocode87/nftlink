import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ show, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
    };
  
    const modalContent = show ? (
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25 z-50">
        <div className="bg-white w-96 h-60 rounded-2xl p-4 px-8">
          <div className="flex justify-between text-xl">
          
          {title && <p className="font-semibold">{title}</p>}
          <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          <div className="pt-2 h-full pb-4">{children}</div>
        </div>
      </div>
    ) : null;
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
      );
    } else {
      return null;
    }
  };

export default Modal;