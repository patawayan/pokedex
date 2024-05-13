'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDebounceValue } from '@my/ui';
import { PokemonContext } from './Pokemon';

/**
 * Pokemon Search Context Properties
 */
interface PokemonSearchContextProperties {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Pokemon Search Context
 */
export const PokemonSearchContext = createContext<PokemonSearchContextProperties>({
  searchValue: '',
  setSearchValue: () => {},
});

/**
 * Pokemon Search Provider
 * Extracted into a provider to persist search value throughout the app
 */
export const PokemonSearchProvider = ({ children }) => {
  // ==================================== STATES ====================================

  const { allPokemonUrls, setPokemonUrls } = useContext(PokemonContext);
  /** Search value used for filtering */
  const [searchValue, setSearchValue] = useState<string>('');

  // ==================================== DERIVED STATES ====================================

  /**
   * Pokemon URLs filtered by search
   */
  const filteredPokemonUrls = useDebounceValue(
    useMemo(() => {
      if (!searchValue) return [];
      return allPokemonUrls?.filter((urls) =>
        urls.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [allPokemonUrls, searchValue]),
    1500
  );

  // ==================================== EFFECTS ====================================

  /**
   * Sets pokemon urls when filteredPokemonUrls changes
   */
  useEffect(() => {
    if (!!searchValue && filteredPokemonUrls) {
      setPokemonUrls(filteredPokemonUrls);
    }
  }, [filteredPokemonUrls]);

  /**
   * Reset pokemon urls when searchValue is cleared
   */
  useEffect(() => {
    if (!searchValue && allPokemonUrls) {
      setPokemonUrls(allPokemonUrls);
    }
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
