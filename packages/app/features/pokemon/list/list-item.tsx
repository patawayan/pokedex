'use client';

import { Text, View, XStack, YStack, Image, ZStack } from '@my/ui';
import { Pokemon } from 'app/utils/types';
import { paddedNum } from 'app/utils/textUtils';
import { PokedexSvg } from 'app/assets/pokedexSvg';
import { Link } from 'solito/link';
import { formatLabelName } from '../details/detail';
import { PokemonTypesList } from '../tag';

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
