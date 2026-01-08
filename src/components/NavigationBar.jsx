import { MenuIcon, SearchIcon, ShoppingCartIcon, UserCircle, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ModalMenu from "./ModalMenu";

function NavigationBar({ handleClick, modalOpen, handleSearchClick, InputSearch, setInputSearch, InputFocusRef, HandleSearch, setSearch, Search, fetchAccessoriesOneData, fetchDrumData, User, setModalOpen, status }) {
    const path = window.location.pathname
    const handleClickX = () => {
        setModalOpen(false)
    }
    // console.log(path);
    return (
        <>
            <header
                className="w-full h-[6vw] bg-[#0B0E14] fixed flex justify-between items-center px-[4vw] py-[2vw] border-b-[.1vw] border-[#ffffff1c] z-40"
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
                                    className={"text-white text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"} id={path === "/" ? "active" : ""}
                                    to={"/"}
                                >
                                    Accueil
                                </NavLink>
                                <NavLink
                                    className={"text-white text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                    id={path === "/Boutique" ? "active" : ""}
                                    to={"/Boutique"}
                                >
                                    Boutique
                                </NavLink>
                                <NavLink
                                    className={"text-white text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Paiement
                                </NavLink>
                                <NavLink
                                    className={"text-white text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    A propos
                                </NavLink>
                                <NavLink
                                    className={"text-white text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
                                >
                                    Contact
                                </NavLink>

                            </ul>
                        </nav>
                    </div>
                    <div className="flex gap-6 relative">
                        <SearchIcon className={`Usercircle cursor-pointer absolute right-[8.6vw] z-30 ${InputSearch ? " z-30 right-[8.6vw] text-black" : " text-white transition-all"}`} onClick={handleSearchClick} />
                        {InputSearch && <X className="text-black absolute left-[-48.7vw] top-[0.3vw] z-40 cursor-pointer X" onClick={() => { setInputSearch(false), fetchDrumData(), setSearch(""), fetchAccessoriesOneData() }} />}

                        <input type="text" placeholder="Rechecher un produit..." className={`absolute left-[-49vw] w-[48vw]! h-[3vw]! text-black top-[-0.3vw] text-[1vw] Input ${InputSearch ? "opacity-100" : "opacity-0 cursor-default"}`} onChange={HandleSearch} ref={InputFocusRef} value={Search} />
                        <Link to={"/Panier"}>
                            {status ? (status.length === 0 ? <ShoppingCartIcon className="text-white Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} /> : <div className="indicator">
                                <span className="indicator-item badge badge-xs badge-error">{status.length}</span>
                                <ShoppingCartIcon className="text-white Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} />
                            </div>):(<ShoppingCartIcon className="text-white Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} />)}
                        </Link>
                        {/* <MenuIcon className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} /> */}
                        {modalOpen ? <X className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <UserCircle className="text-white Usercircle cursor-pointer" onClick={handleClick} />}
                        {modalOpen && <ModalMenu User={User} />}
                        <p></p>

                    </div>
                </div>
            </header>
        </>
    )
}

export default NavigationBar;