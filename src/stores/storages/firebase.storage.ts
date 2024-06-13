import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseURL =
  "https://zustand-storage-64a8a-default-rtdb.firebaseio.com/zustand";

const firebaseStorageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseURL}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (e) {
      throw console.error(e);
    }
  },
  setItem: async function (name: string, value: string): Promise<unknown> {
    const data = await fetch(`${firebaseURL}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());

    return;
  },
  removeItem: function (name: string): unknown {
    console.log("removeItem", name);
    return null;
  },
};

export const firebaseStorage = createJSONStorage(() => firebaseStorageAPI);
