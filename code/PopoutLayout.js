export const PopoutLayoutCode = (nameCapitalize) =>
  `import { useRouter } from '@core/hooks';
import { PopoutRoute } from '@core/models';
import { $ui } from '@core/modules/ui';
import { useStore } from 'effector-react';
import { memo, useEffect, useState } from 'react';
import { popoutLayout } from './PopoutLayout.css';
import { ${nameCapitalize}Popout } from './popouts';

export const PopoutLayout = memo(() => {
  const { dimensions } = useStore($ui);
  const { activePopout } = useRouter();
  const [popout, setPopout] = useState<null | React.ReactNode>(null);
  useEffect(() => {
    if (activePopout) {
      setPopout(popouts[activePopout]);
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
  [PopoutRoute.${nameCapitalize}]: <${nameCapitalize}Popout />,
};
`;

export const PopoutLayoutCssCode = () =>
  `import { style } from '@vanilla-extract/css';

export const popoutLayout = style({
  zIndex: 1000,
  position: 'absolute',
  top: 0,
  left: 0,
  overflow: 'hidden',
});
`;
