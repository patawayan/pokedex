'use client';

import { useContext } from 'react';
import { Text, YStack } from '@my/ui';
import { FlatList } from 'react-native';
import { PokemonContext } from 'app/provider/Pokemon';
import { PokeListItem } from './list-item';
import { Spinner } from '@my/ui';
import { AppContext } from 'app/provider/App';
import { PokeListNative } from './native';
import { PokeListWeb } from './web';
import { ViewProps } from '@my/ui';

/**
 * Main list of pokemon
 */
export const PokeList = (props: ViewProps) => {
  const { isMobileApp } = useContext(AppContext);

  return isMobileApp ? <PokeListNative {...props} /> : <PokeListWeb {...props} />;
};
