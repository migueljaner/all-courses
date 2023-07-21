import { json, redirect } from "react-router-dom";

export function getAuthToken() {
  const tokenDuration = getAuthDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return localStorage.getItem("token") || null;
}

export function getAuthDuration() {
  const expiration = localStorage.getItem("expiration");

  if (!expiration) {
    return null;
  }

  const expirationDate = new Date(expiration);
  if (expirationDate <= new Date()) {
    return null;
  }

  const duration = expirationDate.getTime() - new Date().getTime();

  return duration;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    throw json({ message: "Not authorized" }, { status: 401 });
  }

  return null;
}
