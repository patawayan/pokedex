'use client';

import { H5, Tabs, TabsContentProps, Text, View, useToastController } from '@my/ui';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { PokemonSpecies } from 'app/utils/types';
import React, { useState } from 'react';
import { AboutContent } from './about';
import { Pokemon } from 'packages/app/utils/types';
import { StatsContent } from './stats';
import { EvolutionsContent } from './evolutions';

interface PokemonDetailsTabsProps extends React.ComponentProps<typeof View> {}

type pokemonTabTypes = 'about' | 'stats' | 'evolutions';

interface PokemonTabs {
  key: pokemonTabTypes;
  title: string;
  component: React.FC<TabsContentProps>;
}

const PokemonTabKeys: PokemonTabs[] = [
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

const TabTitle = (props: any) => {
  return <Text fontSize="$3" fontWeight="500" lineHeight="$md" fontFamily="$body" {...props} />;
};

export const PokemonDetailsTabs = (props: PokemonDetailsTabsProps) => {
  return (
    <View
      w={'100%'}
      px="$10"
      pt="$7"
      pb="$7"
      backgroundColor="$white"
      borderRadius="$7.5"
      borderBottomLeftRadius="$none"
      borderBottomRightRadius="$none"
      {...props}
    >
      <Tabs
        defaultValue={PokemonTabKeys[0].key}
        orientation="horizontal"
        flexDirection="column"
        flex={1}
        p="$2.5"
      >
        <Tabs.List unstyled p="0" gap="$2" justifyContent="space-between">
          {PokemonTabKeys.map((tab) => (
            <Tabs.Tab
              key={`tab-${tab.key}`}
              w="auto"
              unstyled
              p="0"
              value={tab.key}
              focusStyle={{
                outlineWidth: 2,
              }}
            >
              <TabTitle>{tab.title}</TabTitle>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {PokemonTabKeys.map((Tab) => (
          <Tab.component flexGrow={1} value={Tab.key} key={Tab.key} />
        ))}
      </Tabs>
    </View>
  );
};
