import { YStack } from '@my/ui';
import { PokeList } from '../pokemon/list/list';
import { SearchComponent } from '../pokemon/search';

/**
 * Pokedex Home Screen
 */
export const HomeScreen = () => {
  return (
    <YStack h="100vh">
      <SearchComponent flexBasis="$19" />
      <PokeList flexBasis="calc(100vh - 76px)" />
    </YStack>
  );
};
