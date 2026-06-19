const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="warning-icon">
            !
          </div>

          <h3 className="modal-title">
            Delete Employee
          </h3>
        </div>

        <p className="modal-message">
          This action cannot be undone. The
          employee record will be permanently
          removed from the system.
        </p>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete Employee
          </button>

          
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmationModal;