import { View, YStack } from '@my/ui';
import { PokedexSvg } from 'app/assets/pokedexSvg';
import { useEffect, useMemo, useState } from 'react';

/**
 * Loading screen with a rotating pokedex icon to indicate loading
 */
export function LoadingScreen() {
  /** Degrees to rotate */
  const [degree, setDegree] = useState(0);

  /** Rotate image every 200ms */
  useEffect(() => {
    setDegree((x) => x + 40);
    const interval = setInterval(() => {
      setDegree((x) => x + 40);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const degreeString = useMemo(() => `${degree}deg`, [degree]);

  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4" bc="$yellow" h="100vh" w="100vw">
      <YStack gap="$4">
        <View animateOnly={['transform']} animation="medium" rotate={degreeString}>
          <PokedexSvg />
        </View>
      </YStack>
    </YStack>
  );
}
