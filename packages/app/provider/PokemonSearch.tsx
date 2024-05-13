'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NameUrl, Pokemon, PokemonRequest, PokemonSpecies } from '../utils/types';
import { useDebounceValue } from '@my/ui';
import { ConsoleView } from 'react-device-detect';
import { PokemonContext } from './Pokemon';

interface PokemonSearchContextProperties {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const PokemonSearchContext = createContext<PokemonSearchContextProperties>({
  searchValue: '',
  setSearchValue: () => {},
});

export const PokemonSearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { allPokemonUrls, setPokemonUrls } = useContext(PokemonContext);

  const filteredPokemonUrls = useDebounceValue(
    useMemo(() => {
      if (!searchValue) return [];
      return allPokemonUrls?.filter((urls) =>
        urls.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [allPokemonUrls, searchValue]),
    1500
  );

  useEffect(() => {
    if (!!searchValue && filteredPokemonUrls) {
      setPokemonUrls(filteredPokemonUrls);
    }
  }, [filteredPokemonUrls]);

  useEffect(() => {
    if (!searchValue && allPokemonUrls) {
      setPokemonUrls(allPokemonUrls);
    }
    console.log('searchvalue', searchValue);
  }, [searchValue]);

  return (
    <PokemonSearchContext.Provider
      value={{
        setSearchValue,
        searchValue,
      }}
    >
      {children}
    </PokemonSearchContext.Provider>
  );
};
