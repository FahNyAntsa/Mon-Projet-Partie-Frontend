import { Link, NavLink } from "react-router-dom";
function HomeNavigationBar() {
    const path = window.location.pathname
    return (
        <>
            <header
                className="w-full h-[6vw] bg-[#0B0E14] fixed flex justify-between items-center px-[4vw] py-[2vw] border-b-[.1vw] border-[#ffffff1c] z-30"

            >
                <img
                    src="../src/assets/unnamed-removebg-preview.png" alt=""
                    className="w-[5vw] h-[5vw] bg-white rounded-full cursor-pointer"
                />
                <div className="flex  justify-between w-[50vw] items-center">
                    <div className="">
                        <nav >
                            <ul className={`flex gap-6 `}>
                                <NavLink
                                    className={"text-white text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"} id={path === "/" ? "active" : ""}
                                >
                                    Accueil
                                </NavLink>
                                <NavLink
                                    className={"text-white text-[1.1vw] Navlink hover:text-[#00b7ff] flex gap-1"}
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