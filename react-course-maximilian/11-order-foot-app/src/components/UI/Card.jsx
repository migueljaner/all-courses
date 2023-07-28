/* eslint-disable react/prop-types */
import styles from './css/Card.module.css';

const Card = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
