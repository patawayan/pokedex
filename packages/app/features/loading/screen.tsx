import { View, YStack } from '@my/ui';
import { PokedexSvg } from 'app/assets/pokedexSvg';
import { useEffect, useMemo, useState } from 'react';

/**
 * Loading screen with a rotating pokedex icon to indicate loading
 */
export function LoadingScreen() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((x) => x + 40);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const positionString = useMemo(() => `${position}deg`, [position]);

  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4" bc="$yellow" h="100vh" w="100vw">
      <YStack gap="$4">
        <View animateOnly={['transform']} animation="medium" rotate={positionString}>
          <PokedexSvg />
        </View>
      </YStack>
    </YStack>
  );
}
