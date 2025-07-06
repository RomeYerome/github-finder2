import { NavLink, Link } from 'react-router'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

type NavbarProps = {
    title?: string
}

const Navbar: React.FC<NavbarProps> = ({ title = 'GitHub Finder' }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const menuClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="bg-gray-800 text-white py-4 shadow-lg">
            {/* Nav Container */}
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className='relative z-40'>
                    <FaGithub className="inline mr-2 text-3xl" />
                    <Link to="/" className="text-lg font-bold align-middle">
                        {title}
                    </Link>
                </div>
                {/* Menu */}
                <div className="hidden md:flex md:space-x-8">
                    {/* Home */}
                    <div className="group cursor-pointer">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-300'
                                    : 'hover:text-gray-300'
                            }
                        >
                            Home
                        </NavLink>
                        <div className="invisible group-hover:visible mx-2 border-b-2 border-blue-300"></div>
                    </div>

                    {/* About */}
                    <div className="group cursor-pointer">
                        <NavLink
                            to="/about"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-300'
                                    : 'hover:text-gray-300'
                            }
                        >
                            About
                        </NavLink>
                        <div className="invisible group-hover:visible mx-2 border-b-2 border-blue-300"></div>
                    </div>
                </div>

                {/* Hamburger Menu */}
                <div className="md:hidden">
                    <button
                        id="menu-btn"
                        type="button"
                        className="z-40 hamburger md:hidden focus:outline-none"
                        onClick={menuClick}
                    >
                        <span
                            className={`hamburger-top ${isOpen ? 'open' : ''}`}
                        ></span>
                        <span
                            className={`hamburger-middle ${
                                isOpen ? 'open' : ''
                            }`}
                        ></span>
                        <span
                            className={`hamburger-bottom ${
                                isOpen ? 'open' : ''
                            }`}
                        ></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    id="menu"
                    className={`absolute inset-y-0 left-0 flex-col self-end w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black/85 z-30 transition duration-500 ${
                        isOpen ? '' : 'hidden'
                    }`}
                    onClick={menuClick}
                >
                    {/* Home */}
                    <div className="group cursor-pointer">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-300'
                                    : 'hover:text-gray-300'
                            }
                        >
                            Home
                        </NavLink>
                        <div className="invisible group-hover:visible mx-2 border-b-2 border-blue-300"></div>
                    </div>

                    {/* About */}
                    <div className="group cursor-pointer">
                        <NavLink
                            to="/about"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-300'
                                    : 'hover:text-gray-300'
                            }
                        >
                            About
                        </NavLink>
                        <div className="invisible group-hover:visible mx-2 border-b-2 border-blue-300"></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
