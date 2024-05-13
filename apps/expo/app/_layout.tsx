import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Provider } from 'app/provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function HomeLayout() {
  const [loaded] = useFonts({
    Roboto: Roboto_400Regular,
    RobotoBold: Roboto_700Bold,
  });
  const scheme = useColorScheme();

  if (!loaded) {
    return null;
  }
  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </Provider>
  );
}
