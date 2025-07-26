import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Button from './Button';


export default function DeleteModal ({ isModalOpen, onClose, onConfirm, productName, loading }) {
  return (
    <Modal open={isModalOpen} onClose={onClose} center showCloseIcon={false} classNames={{
        modal: 'rounded-[8px] w-[400px] p-6' // your custom classes
      }}>
      <div>
        <img src='images/delete_warning.svg' alt='Delete Icon'/>
        <h2 className="text-[#101828] text-delete-modal-header pb-[8px] pt-[18px]">Delete Product</h2>
        <p className="text-[#667085] text-delete-modal-text pb-8">
          Are you sure you want to delete the product '{productName}'?
        </p>
        <div className="flex space-x-3">
          <Button
            buttonText='Cancel'
            width='170px'
            height='44px'
            onClick={onClose}
            fill={false}
          />
          <Button
            buttonText='Delete'
            width='170px'
            height='44px'
            onClick={onConfirm}
            fill={true}
            isLoading={loading} 
          />
        </div>
      </div>
    </Modal>
  );
};
