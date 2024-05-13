import { Toast, useToastState } from '@tamagui/toast';
import { YStack, Text } from 'tamagui';

export const NativeToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) {
    return null;
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
      backgroundColor="$white"
    >
      <YStack py="$1.5" px="$2">
        <Toast.Title>
          <Text fontSize="$3" fontWeight="400">
            {currentToast.title}
          </Text>
        </Toast.Title>
        {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
      </YStack>
    </Toast>
  );
};
