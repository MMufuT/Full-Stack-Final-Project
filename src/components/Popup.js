import React from 'react';

// Popup.js
function Popup({ title, isOpen, onClose, onConfirm, children }) {
    const popupClass = isOpen ? "popup show" : "popup hide";

    return (
        <div className={popupClass}>
            <h1 className="text-center popup-title">{title}</h1> {/* Ensure popup-title class is applied */}
            <div>{children}</div>
            <div className="mt-4 d-flex justify-content-end">
                <button className="btn btn-light m-1" onClick={onClose}>Cancel</button> {/* Use Bootstrap classes */}
                <button className="btn btn-light m-1" onClick={onConfirm}>Confirm</button> {/* Use Bootstrap classes */}
            </div>
        </div>
    );
}



export default Popup;
