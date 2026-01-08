import { ShoppingCartIcon, UserCircle, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import ModalMenu from "../ModalMenu";

function HomeNavigationBarUsers({ handleClick, modalOpen,User,setModalOpen,InputSearch }) {
    const path = window.location.pathname
    // console.log(User)
    // console.log(path);
    const handleClickX=()=>{
        setModalOpen(false)
    }
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
                        <Link to={"/Panier"}>
                            <ShoppingCartIcon className="text-white Usercircle cursor-pointer" id={path === "/Panier" ? "active" : ""} />
                        </Link>
                        {modalOpen?<X className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX}/>:<UserCircle className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} />}
                        {modalOpen && <ModalMenu User={User} />}
                        <p className="text-black text-[1.1vw] mt-2"></p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default HomeNavigationBarUsers;