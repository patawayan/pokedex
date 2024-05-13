import { H1, Paragraph, YStack } from '@my/ui';
import { PokedexSvg } from 'app/assets/pokedexSvg';

/**
 * Screen to display when viewing app on desktop
 */
export const DesktopScreen = () => {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$4" ai="center">
        <PokedexSvg />
        <H1 ta="center" color="$title">
          No Access
        </H1>
        <Paragraph ta="center">Use your phone device to access this page.</Paragraph>
      </YStack>
    </YStack>
  );
};
