export const TemplateLayoutCode = (layoutName, isCssOption) =>
  `import { PanelRoute, ViewRoute } from '@core/models';
import { CustomLayout } from '@ui/atoms';
import { memo } from 'react';
${
  isCssOption
    ? `import { containerStyle } from "./${layoutName}Layout.css";`
    : ''
}
            
type Props = {
  id: ViewRoute.${layoutName};
};
            
export const ${layoutName}Layout = memo<Props>(({ id }) => {
  return (
    <CustomLayout ${
      isCssOption ? 'className={containerStyle} ' : ''
    }id={id}></CustomLayout>
  );
});
`;
