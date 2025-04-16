import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 text-sm mt-10">
      <p>
        &copy; {new Date().getFullYear()} CRUD App | Design & Development by{" "}
        <a
          href="https://salmandeshmukh.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Salman Deshmukh
        </a>
      </p>
    </footer>
  );
};

export default Footer;
