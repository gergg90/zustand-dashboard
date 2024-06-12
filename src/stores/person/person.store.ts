import { create } from "zustand";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface ActionsPerson {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

// ! Option type
// !type PersonActionState = ActionsPerson & PersonState;

export const usePersonStore = create<PersonState & ActionsPerson>()((set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value) =>
    set((state) => ({ firstName: (state.firstName = value) })),
  setLastName: (value) =>
    set((state) => ({ lastName: (state.lastName = value) })),
}));
