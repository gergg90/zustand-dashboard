import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

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

const sessionStorage: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    console.log("getItem", name);
    return null;
  },
  setItem: function (name: string, value: string): unknown {
    console.log("setItem", { name, value });
    return null;
  },
  removeItem: function (name: string): unknown {
    console.log("removeItem", name);
    return null;
  },
};

// ! Option type
// !type PersonActionState = ActionsPerson & PersonState;

export const usePersonStore = create<PersonState & ActionsPerson>()(
  persist(storeAPI, {
    name: "person-storage",
    storage: createJSONStorage(() => sessionStorage),
  })
);
