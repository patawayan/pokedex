'use client';

import { useContext } from 'react';
import { Text, YStack, Spinner, ViewProps } from '@my/ui';
import { FlatList } from 'react-native';
import { PokemonContext } from 'app/provider/Pokemon';
import { PokeListItem } from './list-item';

/**
 * Native version of PokeList
 */
export const PokeListNative = (props: ViewProps) => {
  const { pokeData, isThereMoreToLoad, isLoading, loadMorePokemon } = useContext(PokemonContext);

  return (
    <YStack pt="$5" {...props}>
      <FlatList
        style={{ width: '100%', display: 'flex' }}
        contentContainerStyle={{
          width: '100%',
          gap: 8,
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 150,
          flexGrow: 1,
        }}
        data={pokeData}
        keyExtractor={(pokemon) => `${pokemon.name}-${pokemon.id}`}
        renderItem={({ item }) => <PokeListItem pokemon={item} />}
        ListFooterComponent={
          <YStack h="$4" w="100%" ai="center">
            {isThereMoreToLoad && <Spinner color="$hillary" size="large" p="$3" />}
          </YStack>
        }
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={(pokeData.length - 10) / pokeData.length}
        ListEmptyComponent={
          <YStack h="$10" w="100%" ai="center">
            {pokeData.length === 0 && !isLoading && <Text color="$hillary">No results found</Text>}
          </YStack>
        }
      />
    </YStack>
  );
};
