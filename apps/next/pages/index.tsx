import Head from 'next/head';
import { HomeScreen } from 'app/features/home/screen';
import { PokeListWeb } from 'app/features/pokemon/list/web';
import { YStack } from '@my/ui';

export default function Page() {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <HomeScreen>
        <YStack flexBasis="calc(100vh - 76px)" overflow="scroll">
          <PokeListWeb />
        </YStack>
      </HomeScreen>
    </>
  );
}
