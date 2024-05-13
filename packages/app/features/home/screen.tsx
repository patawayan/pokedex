import { YStack } from '@my/ui';
import { SearchComponent } from './search';
import { PokeList } from '../pokemon/list';

/**
 * Pokedex Home Screen
 */
export const HomeScreen = () => {
  return (
    <YStack h="100vh">
      <SearchComponent />
      <PokeList />
    </YStack>
  );
};
