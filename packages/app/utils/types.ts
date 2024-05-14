/**
 * The request for a pokemon, containing its status and value.
 */
export interface PokemonRequest {
  /**
   * The status of the request.
   */
  status: Status;
  /**
   * The pokemon object of the request.
   */
  value: Pokemon;
}

/**
 * The status of a request.
 */
export enum Status {
  /**
   * The request has been fulfilled.
   */
  Fulfilled = 'fulfilled',
}

/**
 * A Pokemon object, containing various information about a Pokemon.
 */
export interface Pokemon {
  /**
   * The list of abilities a pokemon has.
   */
  abilities: Ability[];

  /**
   * The base experience of the pokemon.
   */
  base_experience: number;

  /**
   * The list of cries a pokemon makes.
   */
  cries: Cries;

  /**
   * The list of game indices a pokemon exists in.
   */
  game_indices: GameIndex[];

  /**
   * The height of the pokemon in decimeters.
   */
  height: number;

  /**
   * The list of held items a pokemon is currently holding.
   */
  held_items: HeldItem[];

  /**
   * The unique id of the pokemon.
   */
  id: number;

  /**
   * Whether this is the default sprite for the pokemon.
   */
  is_default: boolean;

  /**
   * The location area encounters for the pokemon.
   */
  location_area_encounters: string;

  /**
   * The list of moves a pokemon knows.
   */
  moves: Move[];

  /**
   * The name of the pokemon.
   */
  name: string;

  /**
   * The order of the pokemon in the pokedex.
   */
  order: number;

  /**
   * The name url of the pokemon.
   */
  NameUrl: NameUrl;

  /**
   * The sprites of the pokemon.
   */
  sprites: Sprites;

  /**
   * The stats of the pokemon.
   */
  stats: Stat[];

  /**
   * The types of the pokemon.
   */
  types: Type[];

  /**
   * The weight of the pokemon in hectograms.
   */
  weight: number;

  /**
   * The list of forms the pokemon can transform into. Can be null.
   */
  forms?: NameUrl[];

  /**
   * The species of the pokemon.
   */
  species: NameUrl;
}

/**
 * Represents an ability for a Pokemon.
 */
export interface Ability {
  /**
   * The name url of the ability.
   */
  ability: NameUrl;

  /**
   * Whether the ability is hidden.
   */
  is_hidden: boolean;

  /**
   * The slot number of the ability.
   */
  slot: number;
}

/**
 * Represents a name/url pair for a resource.
 */
export interface NameUrl {
  /**
   * The name of the resource, can be null.
   */
  name?: string;

  /**
   * The URL of the resource.
   */
  url: string;
}

/**
 * Represents the cries of a Pokemon.
 */
export interface Cries {
  /**
   * The latest cry of the Pokemon.
   */
  latest: string;

  /**
   * The legacy cries of the Pokemon.
   */
  legacy: string;
}

/**
 * Represents an index of a game for a Pokemon.
 */
export interface GameIndex {
  /**
   * The index of the Pokemon in the game.
   */
  game_index: number;

  /**
   * The version of the game.
   */
  version: NameUrl;
}

/**
 * Represents a held item of a Pokemon.
 */
export interface HeldItem {
  /**
   * The held item.
   */
  item: NameUrl;

  /**
   * The version details of the held item.
   */
  version_details: VersionDetail[];
}

/**
 * Represents a version detail of a held item.
 */
export interface VersionDetail {
  /**
   * The rarity of the held item.
   */
  rarity: number;

  /**
   * The version of the held item.
   */
  version: NameUrl;
}

/**
 * Represents a move of a Pokemon.
 */
export interface Move {
  /**
   * The move.
   */
  move: NameUrl;

  /**
   * The version group details of the move.
   */
  version_group_details: VersionGroupDetail[];
}

/**
 * Represents a version group detail of a move.
 */
