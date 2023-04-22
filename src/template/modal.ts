export const TemplateModalCode = (
  nameCapitalize: string,
  isCssOption: boolean
) =>
  `import { ModalRoute } from '@core/models';
import { CustomModalPage } from '@ui/atoms';
import { memo } from 'react';
${
  isCssOption
    ? `import { containerStyle } from './${nameCapitalize}Modal.css';`
    : ''
}

type Props = {
  id: ModalRoute.${nameCapitalize};
};

export const ${nameCapitalize}Modal = memo<Props>(({ id }) => {
  return (
    <CustomModalPage ${
      isCssOption ? 'className={containerStyle}' : ''
    } id={id}></CustomModalPage>
  );
});
`;
