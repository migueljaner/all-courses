import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import styles from './css/Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { postOrder } from '../../services/post-order';

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    postOrder(userData, ctx.items)
      .then((res) => {
        setDidSubmit(true);
        console.log(res);
        ctx.clearCart();
      })
      .catch((err) => {
        setDidSubmit(false);
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          //You can pass the item / item.id throught the props of the CartItem component, but you can also use the bind method to pass the id as an argument to the function.
          //Other way to do that is create an arrow function for each item thath returns a the add or remove function with the required objects,values as an argument.
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button
        className={styles['button--alt']}
        onClick={props.onToggleShowCart}
      >
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout
          onConfirm={submitOrderHandler}
          onToggleShowCart={props.onToggleShowCart}
        />
      )}
      {!isCheckOut && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onToggleShowCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onToggleShowCart={props.onToggleShowCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
