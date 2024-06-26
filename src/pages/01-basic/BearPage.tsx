import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../components";
import { useBearsStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <BearsDisplay />
      </div>
    </>
  );
};

export const BlackBears = () => {
  const blackBears = useBearsStore((state) => state.blackBears);
  const increseBlackBear = useBearsStore((state) => state.increseBlackBear);
  const decreseBlackBear = useBearsStore((state) => state.decreseBlackBear);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increseBlackBear(1)}>+1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => decreseBlackBear(1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export function PolarBears() {
  const polarBears = useBearsStore((state) => state.polarBears);
  const incresePolarBear = useBearsStore((state) => state.incresePolarBear);
  const decresePolarBear = useBearsStore((state) => state.decresePolarBear);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => incresePolarBear(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => decresePolarBear(1)}>-1</button>
      </div>
    </WhiteCard>
  );
}

export function PandaBears() {
  const pandaBears = useBearsStore((state) => state.pandaBears);
  const incresePandaBear = useBearsStore((state) => state.incresePandaBear);
  const decresePandaBear = useBearsStore((state) => state.decresePandaBear);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => incresePandaBear(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => decresePandaBear(1)}>-1</button>
      </div>
    </WhiteCard>
  );
}

export function BearsDisplay() {
  const bears = useBearsStore(useShallow((state) => state.bears));

  // const bears = useBearsStore((state) => state.bears);
  const doNothing = useBearsStore((state) => state.doNothing);
  const addBear = useBearsStore((state) => state.addBear);
  const clearBear = useBearsStore((state) => state.clearBear);

  return (
    <WhiteCard>
      <h1>Osos:</h1>
      <button onClick={doNothing}>Do Nothing</button>

      <button onClick={addBear}>addbear</button>
      <button onClick={clearBear}>resetbear</button>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
}
