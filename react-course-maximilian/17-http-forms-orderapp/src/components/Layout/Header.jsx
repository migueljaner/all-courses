import styles from './css/Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderButton from './HeaderButton';

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderButton onToggleShowCart={props.onToggleShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
    </>
  );
};

export default Header;
