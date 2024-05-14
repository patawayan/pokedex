import { getTokens } from '@my/ui';
import { PokemonScreen } from 'app/features/pokemon/details/screen';
import { Stack } from 'expo-router';

export default function Screen() {
  const { color } = getTokens();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          statusBarColor: color.$mediumGoldenRod.val,
          statusBarStyle: 'dark',
        }}
      />
      <PokemonScreen />
    </>
  );
}
