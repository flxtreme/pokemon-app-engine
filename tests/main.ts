import { createTest, runTest } from "./runner";
import { PokemonAppEngine } from "../src/engine/pokemonAppEngine";
import { Pokemon, PaginatedResponse, Raw, PokemonType, Species } from "../src/types/pokemonTypes";

const engine = new PokemonAppEngine();

const TESTS = [
  createTest("should fetch Pikachu", async () => {
    const pikachu = await engine.getBy(25); // id: 25 is Pikachu
    return pikachu.name.toLowerCase() === "pikachu";
  }),

  createTest("should match with API result", async () => {
    const id = 25;
    const [a, b] = await Promise.all([
      engine.getBy(id), 
      engine.get<Pokemon>(
        `${engine.baseUrl}/pokemon/${id}`
      )
    ]);
    return a.name === b?.name;
  }),

  createTest("first pokemon on the list is bulbasaur", async () => {
    const pokemons = await engine.getPokemons({ offset: 0, limit: 10 });

    return Array.isArray(pokemons.results) && pokemons.results.length > 0 && pokemons.results[0].name === "bulbasaur";
  }),

  createTest("should match Pokémon list with API response", async () => {
    const offset = 0;
    const limit = 10;

    const [engineList, apiList] = await Promise.all([
      engine.getPokemons({ offset, limit }),
      engine.get<PaginatedResponse<Raw>>( 
        `${engine.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
      ),
    ]);

    // Compare first Pokémon name to ensure order & consistency
    return engineList.results[0].name === apiList?.results[0]?.name;
  }),

  createTest("first generation on the list is generation-i", async () => {
    const generations = await engine.getGenerations();

    return Array.isArray(generations.results) && generations.results.length > 0 && generations.results[0].name === "generation-i";
  }),
  
  createTest("first type on the list is normal", async () => {
    const types = await engine.getTypes();

    return Array.isArray(types.results) && types.results.length > 0 && types.results[0].name === "normal";
  }),


  createTest("types first move should match", async () => {
    const id = 3;

    const [
      typeA,
      typeB
    ] = await Promise.all([
      engine.getTypeBy(id),
      engine.get<PokemonType>(
        `${engine.baseUrl}/type/${id}`
      )
    ]);

    return typeA.moves.length > 0 && typeB.moves.length > 0 && typeA.moves[0].name === typeB.moves[0].name;
  }),

  createTest("fetch species should match base_happiness", async () => {
    const id = 3;

    const [
      spcsA,
      spcsB
    ] = await Promise.all([
      engine.getSpeciesBy(id),
      engine.get<Species>(
        `${engine.baseUrl}/pokemon-species/${id}`
      )
    ]);

    return spcsA.base_happiness === spcsB.base_happiness;
  }),
];

(async () => {
  const results = await runTest(TESTS);
  const allPassed = results.every(Boolean);

  console.log(allPassed ? "✅ All tests passed" : "❌ Some tests failed");
  process.exit(allPassed ? 0 : 1);
})();
