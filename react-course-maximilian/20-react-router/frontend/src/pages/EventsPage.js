import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { useLoaderData, json, defer, Await } from "react-router-dom";

function EventsPage() {
  const data = useLoaderData();
  const { events } = data;

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    /* return {
      status: response.status,
      error: response.statusText,
      message: "Could not fetch data",
    }; */
    // throw new Error("Could not fetch data");
    /*  throw new Response(JSON.stringify({ message: "Could not fetch data" }), {
      status: 500,
    }); */

    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loaderEvents(),
  });
}
