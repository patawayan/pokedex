import { Input, XStack, YStack, styled } from '@my/ui';
import { Search, XCircle } from '@tamagui/lucide-icons';
import { PokemonSearchContext } from 'app/provider/PokemonSearch';
import { useContext } from 'react';

/**
 * Styled search input
 */
const SearchInput = styled(Input, {
  borderWidth: 0,
  focusStyle: { outlineStyle: 'none' },
  color: '$grayLight',
  p: 0,
  size: '$3.5',
  h: '$3.5',
  flexGrow: 1,
});

/**
 * Search Component for the Pokedex
 */
export const SearchComponent = (props: React.ComponentProps<typeof YStack>) => {
  const { searchValue, setSearchValue } = useContext(PokemonSearchContext);

  return (
    <YStack bc="$yellow" p="$4" jc="center" {...props}>
      <XStack gap="$1" ai="center" bc="$white" p="$2.5" borderRadius="$15">
        <Search size="$6" color="$grayLight" />
        <SearchInput
          placeholder="Search Pokedex"
          value={searchValue}
          onChangeText={setSearchValue}
          h="$4.5"
        />
        {!!searchValue && (
          <XCircle size="$6" color="$grayLight" onTouchEnd={() => setSearchValue('')} />
        )}
      </XStack>
    </YStack>
  );
};
