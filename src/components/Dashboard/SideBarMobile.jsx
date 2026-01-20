import { LayoutDashboard, Store, TrendingUpIcon, UsersIcon, X } from "lucide-react";
import { Link } from "react-router-dom";

function SideBarMobile({SideBarOpen}) {
    const path = window.location.pathname
    return (
        <>

            {/* MOBILE */}
            <div className="absolute z-[9999999] w-full lg:hidden h-full top-0 left-0 bg-[#00000077]">
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
            </div>

            {/* MOBILE FIN */}
        </>


    )
}

export default SideBarMobile;