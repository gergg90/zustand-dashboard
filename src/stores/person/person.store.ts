import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session-storage.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface ActionsPerson {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & ActionsPerson> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value) =>
    set((state) => ({ firstName: (state.firstName = value) })),
  setLastName: (value) =>
    set((state) => ({ lastName: (state.lastName = value) })),
});

// ! Option type
// !type PersonActionState = ActionsPerson & PersonState;

export const usePersonStore = create<PersonState & ActionsPerson>()(
  persist(storeAPI, {
    name: "person-storage",
    storage: customSessionStorage,
  })
);
