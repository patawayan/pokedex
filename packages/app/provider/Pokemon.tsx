'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { NameUrl, Pokemon, PokemonRequest, PokemonSpecies } from '../utils/types';
import { ConsoleView } from 'react-device-detect';
import { useToastController } from '@my/ui';
import { AppContext } from './App';

interface PokemonContextProperties {
  pokeData: Pokemon[];
  doSetCurrentPokemon: (id: string) => Promise<void>;
  currentPokemon?: Pokemon;
  currentPokemonSpecies?: PokemonSpecies;
  clearCurrentPokemon: () => void;
  nextUrl?: string;
  loadMorePokemon: () => Promise<void>;
  pokemonUrls?: NameUrl[];
  allPokemonUrls?: NameUrl[];
  setPokemonUrls: (urls: NameUrl[]) => void;
  isThereMoreToLoad: boolean;
  isLoadingSpecies: boolean;
  isLoading: boolean;
}

export const PokemonContext = createContext<PokemonContextProperties>({
  pokeData: [],
  doSetCurrentPokemon: async (id: string) => {},
  clearCurrentPokemon: () => {},
  loadMorePokemon: async () => {},
  pokemonUrls: [],
  setPokemonUrls: async (urls: NameUrl[]) => {},
  isThereMoreToLoad: true,
  isLoadingSpecies: false,
  isLoading: false,
});

export const PokemonProvider = ({ children }) => {
  const { show } = useToastController();
  const { getJSONData } = useContext(AppContext);

  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();
  const [currentPokemonSpecies, setCurrentPokemonSpecies] = useState<PokemonSpecies>();
  const [isLoading, setIsLoading] = useState(false);
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
      const newPokeData = [
        ...pokeData,
        ...additionalPokeData.flatMap((data: PokemonRequest) =>
          data.status === 'fulfilled' ? data.value : []
        ),
      ];

      setPokemonLoaded((currentValue) => currentValue + 20);
      setPokeData(newPokeData);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, pokemonUrls, pokemonLoaded, pokeData]);

  /** True if there are more pokemon to load */
  const isThereMoreToLoad = pokemonUrls.length > pokemonLoaded;

  useEffect(() => {
    initializePokemonUrls();
  }, []);

  useEffect(() => {
    if (pokemonUrls.length > 0) {
      loadMorePokemon();
    }
  }, [pokemonUrls]);

  return (
    <PokemonContext.Provider
      value={{
        pokeData,
        doSetCurrentPokemon,
        currentPokemon,
        currentPokemonSpecies,
        clearCurrentPokemon,
        loadMorePokemon,
        pokemonUrls,
        allPokemonUrls,
        setPokemonUrls: doSetPokemonUrls,
        isThereMoreToLoad,
        isLoadingSpecies,
        isLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
