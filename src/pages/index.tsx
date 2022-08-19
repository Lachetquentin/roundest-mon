import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundestPokemon = (selected: number) => {
    trpc.mutate(["vote-for-pokemon", { id: first }]);
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder ?</div>
      <div className="p-2" />
      <div className="border rounded p-14 flex justify-between max-w-2xl items-center">
        <div className="w-64 h-64 flex flex-col">
          <div className="text-xl text-center capitalize mt-[2-rem]">
            {firstPokemon.data?.name}
          </div>
          <img
            src={firstPokemon.data?.sprites.front_default as any}
            className="w-full"
          />
          <button
            className="border rounded bg-transparent p-2 hover:bg-orange-600 hover:border-orange-600"
            onClick={() => voteForRoundestPokemon(first)}
          >
            Choose
          </button>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <div className="text-xl text-center capitalize mt-[2-rem]">
            {secondPokemon.data?.name}
          </div>
          <img
            src={secondPokemon.data?.sprites.front_default as any}
            className="w-full"
          />
          <button
            className="border rounded bg-transparent p-2 hover:bg-orange-600 hover:border-orange-600"
            onClick={() => voteForRoundestPokemon(second)}
          >
            Choose
          </button>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
}
