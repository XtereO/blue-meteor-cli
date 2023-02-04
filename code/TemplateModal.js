export const TemplateModalCode = (nameCapitalize) =>
  `import { ModalRoute } from '@core/models';
import { CustomModalPage } from '@ui/atoms';
import { memo } from 'react';

type Props = {
  id: ModalRoute.${nameCapitalize};
};

export const ${nameCapitalize}Modal = memo<Props>(({ id }) => {
  return (
    <CustomModalPage id={id}></CustomModalPage>
  );
});
`;
