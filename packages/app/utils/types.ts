export interface PokemonRequest {
  status: Status;
  value: Pokemon;
}

export enum Status {
  Fulfilled = 'fulfilled',
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  NameUrl: NameUrl;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
  forms?: NameUrl[];
  species: NameUrl;
}

export interface Ability {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
}

export interface NameUrl {
  name?: string;
  url: string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version: NameUrl;
}

export interface HeldItem {
  item: NameUrl;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: NameUrl;
}

export interface Move {
  move: NameUrl;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NameUrl;
  version_group: NameUrl;
}

export interface Versions {
  [key: string]: Generation;
}

export interface Sprites {
  back_default: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  back_gray?: string;
  back_transparent?: string;
  front_gray?: string;
  front_transparent?: string;
  back_shiny_transparent?: string;
  front_shiny_transparent?: string;
  other?: Generation;
  versions?: Versions;
  animated?: Sprites;
}

export interface Generation {
  [key: string]: Sprites;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

export interface Type {
  slot: number;
  type: NameUrl;
}

//================================================================

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: NameUrl;
  egg_groups: NameUrl[];
  evolution_chain: NameUrl;
  evolves_from_species?: NameUrl;
  flavor_text_entries: FlavorTextEntry[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: NameUrl;
  growth_rate: NameUrl;
  habitat: NameUrl;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: NameUrl;
  varieties: Variety[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NameUrl;
  version: NameUrl;
}

export interface Genus {
  genus: string;
  language: NameUrl;
}

export interface Name {
  language: NameUrl;
  name: string;
}

export interface PalParkEncounter {
  area: NameUrl;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: NameUrl;
}

export interface Variety {
  is_default: boolean;
  pokemon: NameUrl;
}

//-==============================================================

export interface EvolutionChain {
  chain: Chain;
  id: number;
}

export interface Chain {
  evolves_to: Chain[];
  is_baby: boolean;
  species: NameUrl;
}
