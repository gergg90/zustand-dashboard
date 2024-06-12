import { create } from "zustand";

interface Bears {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  pandaBears: number;
  polarBears: number;

  //nested object
  bears: Bears[];
  addBear: () => void;
  clearBear: () => void;
  doNothing: () => void;

  //computed properties

  computed: {
    totalBears: number;
  };

  //blackBear
  increseBlackBear: (by: number) => void;
  decreseBlackBear: (by: number) => void;

  //pandaBear

  incresePandaBear: (by: number) => void;
  decresePandaBear: (by: number) => void;

  //polarBear

  incresePolarBear: (by: number) => void;
  decresePolarBear: (by: number) => void;
}

export const useBearsStore = create<BearState>()((set, get) => ({
  //states
  blackBears: 0,
  pandaBears: 0,
  polarBears: 0,

  //nested object
  bears: [
    { id: 1, name: "Oso # 1" },
    { id: 3, name: "Oso # 3" },
  ],
  doNothing: () => set((state) => ({ bears: [...state.bears] })),

  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso # ${state.bears.length + 1}` },
      ],
    })),

  clearBear: () => set({ bears: [] }),

  //computed properties

  computed: {
    get totalBears(): number {
      return (
        get().blackBears +
        get().pandaBears +
        get().polarBears +
        get().bears.length
      );
    },
  },

  //function blackBear
  increseBlackBear: (by) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  decreseBlackBear: (by) =>
    set((state) => ({ blackBears: state.blackBears - by })),

  //function pandaBear
  incresePandaBear: (by) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),
  decresePandaBear: (by) =>
    set((state) => ({ pandaBears: state.pandaBears - by })),

  //function polarBear
  incresePolarBear: (by) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  decresePolarBear: (by) =>
    set((state) => ({ polarBears: state.polarBears - by })),
}));
