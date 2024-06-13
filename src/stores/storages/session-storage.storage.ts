import { createJSONStorage, StateStorage } from "zustand/middleware";

const storageAPI: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): unknown {
    return sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): unknown {
    console.log("removeItem", name);
    return null;
  },
};

export const customSessionStorage = createJSONStorage(() => storageAPI);
