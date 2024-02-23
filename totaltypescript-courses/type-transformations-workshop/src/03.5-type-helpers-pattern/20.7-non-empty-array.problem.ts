type NonEmptyArray<T> = [a: T, ...args: T[]]

export const makeEnum = (values: NonEmptyArray<string>) => { };

makeEnum(["a"]);
makeEnum(["a", "b", "c"]);

// @ts-expect-error
makeEnum([]);
