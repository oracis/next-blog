import userStore, { UserStore } from "./userStore";

export interface Store {
  user: UserStore;
}

function createStore(initialValue: any): () => Store {
  return () => ({
    user: { ...userStore(), ...initialValue?.user },
  });
}

export default createStore;
