import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { NameUrl, Pokemon, PokemonRequest, PokemonSpecies } from '../utils/types';
import { useToastController } from '@my/ui';
import { AppContext } from './App';

/**
 * Context for the pokemon data and functions
 */
export interface PokemonContextProperties {
  /**
   * The list of all pokemon urls
   */
  allPokemonUrls?: NameUrl[];

  /**
   * The current pokemon
   */
  currentPokemon?: Pokemon;

  /**
   * The current pokemon's species
   */
  currentPokemonSpecies?: PokemonSpecies;

  /**
   * Whether the pokemon data is loading
   */
  isLoading: boolean;

  /**
   * Whether the species data is loading
   */
  isLoadingSpecies: boolean;

  /**
   * Whether there are more pokemon to load
   */
  isThereMoreToLoad: boolean;

  /**
   * The next url in the list of pokemon
   */
  nextUrl?: string;

  /**
   * Array of pokemon data
   */
  pokeData: Pokemon[];

  /**
   * The list of urls for all pokemon
   */
  pokemonUrls?: NameUrl[];

  /**
   * Clears the current pokemon
   */
  clearCurrentPokemon: () => void;

  /**
   * Sets the current pokemon with the given id
   * @param id The id of the pokemon to set as the current one
   */
  doSetCurrentPokemon: (id: string) => Promise<void>;

  /**
   * Loads more pokemon
   */
  loadMorePokemon: () => Promise<void>;

  /**
   * Sets the list of pokemon urls
   * @param urls The list of urls to set
   */
  setPokemonUrls: (urls: NameUrl[]) => void;
}

/**
 * Initializes the pokemon context
 */
export const PokemonContext = createContext<PokemonContextProperties>({
  isLoading: false,
  isLoadingSpecies: false,
  isThereMoreToLoad: true,
  pokeData: [],
  pokemonUrls: [],
  clearCurrentPokemon: () => {},
  doSetCurrentPokemon: async (id: string) => {},
  loadMorePokemon: async () => {},
  setPokemonUrls: async (urls: NameUrl[]) => {},
});

/**
 * Pokemon Data COntext Provider
 */
export const PokemonProvider = ({ children }) => {
  const { show } = useToastController();
  const { getJSONData } = useContext(AppContext);

  // ======================================= STATES ======================================

  /**
   * Array of pokemon data
   */
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);

  /**
   * The current pokemon
   */
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

  /**
   * The current pokemon's species
   */
  const [currentPokemonSpecies, setCurrentPokemonSpecies] = useState<PokemonSpecies>();

  /**
   * Whether the pokemon data is loading
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Whether the species data is loading
   */
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(false);

  /**
   * All pokemon data urls
   */
  const [allPokemonUrls, setAllPokemonUrls] = useState<NameUrl[]>([]);
  /**
   * Pokemon URLs currently being loaded
   */
  const [pokemonUrls, setPokemonUrls] = useState<NameUrl[]>([]);

  /**
   * Numerical value representing how many pokemon have been loaded
   */
  const [pokemonLoaded, setPokemonLoaded] = useState(0);

  /** True if there are more pokemon to load */
  const isThereMoreToLoad = pokemonUrls.length > pokemonLoaded && isLoading;

  // ======================================== FUNCTIONS =======================================

  /**
   * Initializes the pokemon urls
   */
  const initializePokemonUrls = async () => {
    const data = await getJSONData('https://pokeapi.co/api/v2/pokemon?limit=2000');
    setAllPokemonUrls(data.results);
    setPokemonUrls(data.results);
  };

  /**
   * When setting pokemon Urls outside of the provider, this function should be used.
   * @param urls
   */
  const doSetPokemonUrls = (urls: NameUrl[]) => {
    setPokemonLoaded(0);
    setPokeData([]);
    setPokemonUrls(urls);
  };

  /**
   * Does the actual setting of the current pokemon
   * @param id
   */
  const doSetCurrentPokemon = async (id: string) => {
    const idNumber = parseInt(id);

    if (isNaN(idNumber)) {
      return;
    }

    const pokemon = (await getJSONData(`https://pokeapi.co/api/v2/pokemon/${idNumber}`)) as Pokemon;

    setCurrentPokemon(pokemon);

    try {
      setIsLoadingSpecies(true);
      const pokemonSpecie = (await getJSONData(pokemon?.species?.url)) as PokemonSpecies;
      setCurrentPokemonSpecies(pokemonSpecie);
    } catch (error) {
      show('Species data not found!');
    } finally {
      setIsLoadingSpecies(false);
    }
  };

  /**
   * Clears the current pokemon data and pokemon species
   */
  const clearCurrentPokemon = () => {
    setCurrentPokemon(undefined);
    setCurrentPokemonSpecies(undefined);
  };

  /**
   * This function is used to load more pokemon further down the pokemon urls list
   */
  const loadMorePokemon = useCallback(async () => {
    if (isLoading) {
      return;
    }

    if (pokemonUrls.length < 0) {
      return;
    }

    setIsLoading(true);
    try {
      const pokeUrls = pokemonUrls.slice(pokemonLoaded, pokemonLoaded + 20);
      const additionalPokeData = await Promise.allSettled(
        pokeUrls.map((pokemon: NameUrl) => getJSONData(pokemon.url) as Promise<Pokemon>)
      );

      // Add the additional pokemon count to the loaded pokemon count
      setPokemonLoaded((currentValue) => currentValue + 20);

      setPokeData((currentValue) => [
        ...currentValue,
        ...additionalPokeData.flatMap((data: PokemonRequest) =>
          data.status === 'fulfilled' ? data.value : []
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, pokemonUrls, pokemonLoaded, pokeData]);

  // ======================================= EFFECTS =======================================

  /** Initializes the pokemon urls */
  useEffect(() => {
    initializePokemonUrls();
  }, []);

  /** Loads more pokemon when pokemonUrls changes */
  useEffect(() => {
    if (pokemonUrls.length > 0) {
      loadMorePokemon();
    }
  }, [pokemonUrls]);

  return (
    <PokemonContext.Provider
      value={{
        allPokemonUrls,
        currentPokemon,
        currentPokemonSpecies,
        isLoading,
        isLoadingSpecies,
        isThereMoreToLoad,
        pokeData,
        pokemonUrls,
        clearCurrentPokemon,
        doSetCurrentPokemon,
        loadMorePokemon,
        setPokemonUrls: doSetPokemonUrls,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
