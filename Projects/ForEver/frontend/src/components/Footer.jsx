import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mt-40 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="grid gap-10 sm:grid-cols-[3fr_1fr_1fr] text-sm text-gray-700">
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-36" alt="logo" />
          <p className="max-w-md text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
            iure provident sequi unde! Aperiam, ullam.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="uppercase text-lg font-semibold mb-4">Company</p>
          <ul className="space-y-2 text-gray-600 hover:[&>li]:text-black">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="uppercase text-lg font-semibold mb-4">Get in touch</p>
          <ul className="space-y-2 text-gray-600">
            <li>+91 9693610856</li>
            <li>forever@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t pt-5 text-center text-xs text-gray-500">
        &copy; 2025 forever.com – All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
