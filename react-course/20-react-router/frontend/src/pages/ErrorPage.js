import React from "react";
import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Sorry, something went wrong.";

  if (error.status === 404) {
    title = "Page not found";
    message = "Sorry, the page you were looking for could not be found.";
  }

  if (error.status === 401) {
    title = "Unauthorized";
    message = "Sorry, you are not authorized to access this page.";
  }

  if (error.status === 500) {
    title = "Internal Server Error";
    message = error.data.message || "Sorry, something went wrong.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
