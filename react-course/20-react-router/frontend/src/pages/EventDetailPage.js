import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("eventId");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent({ params }) {
  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    const resData = await response.json();
    // return event.event;

    return resData.event;
  }
}

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

export async function loader({ request, params }) {
  return defer({
    event: loadEvent({ params }),
    events: loaderEvents(),
  });
}

export async function action({ request, params }) {
  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete data" }, { status: 500 });
  }

  return redirect("/events");
}
