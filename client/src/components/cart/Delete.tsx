import { Button, Text, Icon } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { Modal } from "../common";
import { useCart } from "../../hooks";

interface DeleteProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

const Delete: React.FC<DeleteProps> = ({ productId, isOpen, onClose }) => {
  const cart = useCart();

  const handleDelete = () => {
    cart.remove(productId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      titleIcon={<Icon as={WarningIcon} mr={2} color={"red.300"} />}
      Footer={
        <>
          <Button bg="green.300" onClick={handleDelete} mr={2}>
            Yes
          </Button>
          <Button bg="red.300" onClick={onClose}>
            No
          </Button>
        </>
      }
    >
      <Text>Are you sure you want to delete?</Text>
    </Modal>
  );
};

export default Delete;
