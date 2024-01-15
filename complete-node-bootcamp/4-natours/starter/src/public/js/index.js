/* eslint-disable */
import { login, logout } from './login';
import { displayMap } from './leaflet';
import { updateSettings } from './updatesettings';

const leaflet = document.getElementById('map');
const logoutBtn = document.querySelector('.nav__el--logout');
const loginForm = document.querySelector('.form.login-form');
const userDataFrom = document.querySelector('.form-user-data');
const userSettingsFrom = document.querySelector('.form-user-settings');

if (leaflet) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);

    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
  });

if (userDataFrom)
  userDataFrom.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(userDataFrom);
    const name = formData.get('name');
    const email = formData.get('email');

    await updateSettings({ name, email }, 'data');
  });

if (userSettingsFrom)
  userSettingsFrom.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(userSettingsFrom);
    const passwordCurrent = formData.get('passwordCurrent');
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);
