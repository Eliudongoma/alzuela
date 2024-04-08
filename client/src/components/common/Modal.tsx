import {
  Modal as AppModal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalProps,
} from "@chakra-ui/react";

interface Props extends ModalProps {
  Footer?: JSX.Element;
  titleIcon?: JSX.Element;
  title?: string;
}

const Modal = ({
  children,
  Footer,
  titleIcon: HeaderIcon,
  title,
  ...otherProps
}: Props) => (
  <AppModal {...otherProps}>
    <ModalOverlay />
    <ModalContent>
      {title && (
        <ModalHeader>
          {HeaderIcon} {title}
        </ModalHeader>
      )}
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      {Footer && <ModalFooter>{Footer}</ModalFooter>}
    </ModalContent>
  </AppModal>
);

export default Modal;
