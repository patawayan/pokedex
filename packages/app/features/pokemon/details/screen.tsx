'use client';

import {
  Button,
  H3,
  Image,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
  ZStack,
  GetRef,
  TamaguiElement,
  Text,
} from '@my/ui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { PokemonContext } from 'app/provider/Pokemon';
import { PokedexSvg } from 'app/assets/pokedexSvg';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';
import { PokemonTypesList } from '../tag';
import { PokemonDetailsTabs } from './tabs';
import { paddedNum } from 'app/utils/textUtils';
import { LoadingScreen } from '../../loading/screen';
import { formatLabelName } from './detail';
import { AboutContent } from './about';

/**
 * Used to get the id from the url
 */
const { useParam } = createParam<{ id: string }>();

/**
 * The main screen for pokemon details
 */
export const PokemonScreen = () => {
  // ==================================== STATES ====================================
  const [id] = useParam('id');

  const { currentPokemon, doSetCurrentPokemon, clearCurrentPokemon } = useContext(PokemonContext);

  const router = useRouter();

  /** Use to scroll to top on change of current pokemon */
  const scrollRef = useRef<GetRef<TamaguiElement>>();

  // ==================================== CALLBACKS ====================================

  /** Go back to previous screen */
  const goBack = useCallback(() => {
    clearCurrentPokemon();
    router.push('/');
  }, [clearCurrentPokemon, router]);

  // ==================================== EFFECTS ====================================

  /** Scroll to top on change of current pokemon */
  useEffect(() => {
    // @ts-ignore
    scrollRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [currentPokemon]);

  /** Set current pokemon on load of screen */
  useEffect(() => {
    if (id) doSetCurrentPokemon(id);
  }, [id]);

  return currentPokemon ? (
    <YStack ai="center" jc="center" bc="$yellow" h="100vh">
      <XStack
        flexBasis="$14"
        gap="$2"
        p="$4"
        ai="center"
        w="100%"
        zIndex={100}
        bc="$yellow"
        pt="$4"
      >
        <ArrowLeft onTouchEnd={goBack} />
        <Text fontWeight="700" lineHeight="$md" fontSize="$4.5" h="auto">
          {currentPokemon
            ? `${formatLabelName(currentPokemon.name)} #${paddedNum(currentPokemon.id)}`
            : 'Pokemon'}
        </Text>
      </XStack>
      {/** @ts-ignore */}
      <ScrollView ref={scrollRef} flexGrow={1} contentContainerStyle={{ flexGrow: 1 }}>
        <ZStack minWidth="100vw" minHeight="$25" height="$25" overflow="hidden">
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
