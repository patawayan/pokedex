import { ScrollView, Tabs, TabsContentProps, View, XStack, YStack } from '@my/ui';

import { TitleText, ValueText, formatLabelName } from './detail';
import { useContext } from 'react';
import { PokemonContext } from 'app/provider/Pokemon';

export const StatsContent = (props: TabsContentProps) => {
  const { currentPokemon } = useContext(PokemonContext);

  return (
    <Tabs.Content {...props}>
      <ScrollView height="100%">
        <YStack height="100%" justifyContent="center" py="$5" gap="$2.5">
          {currentPokemon?.stats.map((stat) => (
            <XStack w="100%" ai="center" key={`${currentPokemon.name}-${stat.stat.name}`}>
              <TitleText flexBasis="25%" color="$gray">
                {formatLabelName(stat.stat.name ?? '')}
              </TitleText>
              <ValueText flexBasis="15%">{stat.base_stat}</ValueText>
              <View
                w={stat.base_stat}
                h="3px"
                borderRadius="$3.75"
                borderColor="unset"
                backgroundColor="$pastelGreen"
              />
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </Tabs.Content>
  );
};
