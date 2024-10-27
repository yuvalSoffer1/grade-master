import { useDisplayContext } from "../../../context/DisplayContext";

interface IDeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  itemName?: string;
}

const DeleteModal = ({ onConfirm, onClose, itemName }: IDeleteModalProps) => {
  const { displayState } = useDisplayContext();

  return displayState.showModal ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete this {itemName}? This action cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => {
              onConfirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteModal;
