'use client';

import { Spinner, Tabs, View, YStack } from '@my/ui';
import { DetailItem, TitleText, formatLabelName } from './detail';
import { TabsContentProps } from '@my/ui';
import { useContext } from 'react';
import { PokemonContext } from 'app/provider/Pokemon';

/**
 * Species details of the current pokemon
 */
export const AboutContent = (props: TabsContentProps) => {
  const { ...tabContentProps } = props;
  const { currentPokemon, currentPokemonSpecies, isLoadingSpecies } = useContext(PokemonContext);

  return (
    <Tabs.Content {...tabContentProps}>
      <YStack flexGrow={1} gap="$2.5" py="$5" px="$10">
        {currentPokemon && (
          <>
            <DetailItem
              label="species"
              value={formatLabelName(currentPokemon.species.name ?? '')}
            />
            <DetailItem label="weight" value={`${currentPokemon.weight / 10}kg`} />
            <DetailItem label="height" value={`${currentPokemon.height / 10}cm`} />
          </>
        )}

        {currentPokemonSpecies && (
          <>
            <DetailItem
              label="Egg Groups"
              value={currentPokemonSpecies.egg_groups
                .map((group) => group.name && formatLabelName(group.name))
                .join(', ')}
            />
            <TitleText w="auto" color="$grayDark" textDecorationLine="underline">
              Flavor Text
            </TitleText>
            {currentPokemonSpecies.flavor_text_entries
              .filter((entry) => entry.language.name === 'en')
              .map((entry) => (
                <DetailItem
                  key={entry.version.name ?? ''}
                  label={entry.version.name ?? ''}
                  value={`"${entry.flavor_text.replaceAll('\n', ' ').replaceAll('\f', ' ')}"`}
                />
              ))}
          </>
        )}
        {isLoadingSpecies && (
          <View pt="$4">
            <Spinner color="$hillary" size="large" />
          </View>
        )}
      </YStack>
    </Tabs.Content>
  );
};
