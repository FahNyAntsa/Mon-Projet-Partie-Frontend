import { Menu, XIcon } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
function HomeNavigationBar() {
    const [open, setOpen] = useState(false)
    const path = window.location.pathname
    const onClick = () => {
        setOpen(!open)
    }
    return (
        <>
            <header
                className="w-full sm:h-[6vw] bg-bgFah fixed flex justify-between items-center px-[4vw] py-[2vw] shadow-shadow shadow z-30"
            >
                <img
                    src="../src/assets/unnamed-removebg-preview.png" alt=""
                    className="w-[5vw] h-[5vw] bg-white border-[.1vw] border-border rounded-full cursor-pointer"
                />
                <button className="lg:hidden ml-[2vw] " onClick={onClick}>
                    {open ? <XIcon size={25} className="text-navbar md:!w-[5vw] md:!h-[5vw]" /> : <Menu size={25} className="text-navbar md:!w-[5vw] md:!h-[5vw]" />}
                </button>
                <div className="flex  justify-between w-[50vw] items-center">
                    <div className="">
                        <nav >
                            <ul className={`lg:flex hidden gap-6 `}>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"} id={path === "/" ? "active" : ""}
                                >
                                    Accueil
                                </NavLink>
                                <NavLink
                                    className={"text-navbar text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
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
                    <button
                        className="text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-6 py-1 rounded-[.5vw]  text-[1vw]"
                    >
                        <Link to={"/SignIn"}>Rejoindre</Link>
                    </button>
                </div>
            </header>
        </>
    )
}

export default HomeNavigationBar;