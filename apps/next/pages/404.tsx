import Head from 'next/head';
import { useRouter } from 'solito/router';
import { useEffect } from 'react';
import { LoadingScreen } from 'app/features/loading/screen';

/**
 * Redirects to home page
 */
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.push('/');
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <LoadingScreen />
    </>
  );
}
