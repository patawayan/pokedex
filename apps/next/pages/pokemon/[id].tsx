import { PokemonScreen } from 'app/features/pokemon/screen';
import { PokemonContext } from 'app/provider/Pokemon';
import Head from 'next/head';
import { useContext } from 'react';
import { capitalize } from 'app/utils/textUtils';

export default function Page() {
  const { currentPokemon } = useContext(PokemonContext);

  return (
    <>
      <Head>
        <title>{currentPokemon ? capitalize(currentPokemon.name) : 'Pokemon'}</title>
      </Head>
      <PokemonScreen />
    </>
  );
}
