# PokemonAppEngine

A lightweight, type-safe TypeScript engine for fetching Pokémon data from the [PokéAPI](https://pokeapi.co/).

## Features

- 🎯 **Fully Typed** - Complete TypeScript interfaces for all Pokémon data
- 🚀 **Simple API** - Clean, intuitive methods for fetching Pokémon data
- 📦 **Lightweight** - No dependencies, just native fetch
- 🔄 **Pagination Support** - Built-in pagination for list endpoints
- ⚡ **Modern** - Uses async/await and ES modules

## Installation

```bash
npm install pokemon-app-engine
# or
yarn add pokemon-app-engine
# or
pnpm add pokemon-app-engine
```

## Usage

### Basic Setup

```typescript
import { PokemonAppEngine } from 'pokemon-app-engine';

const engine = new PokemonAppEngine();
```

### Fetch a Pokémon

Get detailed information about a specific Pokémon by ID or name:

```typescript
// By ID
const pikachu = await engine.getBy(25);

// By name
const charizard = await engine.getBy('charizard');

console.log(pikachu.name); // "pikachu"
console.log(pikachu.types); // [{ slot: 1, type: { name: "electric", url: "..." } }]
console.log(pikachu.stats); // [{ base_stat: 35, effort: 0, stat: {...} }, ...]
```

### Fetch Pokémon Species

Get species-specific information including evolution chain, habitat, and flavor text:

```typescript
const species = await engine.getSpeciesBy('pikachu');

console.log(species.is_legendary); // false
console.log(species.habitat.name); // "forest"
console.log(species.evolution_chain.url); // "https://pokeapi.co/api/v2/evolution-chain/10/"
```

### Fetch Pokémon Types

Get type information including damage relations and Pokémon of that type:

```typescript
const electricType = await engine.getTypeBy('electric');

console.log(electricType.damage_relations.double_damage_to);
// [{ name: "water", url: "..." }, { name: "flying", url: "..." }]

console.log(electricType.pokemon);
// [{ slot: 1, pokemon: { name: "pikachu", url: "..." } }, ...]
```

### List Pokémon (Paginated)

Fetch a paginated list of Pokémon:

```typescript
// Get first 20 Pokémon
const pokemonList = await engine.getPokemons();

// Get next 20 Pokémon
const nextPage = await engine.getPokemons({ offset: 20, limit: 20 });

// Get 50 Pokémon starting from position 100
const customPage = await engine.getPokemons({ offset: 100, limit: 50 });

console.log(pokemonList.count); // Total count (e.g., 1302)
console.log(pokemonList.results); // Array of { name, url }
console.log(pokemonList.next); // URL to next page
console.log(pokemonList.previous); // URL to previous page
```

### List All Types

Get all available Pokémon types:

```typescript
const types = await engine.getTypes();

console.log(types.results);
// [
//   { name: "normal", url: "..." },
//   { name: "fighting", url: "..." },
//   { name: "flying", url: "..." },
//   ...
// ]
```

### List All Generations

Get all Pokémon generations:

```typescript
const generations = await engine.getGenerations();

console.log(generations.results);
// [
//   { name: "generation-i", url: "..." },
//   { name: "generation-ii", url: "..." },
//   ...
// ]
```

### List All Species (Paginated)

Fetch a paginated list of Pokémon species:

```typescript
const speciesList = await engine.getSpecies({ offset: 0, limit: 50 });

console.log(speciesList.results);
// [{ name: "bulbasaur", url: "..." }, ...]
```

### List All Abilities (Paginated)

Fetch a paginated list of abilities:

```typescript
const abilities = await engine.getAbilities({ offset: 0, limit: 50 });

console.log(abilities.results);
// [{ name: "stench", url: "..." }, { name: "drizzle", url: "..." }, ...]
```

### Generic GET Request

For any custom endpoint not covered by the methods above:

```typescript
import { Ability } from 'pokemon-app-engine';

// Fetch a specific ability
const overgrow = await engine.get<Ability>('https://pokeapi.co/api/v2/ability/65');

console.log(overgrow.name); // "overgrow"
console.log(overgrow.effect_entries[0].short_effect);
```

## API Reference

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getBy(id)` | `number \| string` | `Promise<Pokemon>` | Fetch Pokémon by ID or name |
| `getSpeciesBy(id)` | `number \| string` | `Promise<Species>` | Fetch species by ID or name |
| `getTypeBy(id)` | `number \| string` | `Promise<PokemonType>` | Fetch type by ID or name |
| `getPokemons(options?)` | `GetPaginatedOptions?` | `Promise<PaginatedResponse<Raw>>` | Fetch paginated Pokémon list |
| `getSpecies(options?)` | `GetPaginatedOptions?` | `Promise<PaginatedResponse<Raw>>` | Fetch paginated species list |
| `getAbilities(options?)` | `GetPaginatedOptions?` | `Promise<PaginatedResponse<Raw>>` | Fetch paginated abilities list |
| `getTypes()` | - | `Promise<PaginatedResponse<Raw>>` | Fetch all types |
| `getGenerations()` | - | `Promise<PaginatedResponse<Raw>>` | Fetch all generations |
| `get<T>(url)` | `string` | `Promise<T>` | Generic GET request |

### Types

#### GetPaginatedOptions
```typescript
interface GetPaginatedOptions {
  offset?: number; // Starting position (default: 0)
  limit?: number;  // Number of results (default: 20)
}
```

#### PaginatedResponse
```typescript
interface PaginatedResponse<T = Raw> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

## TypeScript Support

All responses are fully typed. Import the types you need:

```typescript
import type { 
  Pokemon, 
  Species, 
  PokemonType, 
  Ability,
  Raw,
  PaginatedResponse 
} from 'pokemon-app-engine';
```

## Error Handling

All methods throw errors if the request fails:

```typescript
try {
  const pokemon = await engine.getBy(999999);
} catch (error) {
  console.error('Failed to fetch Pokémon:', error.message);
}
```

## Examples

### Build a Pokédex

```typescript
const engine = new PokemonAppEngine();

// Fetch first 151 Pokémon (Gen 1)
const gen1 = await engine.getPokemons({ offset: 0, limit: 151 });

// Fetch detailed data for each
const pokemonDetails = await Promise.all(
  gen1.results.map(p => engine.getBy(p.name))
);

console.log(pokemonDetails.map(p => ({
  name: p.name,
  types: p.types.map(t => t.type.name),
  stats: p.stats.find(s => s.stat.name === 'hp')?.base_stat
})));
```

### Find All Fire-type Pokémon

```typescript
const fireType = await engine.getTypeBy('fire');

console.log(`There are ${fireType.pokemon.length} Fire-type Pokémon`);
console.log(fireType.pokemon.map(p => p.pokemon.name));
```

### Check Legendary Status

```typescript
const mew = await engine.getSpeciesBy('mew');
const pikachu = await engine.getSpeciesBy('pikachu');

console.log(`Mew is legendary: ${mew.is_legendary}`); // true
console.log(`Pikachu is legendary: ${pikachu.is_legendary}`); // false
```

## Credits

Powered by [PokéAPI](https://pokeapi.co/) - The RESTful Pokémon API.

## License

MIT