import { ScrollView, Tabs, TabsContentProps, YStack, Text, Spinner } from '@my/ui';
import { PokeListItem } from '../list';
import { Pokemon } from 'app/utils/types';
import { useState, useEffect, useContext } from 'react';
import { PokemonContext } from 'app/provider/Pokemon';
import { AppContext } from 'app/provider/App';
import { EvolutionChain, Chain, NameUrl, PokemonSpecies } from 'app/utils/types';

/**
 * Evolution Chain of the current Pokemon
 */
export const EvolutionsContent = (props: TabsContentProps) => {
  const { currentPokemonSpecies } = useContext(PokemonContext);
  const { getJSONData } = useContext(AppContext);

  // ========================================== STATES ========================================

  /**
   * Data of the pokemon in the evolution chain of the current Pokemon.
   */
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);

  /**
   * Indicates if the evolution chain data is loading
   */
  const [isLoading, setIsLoading] = useState(true);

  // ======================================== FUNCTIONS =======================================

  /**
   * A recursive function to return the evolution chain as a list of urls
   */
  const recursiveGetEvolutionChain = (chain: Chain): NameUrl[] => {
    return [
      chain.species,
      ...(chain.evolves_to.length > 0
        ? chain.evolves_to.flatMap((subChain) => recursiveGetEvolutionChain(subChain))
        : []),
    ];
  };

  /**
   * Retrieves the evolution chain of the current pokemon
   *
   * @param url The url of the evolution chain
   */
  const getEvolutionChain = async (url: string) => {
    try {
      setIsLoading(true);

      const evolutionChain: EvolutionChain = await getJSONData(url);

      // Get the urls of the pokemon in the evolution chain
      const evolutionChainUrlList = recursiveGetEvolutionChain(evolutionChain.chain);

      // Get the pokemon data for each pokemon in the evolution chain
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

  // ======================================== EFFECTS ========================================

  /** Set the evolution chain once the current pokemon species is loaded */
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
          <YStack w="100%" ai="center">
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
