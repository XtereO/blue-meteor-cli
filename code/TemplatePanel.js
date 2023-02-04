export const TemplatePanelCode = (panelName) => 
`import { PanelRoute } from '@core/models';
import { CustomPanel } from '@ui/atoms';
import { memo } from 'react';

type Props = {
  id: PanelRoute.${panelName};
};

export const ${panelName}Panel = memo<Props>(({ id }) => {
  return (
    <CustomPanel id={id}></CustomPanel>
  );
});
`