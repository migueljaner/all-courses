import { Equal, Expect } from "../helpers/type-utils";

type Route =
  | {
    route: "/";
    search: {
      page: string;
      perPage: string;
    };
  }
  | { route: "/about" }
  | { route: "/admin" }
  | { route: "/admin/users" };

type RoutesObject = {
  [K in Route as K['route']]: K extends { search: infer D } ? D : never
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": never;
        "/admin": never;
        "/admin/users": never;
      }
    >
  >,
];
