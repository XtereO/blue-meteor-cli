export const storeCode = (name) =>
  `import { createStore } from 'effector';

type Store = {};

export const $${name} = createStore<Store>({});
`;

export const eventsCode = () =>
  `import { createEvent } from 'effector';
`;

export const effectsCode = () =>
  `import { createEffect, forward } from 'effector';
`;

export const effectorIndexCode = () =>
  `export * from "./effects";
export * from "./events";
export * from "./store";
`;
