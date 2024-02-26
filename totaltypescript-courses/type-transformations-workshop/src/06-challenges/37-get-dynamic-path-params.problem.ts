import { S } from "ts-toolbelt";
import { Equal, Expect } from "../helpers/type-utils";

type UserPath = "/users/:id";

type UserOrganisationPath = "/users/:id/organisations/:organisationId";

type ExtractPathParams<T extends string> = {
  [P in S.Split<T, '/'>[number]as P extends `:${infer D}` ? D : never]: string
}

type MappedPaths = ExtractPathParams<UserOrganisationPath>

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >,
];
