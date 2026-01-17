import axios from "axios";
import { BellIcon, ChevronDown, ChevronUp, LayoutDashboard, Moon, Store, Sun, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import Charts from "./Charts";
import ChartsArea from "./ChartsArea";
import Notification from "./Notification";
import Sidebars from "./Sidebars";

function Dashboard() {
    const path = window.location.pathname
    // console.log(path)
    const [modalOpen, setModalOpen] = useState(false)
    const [User, setUser] = useState()
    const [DataCommand, setDataCommand] = useState([])
    const [DataUser, setDataUser] = useState([])
    const [DataProducts, setDataProducts] = useState([])
    const [innerCommand, setInnerCommand] = useState([])
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
    // 
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
                <Sidebars />
                <div className="pl-[17vw] pr-[2vw] w-full bg-topbar shadow shadow-shadowBox h-[4.5vw] flex justify-between items-center z-30">
                    <h1 className="text-[1.4vw] text-navbar">Tableau de bord</h1>
                    <div className="flex items-center gap-[.5vw]">
                        {isDark ? <Sun className="Usercircle text-navbar cursor-pointer" onClick={LightMode} /> : <Moon className="Usercircle text-navbar cursor-pointer" onClick={DarkMode} />}
                        <Notification />
                        <div className="flex items-center gap-[1vw] border-[.1vw] border-borderuser w-auto rounded-[2vw] px-[1vw]">
                            <img src={`http://localhost:8000/upload/users/${User ? User.photo : ""}`} className="w-[3vw] h-[3vw] rounded-full" alt="" />
                            <div>
                                <h1 className="text-navbar">{User ? User.prenom : ""}</h1>
                                <span className="badge badge-xs badge-warning">Admin</span>
                            </div>
                            {modalOpen ? <ChevronUp className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <ChevronDown className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} />}
                            {/* <ChevronDown className="cursor-pointer" onClick={handleClick} /> */}
                            {modalOpen && <ModalUserDashboard User={User} />}
                        </div>
                    </div>
                </div>
                <div className="w-full h-[41vh] pl-[17vw] pt-[2vw]  flex justify-evenly">
                    <div className="w-[20vw] h-[12vw] flex  justify-center items-center rounded-[1vw] bg-blue-500 gap-[2vw]">
                        <Store className="IconDashboard border-2 border-white rounded-full" />
                        <div className="flex flex-col">
                            <h2 className="text-[2vw] text-white">Produits</h2>
                            <h1 className="text-white text-[1.6vw] ">{DataProducts.length}</h1>
                        </div>
                    </div>
                    <div className="w-[20vw] h-[12vw] flex  justify-center items-center rounded-[1vw] gap-[2vw] bg-amber-600">
                        <UsersIcon className="IconDashboard border-2 border-white rounded-full" />
                        <div className="flex flex-col">
                            <h2 className="text-[2vw] text-white">Utilisateurs</h2>
                            <h1 className="text-white text-[1.6vw]">{DataUser.length}</h1>
                        </div>
                    </div>
                    <div className="w-[20vw] h-[12vw] flex  justify-center items-center rounded-[1vw] bg-green-600 gap-[2vw]">
                        <TrendingUpIcon className="IconDashboard border-2 border-white rounded-full" />
                        <div className="flex flex-col">
                            <h2 className="text-[2vw] text-white">Revenus</h2>
                            <h1 className="text-white text-[1.6vw] flex items-center gap-[.5vw]">{Prix.toLocaleString("fr-FR")} <span className="text-[1vw]">Ariary</span></h1>
                        </div>
                    </div>
                </div>
                <div className="pl-[17vw] flex justify-evenly">
                    <div>
                        <Charts DataCommand={innerCommand} />
                    </div>
                    <div>
                        <ChartsArea DataUser={DataUser} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;