import React from "react";

const WebsiteFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Prem's Task Manager | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default WebsiteFooter;
