export const ModalLayoutCode = (modalCapitalize, isModal = true) =>
  `import { useRouter } from '@core/hooks';
import { ModalRoute } from '@core/models';
import { back } from '@core/modules/router';
import { ModalRoot } from '@vkontakte/vkui';
import { memo, useCallback } from 'react';
import { ${modalCapitalize}${isModal ? "Modal" : "Card"} } from './${isModal ? "modals" : "cards"}';

export const ModalLayout = memo(() => {
  const { activeModal } = useRouter();
  const handleClose = useCallback(() => {
    back();
  }, []);

  return (
    <ModalRoot onClose={handleClose} activeModal={activeModal}>
      <${modalCapitalize}${isModal ? 'Modal' : 'Card'} id={ModalRoute.${modalCapitalize}} />
    </ModalRoot>
  );
});
`;
