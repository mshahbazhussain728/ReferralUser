import { useModalManager } from "../../hooks/modal-manager/useModalManager";

export const ModalManager = () => {
  const { renderModal } = useModalManager();

  return renderModal();
};
