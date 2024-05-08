import {
  H1,
  Paragraph,
  YStack,
} from '@my/ui'

export function DesktopScreen() {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$4" bc="$background">
        <H1 ta="center">Let's do dizzzz.</H1>
        <Paragraph ta="center">
          Let's do dizzzzzzzzzz
        </Paragraph>
      </YStack>
    </YStack>
  )
}