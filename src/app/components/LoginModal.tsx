'use client'

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CustomModal from './CustomModal'; // barrel imports?
import { Container, TextField, Typography } from '@mui/material';
import userAuth from '../utils/userAuth';

const LoginModal = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleSubmit = (e: any) => { // to-do: add type
        e.preventDefault();

        userAuth(name, email);
    };

    console.log(name, email);

    return (
        <Container>
            <Button size="large" variant="contained" onClick={handleOpen}>Log in</Button>
            <CustomModal open={openModal} onClose={handleClose} ariaLabel="Login" ariaDescription="Login modal">
                <Typography id="modal-title" variant="h6" component="h2"> Login </Typography>
                <form onSubmit={handleSubmit}> 
                    <TextField label="Name" variant="standard" defaultValue="Name" onChange={(e) => setName(e.target.value)} />
                    <TextField label="Email" variant="standard" defaultValue="Email" onChange={(e) => setEmail(e.target.value)} />
                    <Button type="submit"> Paw-ceed! // Let's go!</Button>
                </form>
            </CustomModal>
        </Container>

    );
};

export default LoginModal;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };