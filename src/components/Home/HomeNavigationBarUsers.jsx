import { Moon, ShoppingCartIcon, Sun, UserCircle, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ModalMenu from "../ModalMenu";
import { useState } from "react";

function HomeNavigationBarUsers({ handleClick, modalOpen, User, setModalOpen, InputSearch, notif }) {
    const path = window.location.pathname
    // console.log(User)
    // console.log(path);
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
                className="w-full h-[6vw] bg-bgFah fixed flex justify-between items-center px-[4vw] py-[2vw] shadow shadow-shadow z-40"
            >
                <img
                    src="../src/assets/unnamed-removebg-preview.png" alt=""
                    className="w-[5vw] h-[5vw] bg-white rounded-full cursor-pointer border-border border-[.1vw]"
                />
                <div className="flex justify-between gap-[3vw] w-[50vw] items-center">
                    <div>
                        <nav >
                            <ul className={`flex gap-8 relative ${InputSearch ? "z-0" : "z-50"}`}>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"} id={path === "/" ? "active" : ""}
                                    to={"/"}
                                >
                                    Accueil
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                    id={path === "/Boutique" ? "active" : ""}
                                    to={"/Boutique"}
                                >
                                    Boutique
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Paiement
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    A propos
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Contact
                                </NavLink>

                            </ul>
                        </nav>
                    </div>
                    <div className="flex gap-[1.2vw] relative">
                        <Link to={"/Panier"}>
                            {notif ? (notif === 0 ? <ShoppingCartIcon className="text-navbar Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} /> : <div className="indicator">
                                <span className="indicator-item badge badge-xs badge-error">{notif}</span>
                                <ShoppingCartIcon className="text-navbar Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} />
                            </div>) : (<ShoppingCartIcon className="text-navbar Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} />)}
                        </Link>
                        {modalOpen ? <X className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <UserCircle className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} />}
                        {modalOpen && <ModalMenu User={User} />}
                        {isDark ? <Sun className="Usercircle text-navbar cursor-pointer" onClick={LightMode} /> : <Moon className="Usercircle text-navbar cursor-pointer" onClick={DarkMode} />}
                    </div>
                </div>
            </header>
        </>
    )
}

export default HomeNavigationBarUsers;