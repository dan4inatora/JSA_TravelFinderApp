import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';

const AdminProfile = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [refetch, setRefetch] = useState(true);
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First name', width: 130 },
      { field: 'lastName', headerName: 'Last name', width: 130 },
      {
        field: 'role',
        headerName: 'Role',
        type: 'number',
        width: 130,
      },
      {
        field: 'username',
        headerName: 'Username',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200
      },
      {
        field: "edit",
        headerName: "Edit",
        disableClickEventBubbling: true,
        renderCell: (params) => {
            const api = params.api;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            const thisRow = {};
    
            fields.forEach((f) => {
              thisRow[f] = params.getValue(f);
            });
    
          return <EditUserModal setRefetch={setRefetch} rowData={thisRow}/>;
        }
      },
      {
        field: "delete",
        headerName: "Delete",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const onClick = () => {
            const api = params.api;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            const thisRow = {};
    
            fields.forEach((f) => {
              thisRow[f] = params.getValue(f);
            });
    
            deleteUser(thisRow);
          };
    
          return <Button size="small" variant="outlined" onClick={onClick}>Delete</Button>;
        }
      }
    ];

    useEffect(() => {
      if(refetch) {
        axios({
          method: 'GET',
          headers: { 'Content-Type': 'application/json'},
          url: 'http://localhost:3001/getAllUsers',
          withCredentials: true
        }).then((response) => {
          console.log(response);
          setAllUsers(response.data);
        }).catch((error) => {
          console.log(error);
        });
      } 

      setRefetch(false);
    }, [refetch])

    function deleteUser(rowData) {
      axios({
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        url: 'http://localhost:3001/deleteUser',
        withCredentials: true,
        data: rowData
      }).then((response) => {
        setRefetch(true);
      }).catch((error) => {
        console.log(error);
      });
  }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <AddUserModal setRefetch={setRefetch}/>
            <DataGrid rows={allUsers} columns={columns} pageSize={10} checkboxSelection />
        </div>
    )
}

export default AdminProfile;