'use client';

import {
  Text,
  View,
  XStack,
  YStack,
  Image,
  ScrollView,
  ZStack,
  TamaguiElement,
  GetRef,
  Spinner,
} from '@my/ui';
import { Pokemon } from 'app/utils/types';
import { capitalize, paddedNum } from 'app/utils/textUtils';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { PokemonTypesList } from './tag';
import { PokedexSvg } from 'app/assets/pokedexSvg';
import { PokemonContext } from 'app/provider/Pokemon';
import { useRouter } from 'solito/router';
import { formatLabelName } from './details/detail';
import { Link } from 'solito/link';
import { PokeListItem } from './list-item';

/**
 * Main list of pokemon
 */
export const PokeList = () => {
  const { pokeData, loadMorePokemon, isThereMoreToLoad, isLoading } = useContext(PokemonContext);

  /** Reference to the scroll element */
  const scrollRef = useRef<GetRef<TamaguiElement>>();

  /**
   * Load more pokemon when reaching end of scroll
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      // Reaching end of scroll
      if (entry.isIntersecting) {
        loadMorePokemon();
      }
    });

    // Only attach observer if initial pokeData has been loaded in
    if (pokeData?.length && scrollRef?.current) {
      // @ts-ignore
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, [pokeData, scrollRef.current]);

  return (
    <ScrollView flexGrow={1}>
      <YStack ai="center" gap="$2" pt="$5" pb="$13" borderRadius={'$0.75'}>
        {pokeData?.map((item: Pokemon, index) => (
          <PokeListItem key={`${item.name}-${item.id}`} pokemon={item}>
            {/** Start loading new pokemon when reaching near the end of the list */}
            {(pokeData?.length - 10 > 0 ? index === pokeData?.length - 10 : index === 0) && (
              // @ts-ignore
              <YStack ref={scrollRef} />
            )}
          </PokeListItem>
        ))}

        <YStack h="$4" w="100%" ai="center">
          {isThereMoreToLoad && <Spinner color="$hillary" size="large" p="$3" />}
          {pokeData.length === 0 && !isLoading && <Text color="$hillary">No results found</Text>}
        </YStack>
      </YStack>
    </ScrollView>
  );
};
