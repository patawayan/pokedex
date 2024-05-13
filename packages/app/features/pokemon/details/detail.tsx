import { Text, XStack, styled } from '@my/ui';
import { capitalize } from 'app/utils/textUtils';

/**
 * For rendering the title of the pokemon details
 */
export const TitleText = styled(Text, {
  fontSize: '$3',
  lineHeight: '$xs',
  fontWeight: '700',
});

/**
 * For rendering the title of the pokemon details
 */
export const ValueText = styled(Text, {
  fontSize: '$3',
  lineHeight: '$xs',
  fontWeight: '400',
  color: '$grayDarker',
  flexWrap: 'wrap',
  wordWrap: 'break-word',
});

/**
 * Formats Label Names
 * @param statName
 */
export const formatLabelName = (statName: string) => {
  // Capitalize all letters of an acronym
  if (statName.length <= 2) {
    return statName.toUpperCase();
  }

  // Covers Special-Defense and Special-Attack
  if (statName.includes('special-')) {
    return `Sp. ${capitalize(statName.split('-')[1]).substring(0, 3)}`;
  }

  return statName
    .split('-')
    .map((name) => capitalize(name))
    .join(' ');
};

/**
 * For rendering the individual pokemon details in list view
 * @param props
 */
export const DetailItem = (props: { label: string; value: string | number }) => {
  const { label, value } = props;

  return (
    <XStack w="100%">
      <TitleText flexBasis="30%" color="$gray">
        {formatLabelName(label)}
      </TitleText>
      <ValueText flexBasis="70%">{value}</ValueText>
    </XStack>
  );
};
