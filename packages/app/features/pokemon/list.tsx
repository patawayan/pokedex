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
      <YStack ai="center" gap="$2" pt="$5" pb="$13">
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

/**
 * Pokemon List Card with basic info
 */
export const PokeListItem = (props: { pokemon: Pokemon; children?: React.ReactNode }) => {
  const { pokemon, children } = props;

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      scroll
      replace
      experimental={{
        nativeBehavior: 'stack-replace',
        isNestedNavigator: true,
      }}
    >
      <ZStack bg="$yellow" borderRadius="$3.75" w="$55" h="$35" overflow="hidden">
        <View x={-60} y={15}>
          <PokedexSvg height={160} width={160} fillOpacity={0.5} />
        </View>
        <XStack px="$2" py="$4" jc="center" w="$55" h="$35" gap="$2" ai="center">
          <Image
            alt={pokemon.name}
            source={{ uri: pokemon.sprites.front_default, width: 96, height: 96 }}
            flexBasis="50%"
          />

          <YStack gap="$0.75" flexBasis="50%">
            <YStack gap="$0.75">
              <Text fontSize="$4.5" fontWeight="bold" color="$title" wordWrap="break-word">
                {formatLabelName(pokemon.name)}
              </Text>
              <Text fontSize="$3" fontWeight="bold" color="$color" lineHeight="$md">
                {`#${paddedNum(pokemon.id)}`}
              </Text>
            </YStack>
            <PokemonTypesList pokemon={pokemon} />
          </YStack>
          {children}
        </XStack>
      </ZStack>
    </Link>
  );
};
