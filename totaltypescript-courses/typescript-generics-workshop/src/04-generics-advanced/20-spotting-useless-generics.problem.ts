import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const returnBothOfWhatIPassIn = <T1 extends { a: unknown; b: unknown }>(params: T1): [T1['a'], T1['b']] => {
  return [params.a, params.b]
};

it("Should return a tuple of the properties a and b", () => {
  const result = returnBothOfWhatIPassIn({
    a: "a",
    b: 1,
  });

  expect(result).toEqual(["a", 1]);

  type test1 = Expect<Equal<typeof result, [string, number]>>;
});
