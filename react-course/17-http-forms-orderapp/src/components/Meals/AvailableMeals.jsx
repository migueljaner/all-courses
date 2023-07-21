import styles from './css/AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import * as API from '../../services/get-meals';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const loadMeals = (response) => {
    const loadedMeals = [];

    for (const key in response) {
      loadedMeals.push({
        id: key,
        name: response[key].name,
        description: response[key].description,
        price: response[key].price,
      });
    }

    setMeals(loadedMeals);
  };

  useEffect(() => {
    setIsLoading(true);
    API.getAllMeals()
      .then(loadMeals)
      .catch((error) => {
        setHttpError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (httpError) {
    return (
      <section className={styles.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
