export const TemplateLayoutCode = (layoutName) =>
  `import { PanelRoute, ViewRoute } from '@core/models';
import { CustomLayout } from '@ui/atoms';
import { memo } from 'react';
            
type Props = {
  id: ViewRoute.${layoutName};
};
            
export const ${layoutName}Layout = memo<Props>(({ id }) => {
  return (
    <CustomLayout id={id}></CustomLayout>
  );
});
`;
