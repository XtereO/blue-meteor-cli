export const TemplateCardCode = (
  nameCapitalize: string,
  isCssOption: boolean
) =>
  `import { ModalRoute } from '@core/models';
import { CustomButton, CustomModalCard } from '@ui/atoms';
import { memo, useCallback } from 'react';
${
  isCssOption
    ? `import { containerStyle } from './${nameCapitalize}Card.css';`
    : ''
}

type Props = {
  id: ModalRoute.${nameCapitalize};
};

export const ${nameCapitalize}Card = memo<Props>(({ id }) => {
  const handleClick = useCallback(() => {}, []);

  return (
    <CustomModalCard
    ${isCssOption ? 'className={containerStyle}' : ''}
      icon={<></>}
      header={<span></span>}
      subheader={<span></span>}
      actions={<CustomButton onClick={handleClick}>Action</CustomButton>}
      id={id}
    />
  );
});
`;
