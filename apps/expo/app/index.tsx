import { YStack, getTokens } from '@my/ui';
import { HomeScreen } from 'app/features/home/screen';
import { PokeListNative } from 'app/features/pokemon/list/native';
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
      <HomeScreen>
        <YStack flexBasis="calc(100vh - 76px)" pt="$5">
          <PokeListNative />
        </YStack>
      </HomeScreen>
    </>
  );
}
