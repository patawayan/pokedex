'use client';

import { Text, View, YStack } from '@my/ui';
import { capitalize } from 'app/utils/textUtils';
import { Pokemon } from 'packages/app/utils/types';
import React from 'react';

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

const PokemonTypeColors: Record<PokemonTypes, string> = {
  normal: '$hillary',
  fire: '$sun',
  water: '$cornflowerBlue',
  electric: '$saffron',
  grass: '$mantisGreen',
  ice: '$regentStBlue',
  fighting: '$fireBrick',
  poison: '$violetBlue',
  ground: '$chenin',
  flying: '$mediumSlateBlue',
  psychic: '$brinkPink',
  bug: '$bahia',
  rock: '$hokeyPokey',
  ghost: '$butterflyBlush',
  dragon: '$hanPurple',
  dark: '$quincy',
  steel: '$blueHaze',
  fairy: '$chantilly',
  stellar: '$summerSky',
};

export const TypeTag = ({ type }: { type: PokemonTypes }) => {
  return (
    <View bg={PokemonTypeColors[type]} w="$25" p="$2" ai="center" borderRadius="$7.5">
      <Text fontSize="$3" fontWeight="bold" lineHeight="$xs" color="$white">
        {capitalize(type)}
      </Text>
    </View>
  );
};

export const PokemonTypesList = ({
  pokemon,
  ...props
}: { pokemon: Pokemon } & React.ComponentProps<typeof YStack>) => {
  return (
    <YStack gap="$0.75" {...props}>
      {pokemon.types.map((type) => (
        <TypeTag key={`${pokemon.order}-${type.type.name}`} type={type.type.name as PokemonTypes} />
      ))}
    </YStack>
  );
};
