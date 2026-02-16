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
                className="w-full lg:h-[6vw] h-[12vw] md:h-[16vw]  bg-bgFah top-0 fixed flex justify-between items-center px-[4vw] py-[2vw] shadow shadow-shadow z-40"
            >
                <img
                    src="../src/assets/unnamed-removebg-preview.png" alt=""
                    className="lg:w-[5vw] w-[9vw] h-[9vw] lg:h-[5vw] md:w-[12vw] md:h-[12vw] bg-white rounded-full cursor-pointer border-border border-[.1vw]"
                />
                <button className="lg:hidden !ml-[-16vw]" onClick={onClick}>
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
                                <ul className={`flex flex-col bg-bgFah p-2  rounded-[1vw] gap-3 lg:hidden lg:gap-8 absolute left-0 top-[13vw] `}>
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
                        className="text-white text-lg bg-[linear-gradient(90deg,#00c6ff,#0072ff)] lg:px-6 lg:py-1 px-4 rounded-md lg:rounded-[.5vw]  lg:text-[1vw]"
                    >
                        <Link to={"/SignIn"}>Rejoindre</Link>
                    </button>
                </div>
            </header>
        </>
    )
}

export default HomeNavigationBar;