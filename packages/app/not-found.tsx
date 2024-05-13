'use client'

import Head from 'next/head'
import { H1, H2, YStack } from 'tamagui'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);
  return (<>
    <Head>
      <title>Not Found</title>
    </Head>
    <YStack>
      <H1>Page not found</H1>
      <H2>Redirecting...</H2>
    </YStack>
    </>)
}