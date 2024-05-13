import { HomeScreen } from 'app/features/home/screen';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'My home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <HomeScreen />
    </>
  );
}
