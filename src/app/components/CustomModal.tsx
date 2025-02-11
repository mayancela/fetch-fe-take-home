import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    ariaLabel: string; // required
    ariaDescription: string;
}

// to-do: add styling prop to modal
const CustomModal: React.FC<ModalProps> = ({open, onClose, children, ariaLabel, ariaDescription}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabel}
            aria-describedby={ariaDescription}
        > 
            <Box style={{backgroundColor: 'white'}}>  {/* to-do: remove custom styling*/}
                {children}
            </Box>
        </Modal>

    );
};

export default CustomModal;