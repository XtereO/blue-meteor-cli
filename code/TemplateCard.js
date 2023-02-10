export const TemplateCardCode = (nameCapitalize, isCssOption) =>
  `import { ModalRoute } from '@core/models';
import { CustomModalCard } from '@ui/atoms';
import { memo } from 'react';
${
  isCssOption
    ? `import { containerStyle } from './${nameCapitalize}Card.css';`
    : ''
}

type Props = {
  id: ModalRoute.${nameCapitalize};
};

export const ${nameCapitalize}Card = memo<Props>(({ id }) => {
  return (
    <CustomModalCard
    ${isCssOption ? 'className={containerStyle}' : ''}
      icon={<></>}
      header={<span></span>}
      subheader={<span></span>}
      actions={<></>}
      id={id}
    />
  );
});
`;
