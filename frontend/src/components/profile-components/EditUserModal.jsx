import React, {useState, useEffect} from "react";
import {IconButton, Dialog, Button, Backdrop, Fade, TextField, MuiThemeProvider, FormLabel, Select} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';

const EditUserModal = (props) => {
    const [open, setOpen] = useState(false);
    const [rowData, setState] = useState({
        firstName: props.rowData.firstName,
        lastName: props.rowData.lastName,
        role: props.rowData.role,
        username: props.rowData.username,
        id: props.rowData.id
    });

    const [response, setResponseState] = useState("");

    const addNewChannel = () => {
        setResponseState('');
        
        setOpen(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            url: 'http://localhost:3001/api/editUser',
            withCredentials: true,
            data: rowData
          }).then((response) => {
            console.log("EDIT RESPONSE", response);
          }).catch((error) => {
            console.log(error);
          });
    }

    const handleChange = (event) => {
        event.preventDefault();

        const target = event.target;
        const name = target.name;
        setState({...rowData, [name]: target.value});
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Button size='small' onClick={addNewChannel}>
                <EditIcon/>
                Edit
            </Button>
            {/* <MuiThemeProvider theme={channelsTableTheme}> */}
                  <Dialog closeAfterTransition={true} onClose={handleClose} open={open} aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description" BackdropComponent={Backdrop}
                      BackdropProps={{ timeout: 800 }}>
                      <Fade in={open}>
                          <div>
                              <IconButton className='close-button' aria-label='google' onClick={handleClose}>
                                  {/* <FontAwesomeIcon className='icon-button' icon={faTimes}/> */}
                              </IconButton>
                              
                              <div className='add-user-container'>
                                  <h1 className='title'>Edit User</h1>
                                    { response ? 
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        {response}
                                    </Alert> : null}
                                  <form className='add-user-form' onSubmit={handleSubmit}>
                                        <FormLabel className='select-label' htmlFor="channel">First Name:</FormLabel>
                                        <TextField type='text' onChange={handleChange} hiddenLabel={true} name='firstName'
                                          variant='standard' value={rowData.firstName} required/>

                                        <FormLabel className='select-label' htmlFor="channel">Last Name:</FormLabel>
                                        <TextField type='text' onChange={handleChange} hiddenLabel={true} name='lastName'
                                          variant='standard' value={rowData.lastName} required/>
                                          <FormLabel className='select-label' htmlFor="channel">Role:</FormLabel>
                                        <TextField type='text' onChange={handleChange} hiddenLabel={true} name='role'
                                          variant='standard' value={rowData.role} required/>
                                          <FormLabel className='select-label' htmlFor="channel">Username:</FormLabel>
                                        <TextField type='text' onChange={handleChange} hiddenLabel={true} name='username'
                                          variant='standard' value={rowData.username} required/>

                                        <div className='button-group'>
                                            <Button className='cancel-button' onClick={handleClose} variant='contained'>Cancel</Button>
                                            <Button type='submit' className='submit-button' variant='contained'>Save</Button>
                                        </div>
                                  </form>
                              </div>
                          </div>
                      </Fade>
                  </Dialog>
              {/* </MuiThemeProvider> */}
        </React.Fragment>
      );
}

export default EditUserModal; 