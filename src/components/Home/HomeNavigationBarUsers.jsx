import { Menu, Moon, ShoppingCartIcon, Sun, UserCircle, X, XIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ModalMenu from "../ModalMenu";
import { useState } from "react";

function HomeNavigationBarUsers({ handleClick, modalOpen, User, setModalOpen, InputSearch, notif }) {
    const path = window.location.pathname
    // console.log(User)
    // console.log(path);
    const [open, setOpen] = useState(false)
    const onClick = () => {
        setOpen(!open)
    }
    const [isDark, setIsDark] = useState(false)
    const DarkMode = () => {
        setIsDark(true)
        document.documentElement.classList.toggle("dark")
    }
    const LightMode = () => {
        setIsDark(false)
        document.documentElement.classList.remove("dark")
    }
    const handleClickX = () => {
        setModalOpen(false)
    }
    return (
        <>
            <header
                className="w-full lg:h-[6vw] h-[12vw] md:h-[16vw]  bg-bgFah top-0 fixed flex justify-between items-center px-[4vw] py-[2vw] shadow shadow-shadow z-40"
            >
                <img
                    src="../src/assets/unnamed-removebg-preview.png" alt=""
                    className="lg:w-[5vw] w-[9vw] h-[9vw] lg:h-[5vw] md:w-[12vw] md:h-[12vw] bg-white rounded-full cursor-pointer border-border border-[.1vw]"
                />
                <button className="lg:hidden ml-[2vw] " onClick={onClick}>
                    {open ? <XIcon size={25} className="text-navbar md:!w-[5vw] md:!h-[5vw]" /> : <Menu size={25} className="text-navbar md:!w-[5vw] md:!h-[5vw]" />}
                </button>
                <div className="flex justify-between  lg:gap-[3vw] w-[90%] lg:w-[50vw] items-center">
                    <div className="lg:mr-[4vw]">
                        <nav className="" >
                            {/* DEKTOP  */}
                            <ul className={`lg:flex gap-3 hidden lg:w-[120%] lg:gap-8 relative ${InputSearch ? "z-0" : "z-50"}`}>
                                <NavLink
                                    className={"text-navbar text-[3vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"} id={path === "/" ? "active" : ""}
                                    to={"/"}
                                >
                                    Accueil
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[3vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                    id={path === "/Boutique" ? "active" : ""}
                                    to={"/Boutique"}
                                >
                                    Boutique
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[3vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Paiement
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[3vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    A propos
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[3vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Contact
                                </NavLink>
                            </ul>
                            {/* DESKTOP FIN */}
                            {/* MOBILE */}
                            {open && (
                                <ul className={`flex flex-col bg-bgFah p-2  rounded-[1vw] gap-3 lg:hidden lg:gap-8 absolute left-0 top-[13vw] ${InputSearch ? "z-0" : "z-50"}`}>
                                    <NavLink
                                        className={"text-navbar text-[4vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"} id={path === "/" ? "active" : ""}
                                        to={"/"}
                                    >
                                        Accueil
                                    </NavLink>
                                    <NavLink
                                        className={"text-navbar text-[4vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                        id={path === "/Boutique" ? "active" : ""}
                                        to={"/Boutique"}
                                    >
                                        Boutique
                                    </NavLink>
                                    <NavLink
                                        className={"text-navbar text-[4vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                    >
                                        Paiement
                                    </NavLink>
                                    <NavLink
                                        className={"text-navbar text-[4vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                    >
                                        A propos
                                    </NavLink>
                                    <NavLink
                                        className={"text-navbar text-[4vw] lg:text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                    >
                                        Contact
                                    </NavLink>
                                </ul>
                            )}
                            {/* MOBILE FIN */}
                        </nav>
                    </div>
                    {/* MOBILE*/}
                    <div className="flex gap-[2vw] md:gap-0 md:!w-[26vw] px-[3vw] lg:!w-[30vw]   w-[29vw] justify-between lg:gap-[1.2vw] relative">
                        <Link to={"/Panier"}>
                            {notif ? (notif === 0 ? <ShoppingCartIcon className="text-navbar md:!w-[5vw] md:!h-[5vw] lg:!h-[2.5vw] lg:!w-[1.5vw] cursor-pointer" id={path === "/Panier" ? "active" : ""} size={25} /> : <div className="indicator">
                                <span className="indicator-item badge badge-xs badge-error">{notif}</span>
                                <ShoppingCartIcon className="text-navbar md:!w-[5vw] md:!h-[5vw] lg:h-[2.5vw] lg:w-[1.5vw] cursor-pointer" id={path === "/Panier" ? "active" : ""} size={25} />
                            </div>) : (<ShoppingCartIcon className="text-navbar md:!w-[5vw] md:!h-[5vw] lg:!h-[2.5vw] lg:!w-[1.5vw]  cursor-pointer" id={path === "/Panier" ? "active" : ""} size={25} />)}
                        </Link>
                        {isDark ? <Sun className="lg:!h-[2.5vw] md:!w-[5vw] md:!h-[5vw] lg:!w-[1.5vw]  text-navbar cursor-pointer" onClick={LightMode} size={25} /> : <Moon className="lg:!h-[2.5vw] lg:!w-[1.5vw]  text-navbar md:!w-[5vw] md:!h-[5vw] cursor-pointer" onClick={DarkMode} size={25} />}
                        {modalOpen ? <X className="text-navbar md:!w-[5vw] md:!h-[5vw] lg:h-[2.5vw] lg:w-[1.5vw]  cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} size={25} /> : <UserCircle className="text-navbar md:!w-[5vw] md:!h-[5vw] lg:!h-[2.5vw] lg:!w-[1.5vw]  cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} size={25} />}
                        {modalOpen && <ModalMenu User={User} />}
                    </div>
                    {/* MOBILE FIN */}
                </div>
            </header>
        </>
    )
}

export default HomeNavigationBarUsers;