import axios from "axios";
import { BellIcon, ChevronDown, ChevronUp, LayoutDashboard, MenuIcon, Moon, Store, Sun, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import Charts from "./Charts";
import ChartsArea from "./ChartsArea";
import Notification from "./Notification";
import Sidebars from "./Sidebars";
import SideBarMobile from "./SideBarMobile";

function Dashboard() {
    const path = window.location.pathname
    // console.log(path)
    const [modalOpen, setModalOpen] = useState(false)
    const [User, setUser] = useState()
    const [DataCommand, setDataCommand] = useState([])
    const [DataUser, setDataUser] = useState([])
    const [DataProducts, setDataProducts] = useState([])
    const [innerCommand, setInnerCommand] = useState([])
    const [SideOpen, setSideOpen] = useState(false)
    const navigate = useNavigate()
    const [isDark, setIsDark] = useState(false)
    const Theme = localStorage.getItem("Theme")
    const DarkMode = () => {
        setIsDark(true)
        document.documentElement.classList.add("dark")
        localStorage.setItem("Theme", "dark")
    }
    useEffect(() => {
        if (Theme === "dark") {
            document.documentElement.classList.add("dark")
            setIsDark(true)
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])
    const LightMode = () => {
        setIsDark(false)
        localStorage.setItem("Theme", "light")
        document.documentElement.classList.remove("dark")
    }
    const SideBarOpen = () => {
        setSideOpen(!SideOpen)
    }
    const handleClick = () => {
        setModalOpen(true)
    }
    const handleClickX = () => {
        setModalOpen(false)
    }
    const fetchDrumData = async () => {
        try {
            const data = await axios.get("http://localhost:8000/Drum", { withCredentials: true })
            //   setDrumData(data.data.Drum)
            setUser(data.data.User)
            // console.log(data.data.User)
            if (data.data.status === 405) {
                navigate("/Login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const TousLesProduits = async () => {
        try {
            const response = await axios.get("http://localhost:8000/NombreDeProduit", { withCredentials: true })
            // console.log(response.data)
            setDataProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const TousLesCommandes = async () => {
        try {
            const response = await axios.get("http://localhost:8000/AllCommand", { withCredentials: true })
            // console.log(response.data)
            setDataCommand(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const TousLesUtilisateurs = async () => {
        try {
            const response = await axios.get("http://localhost:8000/Utilisateurs", { withCredentials: true })
            // console.log(response.data)
            setDataUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const InnerCommand = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/CommandInfo`, { withCredentials: true })
            // console.log(response.data)
            setInnerCommand(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const Prix = innerCommand.reduce((item, i) => item + i.Price, 0)
    // console.log(Prix)
    useEffect(() => {
        fetchDrumData()
        TousLesProduits()
        TousLesCommandes()
        TousLesUtilisateurs()
        InnerCommand()
    }, [])
    return (
        <>
            <section className="relative bg-bgFah h-screen">
                {SideOpen && (<SideBarMobile SideBarOpen={SideBarOpen} />)}
                <Sidebars />
                <div className="lg:pl-[17vw] pl-[4vw] pr-[2vw] md:h-20 w-full bg-topbar  shadow shadow-shadowBox h-14 lg:h-[4.5vw] flex justify-between  items-center z-30">
                    <MenuIcon className=" text-navbar md:w-[6vw] md:h-[5vw]  lg:hidden" onClick={SideBarOpen} size={25} />
                    {isDark ? <Sun className="lg:!w-[1.5vw] absolute left-14  md:left-24  md:w-[6vw] md:h-[5vw]  lg:!h-[2.5vw] lg:hidden text-navbar cursor-pointer" onClick={LightMode} size={25} /> : <Moon className="lg:!w-[1.5vw]  md:left-24  lg:!h-[2.5vw] text-navbar md:w-[6vw] md:h-[5vw]  absolute left-14 lg:hidden cursor-pointer" onClick={DarkMode} size={25} />}
                    {/* <h1 className="lg:hidden absolute text-base text-navbar">Tableau de bord</h1> */}
                    <h1 className="lg:text-[1.4vw] hidden lg:flex  text-base text-navbar">Tableau de bord</h1>
                    <div className="flex items-center lg:gap-[.5vw]">
                        {isDark ? <Sun className="lg:!w-[1.5vw] lg:!h-[2.5vw] hidden lg:flex text-navbar cursor-pointer" onClick={LightMode} size={25} /> : <Moon className="lg:!w-[1.5vw] lg:!h-[2.5vw] text-navbar hidden lg:flex cursor-pointer" onClick={DarkMode} size={25} />}
                        <Notification />
                        <div className="flex items-center gap-[1vw] border-[.1vw] border-borderuser w-auto rounded-[2vw] px-[1vw]">
                            <img src={`http://localhost:8000/upload/users/${User ? User.photo : ""}`} className="lg:!w-[3vw] lg:!h-[3vw] w-[9vw] h-[9vw] rounded-full" alt="" />
                            <div>
                                <h1 className="text-navbar text-base md:text-2xl">{User ? User.prenom : ""}</h1>
                                <span className="badge md:badge-lg badge-xs lg:badge-xs badge-warning">Admin</span>
                            </div>
                            {modalOpen ? <ChevronUp className="text-navbar shrink-0 lg:!w-[1.5vw] lg:!h-[2.5vw]  Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} size={25} /> : <ChevronDown className="text-navbar lg:!w-[1.5vw] lg:!h-[2.5vw] shrink-0  Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} size={25} />}
                            {/* <ChevronDown className="cursor-pointer" onClick={handleClick} /> */}
                            {modalOpen && <ModalUserDashboard User={User} />}
                        </div>
                    </div>
                </div>
                <div className="w-full h-[41vh] mt-[3vw] lg:pl-[17vw] pt-[2vw] items-center gap-[4vw] flex flex-col lg:flex-row justify-evenly">
                    <h1 className="lg:hidden  text-lg text-navbar underline md:text-3xl">Tableau de bord</h1>
                    <div className="lg:w-[20vw] lg:h-[12vw] md:w-[60%] w-[100%] h-[24vw] flex justify-evenly lg:justify-center items-center rounded-[1vw] bg-blue-500 lg:gap-[2vw]">
                        <Store className="lg:w-[4vw] lg:h-[2.5vw] md:w-[6vw] md:h-[5vw] text-white  lg:border-2 border-white rounded-full" size={40} />
                        <div className="flex flex-col">
                            <h2 className="lg:text-[2vw] md:text-3xl text-2xl text-white">Produits</h2>
                            <h1 className="text-white text-xl md:text-3xl lg:text-[1.6vw] ">{DataProducts.length}</h1>
                        </div>
                    </div>
                    <div className="lg:w-[20vw] lg:h-[12vw]   md:w-[60%] w-[100%] h-[24vw] flex justify-evenly lg:justify-center items-center  rounded-[1vw] gap-[2vw] bg-amber-600">
                        <UsersIcon className="lg:w-[4vw] md:w-[6vw] md:h-[5vw]  lg:h-[2.5vw] text-white  lg:border-2 border-white rounded-full" size={40} />
                        <div className="flex flex-col">
                            <h2 className="lg:text-[2vw] md:text-3xl text-2xl text-white">Utilisateurs</h2>
                            <h1 className="text-white text-xl md:text-3xl lg:text-[1.6vw]">{DataUser.length}</h1>
                        </div>
                    </div>
                    <div className="lg:w-[20vw] lg:h-[12vw] md:w-[60%] w-[100%] h-[24vw] flex justify-evenly lg:justify-center items-center  rounded-[1vw] bg-green-600 gap-[2vw]">
                        <TrendingUpIcon className="lg:w-[4vw] md:w-[6vw] md:h-[5vw] lg:h-[2.5vw] text-white  lg:border-2 border-white rounded-full" size={40} />
                        <div className="flex flex-col">
                            <h2 className="lg:text-[2vw] md:text-3xl text-2xl text-white">Revenus</h2>
                            <h1 className="text-white text-xl md:text-3xl lg:text-[1.6vw] flex items-center gap-[.5vw]">{Prix.toLocaleString("fr-FR")} <span className="lg:text-[1vw] md:text-xl text-base">Ariary</span></h1>
                        </div>
                    </div>
                </div>
                <div className="lg:pl-[17vw] w-full h-auto flex gap-3 justify-evenly">
                    <Charts DataCommand={innerCommand} />
                    <ChartsArea DataUser={DataUser} />
                </div>
            </section>
        </>
    )
}

export default Dashboard;