/* eslint-disable */
import axios from 'axios';

export const updateSettings = async (data, type) => {
  try {
    console.log('data', data);

    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      alert('Data updated successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
