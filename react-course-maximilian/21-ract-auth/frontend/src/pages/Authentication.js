import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import jwt_decode from "jwt-decode";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Invalid mode" }, { status: 422 });
  }

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json("Could not create the user", { status: 422 });
  }

  //Store the token in local storage
  const { token } = await response.json();

  const decodedToken = jwt_decode(token);
  console.log("decodedToken", decodedToken);

  const expiration = new Date(decodedToken.exp * 1000);
  // expiration.setUTCSeconds(decodedToken.exp);

  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
