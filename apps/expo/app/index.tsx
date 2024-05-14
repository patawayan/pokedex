import { Text, getTokens } from '@my/ui';
import { HomeScreen } from 'app/features/home/screen';
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
      <HomeScreen />
    </>
  );
}
