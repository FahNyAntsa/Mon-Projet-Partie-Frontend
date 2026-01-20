import { Menu, MenuIcon, Moon, SearchIcon, ShoppingCartIcon, Sun, UserCircle, X, XIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ModalMenu from "./ModalMenu";
import { useState } from "react";

function NavigationBar({ handleClick, modalOpen, handleSearchClick, InputSearch, setInputSearch, InputFocusRef, HandleSearch, setSearch, Search, fetchAccessoriesOneData, fetchDrumData, User, setModalOpen, status, notif }) {
    const [open, setOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const onClick = () => {
        setOpen(!open)
    }
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
                className="w-full lg:h-[6vw] h-[12vw] md:h-[16vw] bg-bgFah top-0 fixed flex justify-between items-center px-[4vw] py-[2vw] shadow shadow-shadow z-40"
            >
                <img
                    src="../src/assets/unnamed-removebg-preview.png" alt=""
                    className="lg:w-[5vw] w-[9vw] h-[9vw] md:w-[12vw] md:h-[12vw] lg:h-[5vw] bg-white rounded-full cursor-pointer border-border border-[.1vw]"
                />
                <button className="lg:hidden absolute md:left-36 left-16 " onClick={onClick}>
                    {open ? <XIcon size={25} className="text-navbar md:!w-[5vw] md:!h-[5vw]" /> : <Menu size={25} className="text-navbar  md:!w-[5vw] md:!h-[5vw]" />}
                </button>
                <div className="flex justify-between gap-[3vw] w-[50vw] items-center">
                    <div>
                        <nav >
                            {/* DESKTOP */}
                            <ul className={`lg:flex gap-3 hidden lg:gap-8 relative ${InputSearch ? "z-0" : "z-50"}`}>
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
                            {/* MOBILE FIN*/}
                        </nav>
                    </div>
                    {/* MOBILE 2 */}
                    <div className="flex gap-[2vw]  md:w-[32vw] lg:!gap-0 md:gap-0  w-[33vw] lg:!w-[7vw]  justify-between  relative">
                        {InputSearch ? <X className="lg:text-bgFah text-navbar lg:!z-[777777] absolute lg:right-[49vw] right-[8vw] md:!w-[5vw] md:!h-[5vw] lg:top-[0.1vw]  top-[0.4vw] z-40 cursor-pointer lg:!h-[2.5vw] lg:!w-[1.5vw] shrink-0" onClick={() => { setInputSearch(false), fetchDrumData(), setSearch(""), fetchAccessoriesOneData() }} size={25} /> : <SearchIcon className={` cursor-pointer absolute lg:z-[777] text-bgFah lg:text-navbar lg:!h-[2.5vw] lg:!w-[1.5vw] md:right-[8vw]  right-[8vw] md:!w-[5vw] md:!h-[5vw] ${InputSearch ? "  right-[8.6vw] text-bgFah" : " text-navbar transition-all"}`} onClick={handleSearchClick} size={25} />}
                        {InputSearch ? <input type="text" placeholder="Rechecher un produit..." className={`absolute lg:left-[-44vw] left-[-33vw] w-[50vw] h-8 lg:!w-[43.5vw] md:!h-[7vw]  bg-bgInput lg:!h-[3vw] text-bgFah top-[-1vw] lg:top-[-.2vw] text-[3vw] rounded-lg lg:text-[1vw] Input ${InputSearch ? "opacity-100 z-[999]" : "opacity-0 cursor-default"}`} onChange={(e) => HandleSearch(e.target.value)}  ref={InputFocusRef} value={Search}/> : <input type="text" placeholder="Rechecher un produit..." className={`absolute lg:left-[-44vw] !cursor-default left-[-33vw] w-[50vw] md:!h-[3vw] h-8 lg:!w-[43.5vw] bg-bgInput lg:!h-[3vw] text-bgFah top-[-1vw] lg:top-[-.2vw] text-[3vw] rounded-lg lg:text-[1vw] Input ${InputSearch ? "opacity-100" : "opacity-0 cursor-default z-0"}`} onChange={(e) => HandleSearch(e.target.value)} disabled ref={InputFocusRef} value={Search}/>}
                        <Link to={"/Panier"}>
                            {notif ? (notif === 0 ? <ShoppingCartIcon className="text-navbar lg:!ml-[0vw]  md:ml-[3vw] md:!w-[5vw] md:!h-[5vw] lg:!h-[2.5vw] lg:w-[1.5vw] cursor-pointer" id={path === "/Panier" ? "active" : ""} size={25} /> : <div className=" absolute ">
                                <span className="indicator-item badge absolute right-[-.8vw]  top-[-.5vw] badge-xs badge-error">{notif}</span>
                                <ShoppingCartIcon className="text-navbar  lg:!ml-[0vw]  md:!ml-[3vw]  md:!w-[5vw] md:!h-[5vw] lg:!h-[2.5vw] lg:!w-[1.5vw] cursor-pointer" id={path === "/Panier" ? "active" : ""} size={25} />
                            </div>) : (<ShoppingCartIcon className={`text-navbar md:!w-[5vw] md:!h-[5vw] absolute lg:!h-[2.5vw] lg:!w-[1.5vw] lg:!ml-[0vw] md:ml-[3vw] cursor-pointer ${InputSearch?"-z-50":""}`} id={path === "/Panier" ? "active" : ""} size={25} />)}
                        </Link>
                        {isDark ? <Sun className={`lg:!h-[2.5vw] lg:ml-[1.5vw] md:!w-[5vw] md:!h-[5vw] lg:!w-[1.5vw] ${InputSearch?"z-0":"z-[999]"}  text-navbar cursor-pointer`} onClick={LightMode} size={25} /> : <Moon className={`lg:!h-[2.5vw] lg:ml-[1.5vw] md:!w-[5vw] md:!h-[5vw] lg:!w-[1.5vw]  text-navbar cursor-pointer ${InputSearch?"z-0":"z-[999]"}`} onClick={DarkMode} size={25} />}
                        {modalOpen ? <X className="text-navbar md:!w-[5vw] md:!h-[5vw] lg:!h-[2.5vw] lg:!w-[1.5vw]  cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} size={25} /> : <UserCircle className="text-navbar md:!w-[5vw] md:!h-[5vw] lg:!h-[2.5vw] lg:!w-[1.5vw]  cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} size={25} />}
                        {modalOpen && <ModalMenu User={User} />}
                    </div>
                    {/* MOBILE 2 FIN*/}
                </div>
            </header>
        </>
    )
}

export default NavigationBar;