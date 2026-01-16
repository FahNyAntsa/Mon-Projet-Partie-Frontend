import { LayoutDashboard, Store, TrendingUpIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebars() {
    const path = window.location.pathname
    return (
        <div className="w-[15vw] h-screen bg-sidebar  absolute pt-[2vw] flex flex-col gap-[1vw] ">
            <div className="w-[10vw] h-[10vw] bg-[#FFFF] !ml-[2.3vw] rounded-full">
                <img src="../src/assets/unnamed-removebg-preview.png" className=" w-full object-cover  h-[10vw] rounded-full" alt="" />
            </div>
            <div className="flex flex-col gap-[.5vw] px-[1vw]">
                <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-red-500 hover:border-0 DIV transition-colors w-full cursor-pointer ${path === "/Dashboard" ? "bg-red-500 text-white" : ""}`}>
                    <LayoutDashboard className={`Logout  hover:text-white ${path === "/Dashboard" ? " text-textsidebar" : "text-navbar"}`}/>
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
                <button className=" flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[1vw] px-1 relative hover:bg-green-600 hover:border-0 DIV transition-colors cursor-pointer">
                    <TrendingUpIcon className={`Logout text-navbar hover:text-white  ${path === "/Dash" ? " text-textsidebar" : "text-navbar"}`} />
                    <Link className="text-[1.1vw]! text-navbar w-full h-full absolute top-2 left-[-1.1vw] hover:text-white">Revenus</Link>
                </button>
            </div>
        </div>
    )
}

export default Sidebars;