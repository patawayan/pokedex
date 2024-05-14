'use client';

import { Tabs, TabsContentProps, Text, View, YStack } from '@my/ui';
import React, { useContext, useEffect, useState } from 'react';
import { AboutContent } from './about';
import { StatsContent } from './stats';
import { EvolutionsContent } from './evolutions';
import { PokemonContext } from 'app/provider/Pokemon';

/** Child Tab Props */
interface PokemonDetailsTabsProps extends React.ComponentProps<typeof View> {}

/** Pokemon Tab Types */
type PokemonTabTypes = 'about' | 'stats' | 'evolutions';

/**
 * Interface for Pokemon Tab data
 */
interface PokemonTabs {
  key: PokemonTabTypes;
  title: string;
  component: React.FC<TabsContentProps>;
}

/**
 * Pokemon Tab Data
 */
const PokemonTabData: PokemonTabs[] = [
  {
    key: 'about',
    title: 'About',
    component: AboutContent,
  },
  {
    key: 'stats',
    title: 'Base Stats',
    component: StatsContent,
  },
  {
    key: 'evolutions',
    title: 'Evolutions',
    component: EvolutionsContent,
  },
];

/** Custom Tab Title */
const TabTitle = (props: any) => {
  return <Text fontSize="$3" fontWeight="500" lineHeight="$md" fontFamily="$body" {...props} />;
};

/**
 * Pokemon Details Tabs
 */
export const PokemonDetailsTabs = (props: PokemonDetailsTabsProps) => {
  const { currentPokemon } = useContext(PokemonContext);
  const [currentTab, setCurrentTab] = useState<PokemonTabTypes>(PokemonTabData[0].key);

  /** Set initial tab */
  useEffect(() => {
    setCurrentTab(PokemonTabData[0].key);
  }, [currentPokemon]);

  return (
    <YStack
      flexGrow={1}
      pt="$7"
      backgroundColor="$white"
      borderRadius="$7.5"
      borderBottomLeftRadius="$none"
      borderBottomRightRadius="$none"
      {...props}
    >
      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as PokemonTabTypes)}
        orientation="horizontal"
        flexDirection="column"
        pt="$2.5"
      >
        <Tabs.List unstyled px="$10" gap="$2" justifyContent="space-between">
          {PokemonTabData.map((tab) => (
            <Tabs.Tab
              key={`tab-${tab.key}`}
              w="auto"
              unstyled
              p="0"
              flexDirection="column"
              value={tab.key}
            >
              <TabTitle>{tab.title}</TabTitle>
              <View
                h="$0.75"
                w="100%"
                mt="$2"
                backgroundColor="$grayMoreDarker"
                borderRadius="$3.75"
                opacity={currentTab === tab.key ? 1 : 0}
              />
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {PokemonTabData.map((Tab) => (
          <Tab.component flexGrow={1} value={Tab.key} key={Tab.key} />
        ))}
      </Tabs>
    </YStack>
  );
};
