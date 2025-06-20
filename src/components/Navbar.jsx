import { useState } from "react";

import { ArrowRight, AlignCenter } from "lucide-react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className=" h-20 w-full md:h-26 p-6 md:p-8 flex justify-between items-center bg-white relative z-50">
      {/* desktop links */}
      <div className=" hidden md:flex gap-5 text-base">
        <a href="/about">About</a>
        <a href="/news">News</a>
        <a href="/services">Services</a>
        <a href="/team">Our Team</a>
        <a href="/enquiry">Make Enquiry</a>
      </div>
      <button className=" flex justify-center items-center gap-2 border border-black text-lg px-4 py-2 cursor-pointer">
        Contact Us <ArrowRight />
      </button>

      {/* mobile menu */}
      <div className=" md:hidden">
        <button
          className=" cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <AlignCenter className=" h-10 w-10" />
        </button>

        {/* mobile links */}
        <div
          className={`w-full bg-white h-screen flex flex-col items-center justify-center gap-8 text-lg font-medium absolute top-20 transition-all duration-400 ease-in-out   ${
            openMenu ? " -right-0 " : " -right-[100%] "
          }`}
        >
          <a href="/about">About</a>
          <a href="/news">News</a>
          <a href="/services">Services</a>
          <a href="/team">Our Team</a>
          <a href="/enquiry">Make Enquiry</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
