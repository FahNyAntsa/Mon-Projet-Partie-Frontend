import { LayoutDashboard, Store, TrendingUpIcon, UsersIcon, X } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebars({SideBarOpen}) {
    const path = window.location.pathname
    return (
        <>
            <div className="w-[15vw] hidden h-screen bg-sidebar  absolute pt-[2vw] lg:flex flex-col gap-[1vw] ">
                <div className="w-[10vw] h-[10vw] bg-[#FFFF] !ml-[2.3vw] rounded-full">
                    <img src="../src/assets/unnamed-removebg-preview.png" className=" w-full object-cover  h-[10vw] rounded-full" alt="" />
                </div>
                <div className="flex flex-col gap-[.5vw] px-[1vw]">
                    <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-red-500 hover:border-0 DIV transition-colors w-full cursor-pointer ${path === "/Dashboard" ? "bg-red-500 text-white" : ""}`}>
                        <LayoutDashboard className={`Logout  hover:text-white ${path === "/Dashboard" ? " text-textsidebar" : "text-navbar"}`} />
                        <Link className={`text-[1.1vw]! w-full  h-full absolute top-2 left-[.9vw] hover:text-white ${path === "/Dashboard" ? " text-textsidebar" : "text-navbar"} `} to={"/Dashboard"}>Tableau de bord</Link>
                    </button>
                    <hr />
                    <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[1vw] px-1 relative hover:bg-blue-500 hover:border-0 DIV transition-colors duration-100 ease-in-out cursor-pointer w-full ${path === "/DashProduit" ? "bg-blue-500 !text-navbar" : ""}`}>
                        <Store className={`Logout  hover:text-white ${path === "/DashProduit" ? " text-textsidebar" : "text-navbar"}`} />
                        <Link className={`text-[1.1vw]!  w-full transition-colors duration-150 ease-in-out  h-full absolute top-2 left-[-1.3vw] hover:text-white ${path === "/DashProduit" ? " text-textsidebar" : "text-navbar"}`} to={"/DashProduit"}>Produits</Link>
                    </button>
                    <hr />
                    <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[1vw] px-1 relative hover:bg-amber-600 hover:border-0 DIV transition-colors cursor-pointer w-full ${path === "/DashboardUsers" ? "bg-amber-600 !text-navbar" : ""}`}>
                        <UsersIcon className={`Logout  hover:text-white ${path === "/DashboardUsers" ? " text-textsidebar" : "text-navbar"}`} />
                        <Link className={`text-[1.1vw]! text-navbar w-full h-full absolute top-2 left-[-0.5vw] hover:text-white ${path === "/DashboardUsers" ? " text-textsidebar" : "text-navbar"}`} to={"/DashboardUsers"}>Utilisateurs</Link>
                    </button>
                    <hr />
                    <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[1vw] px-1 relative hover:bg-green-600 hover:border-0 DIV transition-colors cursor-pointer ${path === "/DashCommand" ? "bg-green-600 !text-navbar" : ""}`}>
                        <TrendingUpIcon className={`Logout text-navbar hover:text-white  ${path === "/DashCommand" ? " text-textsidebar" : "text-navbar"}`} />
                        <Link className={`text-[1.1vw]! text-navbar w-full h-full absolute top-2 left-[-1.1vw] hover:text-white ${path === "/DashCommand" ? " text-textsidebar" : "text-navbar"}`} to={"/DashCommand"}>Revenus</Link>
                    </button>
                </div>
            </div>
            {/* MOBILE */}
            {/* <div className="absolute z-[9999999] w-full lg:hidden h-full top-0 left-0 bg-[#00000077]">
                <div className="w-[50vw] !z-[999999999] h-screen bg-sidebar absolute pt-[2vw] flex flex-col gap-[3vw] ">
                    <X className="absolute top-0 right-0 text-navbar" onClick={SideBarOpen} size={25}/>
                    <div className="w-[30vw] h-[30vw] bg-[#FFFF] !ml-[10vw] rounded-full">
                        <img src="../src/assets/unnamed-removebg-preview.png" className=" w-full object-cover  h-[30vw] rounded-full" alt="" />
                    </div>
                    <div className="flex flex-col gap-[3vw] px-[1vw]">
                        <Link className={`text-[1.1vw]! w-full DIV px-[1vw] flex gap-[2vw] h-full ${path === "/Dashboard" ? "bg-red-500 text-white" : ""} md:text-[3vw] py-[1vw] rounded-md  hover:text-white ${path === "/Dashboard" ? " text-textsidebar" : "text-navbar"} `} to={"/Dashboard"}>
                            <LayoutDashboard className={`Logout md:!w-[4vw] md:!h-[5vw] hover:text-white ${path === "/Dashboard" ? " text-textsidebar" : "text-navbar"}`} />
                            Tableau de bord
                        </Link>
                        <hr />
                        <Link className={`text-[1.1vw]! DIV px-[1vw] py-[1vw] md:text-[3vw] gap-[2vw]  w-full transition-colors duration-150 ease-in-out rounded-md   h-full flex hover:text-white ${path === "/DashProduit" ? " text-textsidebar" : "text-navbar"} ${path === "/DashProduit" ? "bg-blue-500 !text-white" : ""}`} to={"/DashProduit"}>
                            <Store className={`Logout md:!w-[4vw] md:!h-[5vw]  hover:text-white ${path === "/DashProduit" ? " text-textsidebar" : "text-navbar"}`} />
                            Produits
                        </Link>
                        <hr />
                        <Link className={`text-[1.1vw]! flex gap-[2vw] rounded-md DIV px-[1vw] py-[1vw] text-navbar md:text-[3vw] w-full h-full  hover:text-white ${path === "/DashboardUsers" ? " text-textsidebar" : "text-navbar"} ${path === "/DashboardUsers" ? "bg-amber-600 !text-navbar" : ""}`} to={"/DashboardUsers"}>
                            <UsersIcon className={`Logout md:!w-[4vw] md:!h-[5vw]  hover:text-white ${path === "/DashboardUsers" ? " text-textsidebar" : "text-navbar"}`} />
                            Utilisateurs
                        </Link>
                        <hr />
                        <Link className={`text-[1.1vw]! flex gap-[2vw] rounded-md DIV px-[1vw] py-[1vw] text-navbar w-full h-full  hover:text-white md:text-[3vw] ${path === "/DashCommand" ? " text-textsidebar" : "text-navbar"} ${path === "/DashCommand" ? "bg-green-600 !text-navbar" : ""}`} to={"/DashCommand"}>
                            <TrendingUpIcon className={`Logout md:!w-[4vw] md:!h-[5vw] text-navbar hover:text-white  ${path === "/DashCommand" ? " text-textsidebar" : "text-navbar"}`} />
                            Revenus
                        </Link>
                    </div>
                </div>
            </div> */}

            {/* MOBILE FIN */}
        </>


    )
}

export default Sidebars;