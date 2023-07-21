const URL_BASE =
  'https://react-post-50d48-default-rtdb.europe-west1.firebasedatabase.app';

export async function getAllMeals() {
  const response = await fetch(`${URL_BASE}/Meals.json`);

  if (!response.ok) {
    throw new Error('Response not ok');
  }

  const data = await response.json();
  return data;
}
