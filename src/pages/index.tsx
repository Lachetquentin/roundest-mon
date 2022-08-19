import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const buttonClasses =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundestPokemon = (selected: number) => {
    //trpc.mutate(["vote-for-pokemon", { id: first }]);
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center p-2">
        <p>Which Pokemon is Rounder ?</p>
      </div>

      <div className="border rounded flex justify-between items-center ">
        <div className="flex flex-col items-center p-2">
          <div className="text-xl text-center capitalize mt-[2-rem]">
            {firstPokemon.data?.name}
          </div>
          <img
            src={firstPokemon.data?.sprites.front_default as any}
            className="h-64 w-64"
          />
          <button
            className={buttonClasses}
            onClick={() => voteForRoundestPokemon(first)}
          >
            Choose
          </button>
        </div>

        <div className="p-8">Vs</div>

        <div className="flex flex-col items-center p-2">
          <div className="text-xl text-center capitalize mt-[2-rem]">
            {secondPokemon.data?.name}
          </div>
          <img
            src={secondPokemon.data?.sprites.front_default as any}
            className="h-64 w-64"
          />
          <button
            className={buttonClasses}
            onClick={() => voteForRoundestPokemon(second)}
          >
            Choose
          </button>
        </div>
      </div>
    </div>
  );
}
