import { MenuIcon, Moon, SearchIcon, ShoppingCartIcon, Sun, UserCircle, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ModalMenu from "./ModalMenu";
import { useState } from "react";

function NavigationBar({ handleClick, modalOpen, handleSearchClick, InputSearch, setInputSearch, InputFocusRef, HandleSearch, setSearch, Search, fetchAccessoriesOneData, fetchDrumData, User, setModalOpen, status,notif }) {
    const [isDark, setIsDark] = useState(false)
    const DarkMode = () => {
        setIsDark(true)
        document.documentElement.classList.toggle("dark")
    }
    const LightMode = () => {
        setIsDark(false)
        document.documentElement.classList.remove("dark")
    }
    const path = window.location.pathname
    const handleClickX = () => {
        setModalOpen(false)
    }
    // console.log(path);
    return (
        <>
            <header
                className="w-full h-[6vw] bg-bgFah fixed flex justify-between items-center px-[4vw] py-[2vw] shadow shadow-shadow z-40"
            >
                <img
                    src="../src/assets/unnamed-removebg-preview.png" alt=""
                    className="w-[5vw] h-[5vw] bg-white rounded-full cursor-pointer"
                />
                <div className="flex justify-between gap-[3vw] w-[50vw] items-center">
                    <div>
                        <nav >
                            <ul className={`flex gap-8 relative ${InputSearch ? "z-0" : "z-50"}`}>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink !transition-colors duration-500 ease-in-out hover:text-[#00b7ff] flex gap-1"} id={path === "/" ? "active" : ""}
                                    to={"/"}
                                >
                                    Accueil
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] !transition-colors duration-500 ease-in-out Navlink hover:text-[#00b7ff] flex gap-1"}
                                    id={path === "/Boutique" ? "active" : ""}
                                    to={"/Boutique"}
                                >
                                    Boutique
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] !transition-colors duration-500 ease-in-out Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Paiement
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] !transition-colors duration-500 ease-in-out Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    A propos
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] !transition-colors duration-500 ease-in-out Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Contact
                                </NavLink>

                            </ul>
                        </nav>
                    </div>
                    <div className="flex gap-[1.2vw] relative ">
                        <SearchIcon className={`Usercircle cursor-pointer absolute right-[8vw] z-30 ${InputSearch ? " z-30 right-[8.6vw] text-bgFah" : " text-navbar transition-all"}`} onClick={handleSearchClick} />
                        {InputSearch && <X className="text-bgFah absolute left-[-43.5vw] top-[0.4vw] z-40 cursor-pointer X" onClick={() => { setInputSearch(false), fetchDrumData(), setSearch(""), fetchAccessoriesOneData() }} />}

                        <input type="text" placeholder="Rechecher un produit..." className={`absolute left-[-44vw] !w-[43.5vw] bg-bgInput !h-[3vw] text-bgFah top-[-.2vw] text-[1vw] Input ${InputSearch ? "opacity-100" : "opacity-0 cursor-default"}`} onChange={(e) => HandleSearch(e.target.value)} ref={InputFocusRef} value={Search} />
                        <Link to={"/Panier"}>
                            {notif ? (notif === 0 ? <ShoppingCartIcon className="text-navbar Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} /> : <div className="indicator">
                                <span className="indicator-item badge badge-xs badge-error">{notif}</span>
                                <ShoppingCartIcon className="text-navbar Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} />
                            </div>) : (<ShoppingCartIcon className="text-navbar Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} />)}
                        </Link>
                        {modalOpen ? <X className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <UserCircle className="text-navbar Usercircle cursor-pointer" onClick={handleClick} />}
                        {modalOpen && <ModalMenu User={User} />}
                        {isDark ? <Sun className="Usercircle text-navbar cursor-pointer" onClick={LightMode} />:<Moon className="Usercircle text-navbar cursor-pointer" onClick={DarkMode} /> }
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavigationBar;