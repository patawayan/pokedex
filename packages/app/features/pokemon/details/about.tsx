'use client';

import { ScrollView, Spinner, Tabs, View, YStack } from '@my/ui';
import { capitalize } from 'app/utils/textUtils';
import { DetailItem, TitleText, formatLabelName } from './detail';
import { TabsContentProps } from '@my/ui';
import { useContext } from 'react';
import { PokemonContext } from 'app/provider/Pokemon';

export const AboutContent = (props: TabsContentProps) => {
  const { ...tabContentProps } = props;
  const { currentPokemon, currentPokemonSpecies, isLoadingSpecies } = useContext(PokemonContext);

  return (
    <Tabs.Content {...tabContentProps}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack height="100%" jc="flex-start" py="$5" gap="$2.5">
          {currentPokemon && (
            <>
              <DetailItem label="species" value={capitalize(currentPokemon.species.name ?? '')} />
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
      </ScrollView>
    </Tabs.Content>
  );
};
