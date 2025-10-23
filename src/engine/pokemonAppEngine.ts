import { GetPaginatedOptions, PaginatedResponse, Pokemon, PokemonType, Raw, Species } from "../types/pokemonTypes";

/**
 * PokemonAppEngine
 * -------------------------
 * Lightweight engine to fetch Pokémon data from the PokeAPI.
 */
export class PokemonAppEngine {
  baseUrl = "https://pokeapi.co/api/v2";

  /** Performs a generic GET request and returns typed data. */
  async get<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return (await res.json()) as T;
  }

  /** Retrieves a Pokémon by its ID or name. */
  async getBy(id: number | string): Promise<Pokemon> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon with ID ${id}: ${res.statusText}`);
    return (await res.json()) as Pokemon;
  }

  /** Retrieves a Pokémon type by its ID or name. */
  async getTypeBy(id: number | string): Promise<PokemonType> {
    const url = `${this.baseUrl}/type/${id}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon type with ID ${id}: ${res.statusText}`);
    return (await res.json()) as PokemonType;
  }

  /** Retrieves Pokémon species details by ID or name. */
  async getSpeciesBy(id: number | string): Promise<Species> {
    const url = `${this.baseUrl}/pokemon-species/${id}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon species with ID ${id}: ${res.statusText}`);
    return (await res.json()) as Species;
  }

  /** Fetches a paginated list of basic Pokémon entries. */
  async getPokemons(options?: GetPaginatedOptions): Promise<PaginatedResponse<Raw>> {
    const { offset = 0, limit = 20 } = options || {};
    const url = `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon list: ${res.statusText}`);
    return (await res.json()) as PaginatedResponse<Raw>;
  }

  /** Retrieves all available Pokémon types. */
  async getTypes(): Promise<PaginatedResponse<Raw>> {
    const url = `${this.baseUrl}/type`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon types: ${res.statusText}`);
    return (await res.json()) as PaginatedResponse<Raw>;
  }

  /** Retrieves all available Pokémon generations. */
  async getGenerations(): Promise<PaginatedResponse<Raw>> {
    const url = `${this.baseUrl}/generation`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon generations: ${res.statusText}`);
    return (await res.json()) as PaginatedResponse<Raw>;
  }

  /** Retrieves all pokemon species. */
  async getSpecies( options?: GetPaginatedOptions ): Promise<PaginatedResponse<Raw>> {
    const { offset = 0, limit = 20 } = options || {};
    const url = `${this.baseUrl}/pokemon-species?offset=${offset}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon generations: ${res.statusText}`);
    return (await res.json()) as PaginatedResponse<Raw>;
  }

  /** Retrieves all abilities. */
  async getAbilities( options?: GetPaginatedOptions ): Promise<PaginatedResponse<Raw>> {
    const { offset = 0, limit = 20 } = options || {};
    const url = `${this.baseUrl}/ability?offset=${offset}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon generations: ${res.statusText}`);
    return (await res.json()) as PaginatedResponse<Raw>;
  }
}
