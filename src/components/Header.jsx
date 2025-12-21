/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */


/**
 * Node modules
 */
import { useState } from "react";


/**
 * Components
 */
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";


const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0 dark:from-zinc-900 dark:to-zinc-900/0 transition-colors duration-300">
      <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">

        <h1>
          <a
            href="/"
            className="logo"
          >
            <img
              src="/portofolio-website-bill-van/images/logo.png"
              width={40}
              height={40}
              alt="Bill Van Ricardo Zalukhu"
              className="transition-[filter] duration-300"
            />
          </a>
        </h1>

        <div className="relative md:justify-self-center">
          <button
            className="menu-btn md:hidden"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span className="material-symbols-rounded">
              {navOpen ? 'close' : 'menu'}
            </span>
          </button>

          <Navbar navOpen={navOpen} />
        </div>

        <div className="flex items-center gap-3 md:justify-self-end">
          <ThemeToggle />
          
          <a
            href="#contact"
            className="btn btn-secondary max-md:hidden"
          >
            Contact Me
          </a>
        </div>

      </div>
    </header>
  )
}

export default Header
