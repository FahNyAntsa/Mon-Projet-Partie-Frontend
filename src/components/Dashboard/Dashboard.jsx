import axios from "axios";
import { BellIcon, ChevronDown, ChevronUp, LayoutDashboard, Store, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import Charts from "./Charts";
import ChartsArea from "./ChartsArea";
import Notification from "./Notification";

function Dashboard() {
    const path = window.location.pathname
    // console.log(path)
    const [modalOpen, setModalOpen] = useState(false)
    const [User, setUser] = useState()
    const [DataCommand, setDataCommand] = useState([])
    const [DataUser, setDataUser] = useState([])
    const [DataProducts, setDataProducts] = useState([])

    const navigate = useNavigate()
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
  
    useEffect(() => {
        fetchDrumData()
        TousLesProduits()
        TousLesCommandes()
        TousLesUtilisateurs()
    }, [])
    return (
        <>
            <section className="relative">
                <div className="w-[15vw] h-screen bg-[#192336] absolute pt-[2vw] flex flex-col gap-[3vw] ">
                    <div className="w-[10vw] h-[10vw] bg-[#FFFF] ml-[2.3vw]! rounded-full">
                        <img src="../src/assets/unnamed-removebg-preview.png" className=" w-full object-cover  h-[10vw] rounded-full" alt="" />
                    </div>
                    <div className="flex flex-col gap-[1vw] px-[1vw]">
                        <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-red-500 hover:border-0 DIV transition-colors w-full cursor-pointer ${path === "/Dashboard" ? "bg-red-500 text-white" : ""}`}>
                            <LayoutDashboard className="Logout hover:text-white" />
                            <Link className="text-[1.1vw]! w-full h-full absolute top-2 left-[.9vw] hover:text-white" to={"/Dashboard"}>Tableau de bord</Link>
                        </button>
                        <hr />
                        <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-blue-500 hover:border-0 DIV transition-colors cursor-pointer w-full `}>
                            <Store className="Logout hover:text-white" />
                            <Link className="text-[1.1vw]! w-full h-full absolute top-2 left-[-1.3vw] hover:text-white" to={"/DashProduit"}>Produits</Link>
                        </button>
                        <hr />
                        <button className=" flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-amber-600 hover:border-0 DIV transition-colors cursor-pointer w-full ">
                            <UsersIcon className="Logout hover:text-white" />
                            <Link className="text-[1.1vw]! w-full h-full absolute top-2 left-[-0.5vw] hover:text-white" to={"/DashboardUsers"}>Utilisateurs</Link>
                        </button>
                        <hr />
                        <button className=" flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-green-600 hover:border-0 DIV transition-colors cursor-pointer">
                            <TrendingUpIcon className="Logout hover:text-white" />
                            <Link className="text-[1.1vw]! w-full h-full absolute top-2 left-[-1.1vw] hover:text-white">Revenus</Link>
                        </button>
                    </div>

                </div>
                <div className="pl-[17vw] pr-[2vw] w-full bg-[#0f1520] h-[4.5vw] flex justify-between items-center z-30">
                    <h1 className="text-[1.4vw]">Tableau de bord</h1>
                    <div className="flex items-center gap-[1vw]">
                        <Notification />
                        <div className="flex items-center gap-[1vw] border-[.1vw] border-[#ffffff2f] w-auto rounded-[2vw] px-[1vw]">
                            <img src={`http://localhost:8000/upload/users/${User ? User.photo : ""}`} className="w-[3vw] h-[3vw] rounded-full" alt="" />
                            <div>
                                <h1>{User ? User.prenom : ""}</h1>
                                <span className="badge badge-xs badge-warning">Admin</span>
                            </div>
                            {modalOpen ? <ChevronUp className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <ChevronDown className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} />}
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
                            <h1 className="text-white text-[1.6vw] flex items-center gap-[.5vw]">500 <span className="text-[1vw]">Ariary</span></h1>
                        </div>
                    </div>
                </div>
                <div className="pl-[17vw] flex justify-evenly">
                    <div>
                        <Charts DataCommand={DataCommand} />
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