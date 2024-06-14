import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";

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
  devtools(
    persist(storeAPI, {
      name: "person-storage",
      storage: firebaseStorage,
    })
  )
);
