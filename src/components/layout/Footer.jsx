import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyan-500 text-white py-6 w-full">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center px-4">
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-200"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/enesunlu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-200"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-white">
        <p>© {currentYear} Taurex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
