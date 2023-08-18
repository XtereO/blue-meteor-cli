export const storeCode = (name: string) =>
  `import { createStore } from 'effector';
import { ${name}Events } from './events';

type Store = {};
const defaultStore: Store = {};

export const $${name} = createStore<Store>({
  ...defaultStore
})
  .on(${name}Events.setDefaultState, () => ({
    ...defaultStore
  }));
`;

export const eventsCode = (name: string) =>
  `import { createEvent } from 'effector';

export const ${name}Events = {
  setDefaultState: createEvent(),
};
`;

export const effectsCode = (name: string) =>
  `import { createEffect, forward } from 'effector';

export const ${name}Effects = {};
`;

export const effectorIndexCode = () =>
  `export * from "./effects";
export * from "./events";
export * from "./store";
`;
