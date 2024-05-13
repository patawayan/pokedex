'use client';

import { Button, H3, Image, Paragraph, ScrollView, View, XStack, YStack, ZStack } from '@my/ui';
import { ArrowLeft, ChevronLeft } from '@tamagui/lucide-icons';
import { PokemonContext } from 'app/provider/Pokemon';
import { PokedexSvg } from 'app/assets/pokedexSvg';
import React, { useCallback, useContext, useEffect } from 'react';
import { createParam } from 'solito';
import { useLink } from 'solito/link';
import { useRouter } from 'solito/router';
import { PokemonTypesList } from './tag';
import { PokemonDetailsTabs } from './details/tabs';
import { capitalize, paddedNum } from 'app/utils/textUtils';
import { LoadingScreen } from '../loading/screen';
import { formatLabelName } from './details/detail';

const { useParam } = createParam<{ id: string }>();

export const PokemonScreen = () => {
  const [id] = useParam('id');
  const { currentPokemon, currentPokemonSpecies, doSetCurrentPokemon, clearCurrentPokemon } =
    useContext(PokemonContext);
  const router = useRouter();

  useEffect(() => {
    if (id) doSetCurrentPokemon(id);
  }, [id]);

  const goBack = useCallback(() => {
    clearCurrentPokemon();
    router.back();
  }, [clearCurrentPokemon, router]);

  useEffect(() => {
    console.log(currentPokemon);
  }, [currentPokemon]);

  return currentPokemon ? (
    <YStack h="100vh" w="100%" ai="center" jc="center" bc="$yellow">
      <XStack gap="$2" p="$4" ai="center" w="100%" zIndex={100} bc="$yellow">
        <ArrowLeft onTouchEnd={goBack} />
        <H3 fontWeight="700" lineHeight="$md" size="$4.5">
          {currentPokemon
            ? `${formatLabelName(currentPokemon.name)} #${paddedNum(currentPokemon.id)}`
            : 'Pokemon'}
        </H3>
      </XStack>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ZStack minWidth="100vw" minHeight="100px" height="100px">
          <View y={-70} w="min-content">
            <PokedexSvg height={235} width={235} fillOpacity={0.5} />
          </View>
          <XStack h="100%" w="100vw" ai="center" jc="center">
            <View flexBasis={'33%'}></View>
            <Image
              flexBasis={'33%'}
              alt={currentPokemon.name}
              source={{ uri: currentPokemon.sprites.front_default, width: 96, height: 96 }}
            />
            <PokemonTypesList flexBasis={'33%'} pokemon={currentPokemon} />
          </XStack>
        </ZStack>
        <PokemonDetailsTabs flexGrow={1} />
      </ScrollView>
    </YStack>
  ) : (
    <LoadingScreen />
  );
};
