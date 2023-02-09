export const TemplatePanelCode = (panelName, isCssOption) =>
  `import { PanelRoute } from '@core/models';
import { CustomPanel } from '@ui/atoms';
import { memo } from 'react';
${
  isCssOption ? `import { containerStyle } from './${panelName}Panel.css';` : ''
}

type Props = {
  id: PanelRoute.${panelName};
};

export const ${panelName}Panel = memo<Props>(({ id }) => {
  return (
    <CustomPanel ${
      isCssOption ? `className={containerStyle}` : ''
    } id={id}></CustomPanel>
  );
});
`;
