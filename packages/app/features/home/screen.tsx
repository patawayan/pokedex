import {
  Anchor,
  Button,
  H1,
  isWeb,
  isClient,
  Paragraph,
  Separator,
  Sheet,
  Text,
  useToastController,
  View,
  Input,
  XStack,
  YStack,
  styled,
} from '@my/ui';
import { ChevronDown, Search, ChevronUp } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { useLink } from 'solito/link';
import { SearchComponent } from './search';
import { PokeList } from '../pokemon/list';

/**
 * Home Screen
 */
export const HomeScreen = () => {
  return (
    <YStack h="100vh">
      <SearchComponent />
      <PokeList />
    </YStack>
  );
};
