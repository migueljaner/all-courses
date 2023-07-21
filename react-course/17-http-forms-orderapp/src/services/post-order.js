const URL_BASE =
  'https://react-post-50d48-default-rtdb.europe-west1.firebasedatabase.app';

export async function postOrder(user, items) {
  const response = await fetch(`${URL_BASE}/orders.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      items,
    }),
  });

  if (!response.ok) {
    throw new Error('Response not ok');
  }

  const data = await response.json();
  return data;
}
