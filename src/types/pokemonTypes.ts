/** Common raw reference type */
export interface Raw {
  name: string;
  url: string;
}

/** Represents a Pokémon's ability */
export interface AbilitySlot {
  ability: Raw;
  is_hidden: boolean;
  slot: number;
}

/** Cries (sounds) of a Pokémon */
export interface Cries {
  latest: string;
  legacy: string;
}

/** Forms of a Pokémon */
export interface FormRaw {
  name: string;
  url: string;
}

/** Game index for a specific version */
export interface GameIndex {
  game_index: number;
  version: Raw;
}

/** Held items and their rarity per version */
export interface VersionDetail {
  rarity: number;
  version: Raw;
}

export interface HeldItem {
  item: Raw;
  version_details: VersionDetail[];
}

/** Move learning method */
export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order: number | null;
  version_group: Raw;
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
}

/** Past abilities of a Pokémon */
export interface PastAbilityItem {
  ability: Raw | null;
  is_hidden: boolean;
  slot: number;
}

export interface PastAbilitySlot {
  abilities: PastAbilityItem[];
  generation: Raw;
}

/** Pokémon sprites */
export interface SpriteOtherSub {
  front_default: string;
  front_female: string | null;
  front_shiny?: string;
  front_shiny_female?: string | null;
  back_default?: string;
  back_female?: string | null;
  back_shiny?: string;
  back_shiny_female?: string | null;
}

export interface SpriteOther {
  dream_world?: { front_default: string; front_female: string | null };
  home?: { front_default: string; front_female: string | null; front_shiny?: string; front_shiny_female?: string | null };
  'official-artwork'?: { front_default: string; front_shiny: string };
  showdown?: {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
  };
}

export interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny?: string;
  back_shiny_female?: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny?: string;
  front_shiny_female?: string | null;
  other?: SpriteOther;
  versions?: any;
}

export interface DamageRelations {
  no_damage_to: Raw[];
  half_damage_to: Raw[];
  double_damage_to: Raw[];
  no_damage_from: Raw[];
  half_damage_from: Raw[];
  double_damage_from: Raw[];
}

/** Localized names */
export interface Name {
  name: string;
  language: Raw;
}

/** Flavor text entries */
export interface FlavorText {
  flavor_text: string;
  language: Raw;
  version: Raw;
}

/** Genus (category) of Pokémon */
export interface Genus {
  genus: string;
  language: Raw;
}

/** Pal Park encounter details */
export interface PalParkEncounter {
  base_score: number;
  rate: number;
  area: Raw;
}

/** Pokédex number entry */
export interface PokedexNumber {
  entry_number: number;
  pokedex: Raw;
}

/** Pokémon variety */
export interface Variety {
  is_default: boolean;
  pokemon: Raw;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Raw;
}

export interface PokemonTypeSlot {
  slot: number;
  type: Raw;
}

export interface PokemonSlot {
  is_hidden?: boolean;
  slot: number;
  pokemon: Raw;
}

/** Paginated list response (for Pokémon or types) */
export interface PaginatedResponse<T = Raw> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface EffectEntries {
  effect: string;
  short_effect: string;
  language: Raw;
}

/** Ability Interface - /ability/{id} */
export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: Raw;
  names: Name[];
  effect_entries: EffectEntries[];
  effect_changes: {
    version_group: Raw;
    effect_entries: EffectEntries[];
  }[];
  flavor_text_entries: FlavorText[];
  pokemon: PokemonSlot[];
}

/** Species Interface - /pokemon-species/{id} */
export interface Species {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: Raw;
  pokedex_numbers: PokedexNumber[];
  egg_groups: Raw[];
  color: Raw;
  shape: Raw;
  evolves_from_species: Raw | null;
  evolution_chain: {
    url: string;
  };
  habitat: Raw | null;
  generation: Raw;
  names: Name[];
  pal_park_encounters: PalParkEncounter[];
  flavor_text_entries: FlavorText[];
  form_descriptions: {
    description: string;
    language: Raw;
  }[];
  genera: Genus[];
  varieties: Variety[];
}

/** PokemonType Interface - /type/{id} */
export interface PokemonType {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  past_damage_relations: {
    generation: Raw;
    damage_relations: DamageRelations;
  }[];
  game_indices: GameIndex[];
  generation: Raw;
  move_damage_class: Raw | null;
  names: Name[];
  pokemon: PokemonSlot[];
  moves: Raw[];
}

/** Main Pokémon interface */
export interface Pokemon {
  abilities: AbilitySlot[];
  base_experience: number;
  cries: Cries;
  forms: FormRaw[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: PastAbilitySlot[];
  past_types: any[];
  species: Raw;
  sprites: Sprites;
  stats: Stat[];
  types: PokemonTypeSlot[];
  weight: number;
}

/** Pagination and listing options */
export interface GetPaginatedOptions {
  offset?: number;
  limit?: number;
}