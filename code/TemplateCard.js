export const TemplateCardCode = (nameCapitalize) =>
  `import { ModalRoute } from '@core/models';
import { CustomModalCard } from '@ui/atoms';
import { memo } from 'react';

type Props = {
  id: ModalRoute.${nameCapitalize};
};

export const ${nameCapitalize}Card = memo<Props>(({ id }) => {
  return (
    <CustomModalCard
      icon={<></>}
      header={<span></span>}
      subheader={<span></span>}
      actions={<></>}
      id={id}
    />
  );
});
`;
