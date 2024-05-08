import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head'
import { H1, Paragraph, YStack, isWeb } from 'tamagui'
import { isMobile } from 'react-device-detect'
import { ReactNode, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { DesktopScreen } from 'app/features/desktop/screen'

export default function Page() {

  const router = useRouter();

  useEffect(() => {
    if (isWeb && isMobile) {
      router.push('home')
    }
  }, [])

  return (

    <>
      <Head>
        <title>Desktop</title>
      </Head>
      <DesktopScreen />
    </>
  )
}