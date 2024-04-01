import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import "./Sidebar.css";
import CreateNewTaskForm from "../Task/CreateTask";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { logout } from "../../ReduxToolkit/AuthSlice";

const menu = [
  { name: "HOME", value: "HOME", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "CREATE NEW TASK", value: "", role: ["ROLE_ADMIN"] },
  { name: "NOTIFICATION", value: "NOTIFICATION", role: ["ROLE_CUSTOMER"] },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store)
  const [activeMenu, setActiveMenu] = useState("HOME");
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleCloseCreateTaskForm = () => {
    setOpenCreateTaskForm(false);
  };
  const handleOpenCreateTaskMode = () => {
    setOpenCreateTaskForm(true);
  };
  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);
    if (item.name === "CREATE NEW TASK") {
      handleOpenCreateTaskMode();
    } else if (item.name === "HOME") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatedPath = queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname;
      navigate(updatedPath);
    } else {
      updatedParams.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    }
    setActiveMenu(item.name);
  };
  const handleLogout = () => {
    dispatch(logout());
    console.log("handle logout");
  };
  
  return (
    <>
      <div className="card min-h-[80vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">
          <div className="flex justify-center ">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-2 border-[#c24dd0]"
              src="https://img.freepik.com/free-photo/3d-grunge-room-interior-with-spotlight-smoky-atmosphere-background_1048-11333.jpg?t=st=1709476160~exp=1709476760~hmac=9d2b4b74071eac61ebb5efc6e4ceb21bf244c1ce8e512bb56cd6de229b35b75a"
            />
          </div>
          {auth.user?.role==="ROLE_ADMIN"?menu
            .filter((item) => item.role.includes("ROLE_ADMIN"))
            .map((item) => (
              <p
                onClick={() => handleMenuChange(item)}
                className={`py-3 px-5 rounded-full text-center cursor-pointer ${
                  activeMenu === item.name ? "activeMenuItem" : "menuItem"
                } `}
              >
                {item.name}
              </p>
            )):
            menu
              .filter((item) => item.role.includes("ROLE_CUSTOMER"))
              .map((item) => (
                <p
                  onClick={() => handleMenuChange(item)}
                  className={`py-3 px-5 rounded-full text-center cursor-pointer ${
                    activeMenu === item.name ? "activeMenuItem" : "menuItem"
                  } `}
                >
                  {item.name}
                </p>
              ))
            }
          
          <Button
            onClick={handleLogout}
            fullWidth
            sx={{ padding: ".7rem", borderRadius: "2rem", color: "white" }}
            className="logoutButton"
          >
            logout
          </Button>
        </div>
      </div>
      <CreateNewTaskForm
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};
