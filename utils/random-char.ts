export const randomCharacter = () =>
  String.fromCharCode(Math.floor(Math.random() * (126 - 32 + 1)) + 32);

export const randomString = (length: number) =>
  new Array(length)
    .fill(0)
    .map(() => randomCharacter())
    .join();
