export const TemplatePopoutLayoutCode = (nameCapitalized: string) =>
  `import { useRouter } from '@blumjs/router';
import { PopoutRoute } from '@core/models';
import { $ui } from '@core/modules/ui';
import { useStore } from 'effector-react';
import { memo, useEffect, useState } from 'react';
import { popoutLayout } from './PopoutLayout.css';
import { ${nameCapitalized}Popout } from './popouts';

export const PopoutLayout = memo(() => {
  const { dimensions } = useStore($ui);
  const { activePopout } = useRouter();
  const [popout, setPopout] = useState<null | React.ReactNode>(null);
  useEffect(() => {
    if (activePopout) {
      setPopout(popouts[activePopout as PopoutRoute]);
    } else {
      setPopout(null);
    }
  }, [activePopout]);
  if (!popout) {
    return null;
  }

  return (
    <div
      className={popoutLayout}
      style={{
        ...dimensions,
      }}
    >
      {popout}
    </div>
  );
});

const popouts = {
  [PopoutRoute.${nameCapitalized}]: <${nameCapitalized}Popout />,
};
`;

export const TemplatePopoutLayoutCssCode = () =>
  `import { style } from '@vanilla-extract/css';

export const popoutLayout = style({
  position: 'fixed',
  width: '100%',
  height: '100vh',
  top: 0,
  left: 0,
  overflow: 'hidden',
});
`;
