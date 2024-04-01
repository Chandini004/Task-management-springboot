import React, { useEffect } from 'react'
import { TaskCard } from '../Task/TaskCard/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, fetchUsersTasks } from '../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';

export const TaskList = () => {
  const dispatch=useDispatch();
  const {task,auth}=useSelector(store=>store)
  const location=useLocation();
  const queryParams=new  URLSearchParams(location.search);
  const filterValue=queryParams.get("filter");

  useEffect(()=>{
    if(auth.user?.role==="ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue})); 
    }
    else{
   dispatch(fetchUsersTasks({status:filterValue})); 

    }
  },[filterValue]);
  return (
    <div className='space-y-5 w-[64vw]'>
        {
        auth.user?.role==="ROLE_ADMIN"?
            task.tasks.map((item)=>(
            <TaskCard item={item} />
            )):task.usersTasks.map((item)=>(
              <TaskCard item={item} />
              ))
        }
    </div>
  )
}
