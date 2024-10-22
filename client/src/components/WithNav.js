import React from "react";
import Navbar from "./navbar";
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
    <div className="flex w-screen">
      <Navbar />
      <Outlet />
      </div>
    </>
  );
}