/* eslint-disable react/prop-types */
import styles from './css/Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.onToggleShowCart}></div>
  );
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const overlays = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onToggleShowCart={props.onToggleShowCart} />,
        overlays
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlays
      )}
    </>
  );
};

export default Modal;
