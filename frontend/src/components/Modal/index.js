import React from 'react';

// Styles
import "./style.scss";

const Modal = props => {
    const { children, activeModal, closeModal } = props;

    return (
        <div className='modal-backdrop' onClick={() => {closeModal()}}>
            <div className="modal-dialog modal-xl" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">
                <div className="modal-dialog-centered modal-dialog modal-xl" role="document">
                    <div className="modal-content" onClick={e => {e.stopPropagation()}}>
                        <div className="modal-header">
                            <h5 className="modal-title">{activeModal.name}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container">{children}</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Modal;