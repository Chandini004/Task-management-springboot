import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserList } from '../../ReduxToolkit/AuthSlice';
import store from '../../ReduxToolkit/Store';
import { assignedTaskToUser } from '../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:'none',
  boxShadow: 24,
  p: 2,
};
const tasks=[1,1,1,1]

export default function UserList({open,handleClose}) {
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store);
  const location= useLocation();
  const queryParams=new  URLSearchParams(location.search);
  const taskId=queryParams.get("taskId");
  useEffect((item)=>{
    dispatch(getUserList(localStorage.getItem("jwt")))
  },[])
  
  const handleAssignedTask=(user)=>{
    dispatch(assignedTaskToUser({taskId:taskId,userId:user.id}))
  }

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {
          auth.users.map((item,index)=>
          <>
          <div className='flex items-center justify-between w-full'>
              <div>
                <ListItem>
                  <ListItemAvatar>
                    
                    <Avatar src='https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100254.jpg?t=st=1709475388~exp=1709478988~hmac=6b6cc113d8bcb8369beed5d7fd26355c79aa7c38e293bd3d1174572721cd65b2&w=740' />

                    
                  </ListItemAvatar>
                  <ListItemText
                  secondary={`@${item.fullName.split(" ").join("_").toLowerCase()}`}
                  primary={item.fullName} />
                </ListItem>
              </div>
              <div>
                <Button onClick={()=>handleAssignedTask(item)} className='customButton'>select</Button>
              </div>
              
          </div>
          { index!==tasks.length-1 && <Divider variant='inset'/>}
          </>)
        }
          
        </Box>
      </Modal>
    </div>
  );
}