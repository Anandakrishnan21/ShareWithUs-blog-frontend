import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="font-mono">
      <div className="max-w-6xl m-auto md:flex-row gap-5 bg-teal-100 p-3">
        <div className="w-full flex items-center justify-center gap-2">
          <p className="font-bold">© {currentYear} Share With Us All Right reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
