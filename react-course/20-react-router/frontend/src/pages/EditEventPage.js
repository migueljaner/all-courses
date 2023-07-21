import React from "react";
import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
  const { event } = useRouteLoaderData("eventId");
  return <EventForm event={event} method={"patch"} />;
};

export default EditEventPage;
