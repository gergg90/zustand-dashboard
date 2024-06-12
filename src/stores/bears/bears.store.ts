import { create } from "zustand";

interface Bears {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  pandaBears: number;
  polarBears: number;

  bears: Bears[];

  doNothing: () => void;

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

export const useBearsStore = create<BearState>()((set) => ({
  blackBears: 0,
  pandaBears: 0,
  polarBears: 0,

  bears: [{ id: 111, name: "Germain" }],
  doNothing: () => set((state) => ({ bears: [...state.bears] })),

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
