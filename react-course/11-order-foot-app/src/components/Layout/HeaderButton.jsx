import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CardIcon';
import styles from './css/HeaderButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;

  const numberOfCartItems = ctx.items.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const buttonClasses = `${styles.button} ${
    btnIsHighlighted ? styles.bump : ''
  }`;

  useEffect(() => {
    if (numberOfCartItems === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onToggleShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderButton;