export interface VersionGroupDetail {
  /**
   * The level at which the move is learned.
   */
  level_learned_at: number;

  /**
   * The method of learning the move.
   */
  move_learn_method: NameUrl;

  /**
   * The version group of the move.
   */
  version_group: NameUrl;
}

/**
 * Represents the versions of an item.
 */
export interface Versions {
  [key: string]: Generation;
}

/**
 * Represents the sprites of a Pokémon.
 *
 * The sprites are images of a Pokémon, and this interface describes the
 * properties of those images.
 */
export interface Sprites {
  /**
   * The default back sprite of the Pokémon.
   */
  back_default: string;

  /**
   * The back sprite of the Pokémon, with a transparent background.
   */
  back_transparent?: string;

  /**
   * The back sprite of the Pokémon, with a shiny version of the Pokémon.
   */
  back_shiny?: string;

  /**
   * The front sprite of the Pokémon, with a shiny version of the Pokémon.
   */
  front_shiny?: string;

  /**
   * The back sprite of the Pokémon, with a transparent background and shiny
   * version of the Pokémon.
   */
  back_shiny_transparent?: string;

  /**
   * The front sprite of the Pokémon, with a transparent background and shiny
   * version of the Pokémon.
   */
  front_shiny_transparent?: string;

  /**
   * The default front sprite of the Pokémon.
   */
  front_default: string;

  /**
   * The front sprite of the Pokémon, with a transparent background.
   */
  front_transparent?: string;

  /**
   * The back sprite of the Pokémon, with a transparent background.
   */
  back_gray?: string;

  /**
   * The front sprite of the Pokémon, with a transparent background.
   */
  front_gray?: string;

  /**
   * The front sprite of the Pokémon, with a transparent background.
   */
  front_female?: string;

  /**
   * The back sprite of the Pokémon, with a transparent background.
   */
  back_female?: string;

  /**
   * The back sprite of the Pokémon, with a shiny version of the Pokémon.
   */
  back_shiny_female?: string;

  /**
   * The front sprite of the Pokémon, with a shiny version of the Pokémon.
   */
  front_shiny_female?: string;

  /**
   * The sprites of the Pokémon in other generations.
   */
  other?: Generation;

  /**
   * The sprites of the Pokémon in different versions.
   */
  versions?: Versions;

  /**
   * The animated sprites of the Pokémon.
   */
  animated?: Sprites;
}

/**
 * An object where the key is the version name and the value is a Generation object.
 */
export interface Generation {
  [key: string]: Sprites;
}

/**
 * A Stat object describes a Pokémon's stat.
 */
export interface Stat {
  /**
   * The base stat value.
   */
  base_stat: number;
  /**
   * The effort value.
   */
  effort: number;
  /**
   * The stat name.
   */
  stat: NameUrl;
}

/**
 * A Type object describes a Pokémon's type.
 */
export interface Type {
  /**
   * The type slot.
   */
  slot: number;
  /**
   * The type name.
   */
  type: NameUrl;
}

export interface PokemonSpecies {
  /**
   * The base happiness of the species
   */
  base_happiness: number;

  /**
   * The capture rate of the species
   */
  capture_rate: number;

  /**
   * The color of the species
   */
  color: NameUrl;

  /**
   * The egg groups of the species
   */
  egg_groups: NameUrl[];

  /**
   * The evolution chain of the species
   */
  evolution_chain: NameUrl;

  /**
   * The species that can be evolved from this one
   */
  evolved_from_species?: NameUrl;

  /**
   * The flavor text entries of the species
   */
  flavor_text_entries: FlavorTextEntry[];

  /**
   * Whether the species can be converted to other forms
   */
  forms_switchable: boolean;

  /**
   * The gender ratio of the species
   */
  gender_rate: number;

  /**
   * The genus of the species
   */
  genera: Genus;

  /**
   * The generation of the species
   */
  generation: NameUrl;

  /**
   * The growth rate of the species
   */
  growth_rate: NameUrl;

