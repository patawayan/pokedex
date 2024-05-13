import { ScrollView, Tabs, TabsContentProps, YStack, Text, Spinner } from '@my/ui';
import { PokeListItem } from '../list';
import { Pokemon } from 'app/utils/types';
import { useState, useEffect, useContext } from 'react';
import { PokemonContext } from 'app/provider/Pokemon';
import { AppContext } from 'app/provider/App';
import { EvolutionChain, Chain, NameUrl, PokemonSpecies } from 'app/utils/types';

export const EvolutionsContent = (props: TabsContentProps) => {
  const { currentPokemonSpecies } = useContext(PokemonContext);
  const { getJSONData } = useContext(AppContext);
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const recursiveGetEvolutionChain = (chain: Chain): NameUrl[] => {
    return [
      chain.species,
      ...(chain.evolves_to.length > 0
        ? chain.evolves_to.flatMap((subChain) => recursiveGetEvolutionChain(subChain))
        : []),
    ];
  };

  const getEvolutionChain = async (url: string) => {
    try {
      setIsLoading(true);

      const evolutionChain: EvolutionChain = await getJSONData(url);

      const evolutionChainUrlList = recursiveGetEvolutionChain(evolutionChain.chain);
      const evolutionList = await Promise.allSettled(
        evolutionChainUrlList.map(async (species) => {
          const pokemonSpecies: PokemonSpecies = await getJSONData(species.url);
          return (await getJSONData(
            `https://pokeapi.co/api/v2/pokemon/${pokemonSpecies.id}`
          )) as Pokemon;
        })
      );

      setEvolutions(
        evolutionList.flatMap((evolution) =>
          evolution.status === 'fulfilled' ? evolution.value : []
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPokemonSpecies && currentPokemonSpecies.evolution_chain) {
      getEvolutionChain(currentPokemonSpecies.evolution_chain.url);
    }
  }, [currentPokemonSpecies]);

  return (
    <Tabs.Content {...props}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack height="100%" justifyContent="center" py="$5" gap="$2.5" ai="center">
          {currentPokemonSpecies &&
            evolutions.map((pokemon) => (
              <PokeListItem
                key={`${currentPokemonSpecies.name}-${pokemon.name}-${pokemon.id}`}
                pokemon={pokemon}
              />
            ))}
          <YStack h="$4" w="100%" ai="center">
            {isLoading && <Spinner color="$hillary" size="large" p="$3" />}
            {evolutions.length === 0 && !isLoading && (
              <Text color="$hillary">No evolutions found</Text>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </Tabs.Content>
  );
};
