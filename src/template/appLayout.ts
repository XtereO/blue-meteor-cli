export const AppLayoutCode = (componentName: string, name: string) =>
  `import { useRouter } from '@blumjs/router';
import { ViewRoute } from '@core/models';
import { ${componentName} } from '@ui/layouts/${name}';
import { ModalLayout } from '@ui/layouts/modal';
import { PopoutLayout } from '@ui/layouts/popout';
import { AppRoot, Root, SplitCol, SplitLayout } from '@vkontakte/vkui';
import { memo } from 'react';
                    
export const AppLayout = memo(() => {
  const { activeView, activePopout, isRouteInit } = useRouter();
  if (!isRouteInit) {
    return <></>;
  }
                    
  return (
    <AppRoot>
      <SplitLayout modal={<ModalLayout />} popout={activePopout ? <PopoutLayout /> : null}>
        <SplitCol animate>
          <Root activeView={activeView}>
            <${componentName} id={ViewRoute.${componentName.replace(
    'Layout',
    ''
  )}} />
          </Root>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
});
`;