  /**
   * The habitat of the species
   */
  habitat: NameUrl;

  /**
   * Whether the species has gender differences
   */
  has_gender_differences: boolean;

  /**
   * The hatch counter of the species
   */
  hatch_counter: number;

  /**
   * The ID of the species
   */
  id: number;

  /**
   * Whether the species is a baby
   */
  is_baby: boolean;

  /**
   * Whether the species is legendary
   */
  is_legendary: boolean;

  /**
   * Whether the species is mythical
   */
  is_mythical: boolean;

  /**
   * The name of the species
   */
  name: string;

  /**
   * The names of the species
   */
  names: Name;

  /**
   * The order of the species
   */
  order: number;

  /**
   * The Pal Park encounters of the species
   */
  pal_park_encounters: PalParkEncounter[];

  /**
   * The Pokedex numbers of the species
   */
  pokedex_numbers: PokedexNumber[];

  /**
   * The shape of the species
   */
  shape: NameUrl;

  /**
   * The varieties of the species
   */
  varieties: Variety;
}
/**
 * Represents a flavor text entry for a species
 */
export interface FlavorTextEntry {
  /**
   * The flavor text associated with this entry
   */
  flavor_text: string;
  /**
   * The language of the flavor text
   */
  language: NameUrl;
  /**
   * The version of the game in which this flavor text is available
   */
  version: NameUrl;
}

/**
 * Represents a genus for a species
 */
export interface Genus {
  /**
   * The genus associated with this entry
   */
  genus: string;
  /**
   * The language of the genus
   */
  language: NameUrl;
}

/**
 * Represents a name for a species
 */
export interface Name {
  /**
   * The language of the name
   */
  language: NameUrl;
  /**
   * The name associated with this entry
   */
  name: string;
}

/**
 * Represents an encounter in the Pal Park in a specific area
 */
export interface PalParkEncounter {
  /**
   * The area in which this encounter can be found in the Pal Park
   */
  area: NameUrl;
  /**
   * The base score used to calculate the encounter rate
   */
  base_score: number;
  /**
   * The encounter rate for this Pokémon in the Pal Park
   */
  rate: number;
}

/**
 * Represents a Pokedex number for a Pokémon
 */
export interface PokedexNumber {
  /**
   * The entry number for this Pokémon in the Pok edex
   */
  entry_number: number;
  /**
   * The Pokedex that this entry is part of
   */
  pokedex: NameUrl;
}

/**
 * Represents a variety of a Pokemon
 */
export interface Variety {
  /**
   * Whether this is the default variety of the pokemon
   */
  is_default: boolean;
  /**
   * The pokemon that this variety belongs to
   */
  pokemon: NameUrl;
}

/**
 * The evolution chain of a given pokemon
 */
/**
 * Represents the evolution chain of a given Pokemon
 */
export interface EvolutionChain {
  /**
   * The evolution chain itself
   */
  chain: Chain;
  /**
   * The unique ID of the evolution chain
   */
  id: number;
}

/**
 * A part of the evolution chain
 */
export interface Chain {
  /**
   * The next link in the evolution chain
   */
  evolves_to: Chain[];
  /**
   * Whether this link in the evolution chain is a baby form
   */
  is_baby: boolean;
  /**
   * The species of the pokemon at this link in the evolution chain
   */
  species: NameUrl;
}

/**
 * The different types of pokemon
 * https://pokeapi.co/docs/v2#pokemontype
 */
export type PokemonTypes =
  | 'grass'
  | 'poison'
  | 'fire'
  | 'flying'
  | 'water'
  | 'bug'
  | 'normal'
  | 'electric'
  | 'ground'
  | 'fairy'
  | 'fighting'
  | 'psychic'
  | 'rock'
  | 'ghost'
  | 'ice'
  | 'dragon'
  | 'steel'
  | 'dark'
  | 'stellar';
