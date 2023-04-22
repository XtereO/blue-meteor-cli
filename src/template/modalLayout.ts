export const TemplateModalLayoutCode = (
  modalCapitalized: string,
  isModal = true
) =>
  `import { useRouter, back } from '@blumjs/router';
import { ModalRoute } from '@core/models';
import { ModalRoot } from '@vkontakte/vkui';
import { memo, useCallback } from 'react';
import { ${modalCapitalized}${isModal ? 'Modal' : 'Card'} } from './${
    isModal ? 'modals' : 'cards'
  }';

export const ModalLayout = memo(() => {
  const { activeModal } = useRouter();
  const handleClose = useCallback(() => {
    back();
  }, []);

  return (
    <ModalRoot onClose={handleClose} activeModal={activeModal}>
      <${modalCapitalized}${
    isModal ? 'Modal' : 'Card'
  } id={ModalRoute.${modalCapitalized}} />
    </ModalRoot>
  );
});
`;
