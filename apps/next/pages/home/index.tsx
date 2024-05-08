import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head'
import { H1, Paragraph, YStack, isWeb } from 'tamagui'
import { isMobile } from 'react-device-detect'
import { ReactNode, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'

export default function Page() {
   const router = useRouter();

  useEffect(() => {
    if (isWeb && !isMobile) {
      router.push('/')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen/>
    </>
  )
}