import { useRef, useState } from 'react';
import styles from './css/Checkout.module.css';

//Validate userdata functions
const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Ckeckout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const validateData = ({ name, street, postal, city }) => {
    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = isFiveChars(postal);
    const cityIsValid = !isEmpty(city);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    return nameIsValid && streetIsValid && postalIsValid && cityIsValid;
  };

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const userData = {
      name,
      street,
      postal,
      city,
    };

    //Validate userdata
    if (!validateData(userData)) {
      return;
    }

    props.onConfirm(userData);
  };

  const nameControlClasses = `${styles.control} ${
    formInputsValidity.name ? '' : styles.invalid
  }`;

  const streetControlClasses = `${styles.control} ${
    formInputsValidity.street ? '' : styles.invalid
  }`;

  const postalControlClasses = `${styles.control} ${
    formInputsValidity.postal ? '' : styles.invalid
  }`;

  const cityControlClasses = `${styles.control} ${
    formInputsValidity.city ? '' : styles.invalid
  }`;

  return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name"> Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street"> Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="posal"> Postal</label>
        <input type="text" id="posal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code (5 characters long)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city"> City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Confirm</button>
        <button type="button" onClick={props.onToggleShowCart}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Ckeckout;
