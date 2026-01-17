import { ChevronDown, ChevronUp, EditIcon, Moon, Sun, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import Notification from "./Notification"
import ModalUserDashboard from "./ModalUserDashboard"
import axios from "axios"
import Sidebars from "./Sidebars"
function DashCommand() {
    const [CommandToMap, setCommandToMap] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const [User, setUser] = useState([])
    const Theme = localStorage.getItem("Theme")
    const DarkMode = () => {
        setIsDark(true)
        document.documentElement.classList.add("dark")
        localStorage.setItem("Theme", "dark")
    }
    useEffect(()=>{
        if (Theme === "dark") {
            document.documentElement.classList.add("dark")
            setIsDark(true)
        } else {
            document.documentElement.classList.remove("dark")
        }
    },[])
    const LightMode = () => {
        setIsDark(false)
        localStorage.setItem("Theme", "light")
        document.documentElement.classList.remove("dark")
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
    const TousLesCommandes = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/AllCommand`, { withCredentials: true })
            console.log(response.data)
            setCommandToMap(response.data)
            // setTotalPage(response.data.NbrDePage)
        } catch (error) {
            console.log(error)
        }
    }
    const Livrer = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/Command/${id}`, {}, { withCredentials: true })
            TousLesCommandes()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDrumData()
        TousLesCommandes()
    }, [])

    return (
        <section className="relative bg-bgFah h-screen">
            <Sidebars />
            <div className="pl-[17vw] pr-[2vw] w-full bg-topbar h-[4.5vw] flex justify-between items-center z-30 shadow shadow-shadowBox">
                <div className="flex items-center gap-[1vw]">
                    <h1 className="text-[1.4vw] text-navbar">Revenus & Commandes</h1>
                </div>
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
            <div className="flex items-center h-full! flex-col pl-[16vw] justify-center pt-[2vw]">
                <div className="overflow-x rounded-box flex-1 shadow shadow-shadowBox mt-[2vw]!  w-[80vw] ">
                    <table className="table h-full!">
                        {/* head */}
                        <thead>
                            <tr className="border-none">
                                <th className="text-Th text-[1.1vw]">Id de la commande</th>
                                <th className="text-Th text-[1.1vw]">Id de l'utilisateur</th>
                                <th className="text-Th text-[1.1vw]">Id du produit</th>
                                <th className="text-Th text-[1.1vw]">Status de la commande</th>
                                <th className="text-Th text-[1.1vw]">Date de la commande</th>
                                <th className="text-Th text-[1.1vw]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {CommandToMap.map((commande, index) => (
                                <tr key={index} className="border-none">
                                    <td>
                                        <span>{commande.id}</span>
                                    </td>
                                    <td className="text-Th">
                                        {commande.user_id}
                                    </td>
                                    <td className="text-Th">{commande.product_id}</td>
                                    <td className="text-Th">
                                        {commande.status === "Payé" ? <span className="badge badge-info">{commande.status}</span> : <span className="badge badge-success">{commande.status}</span>}

                                    </td>
                                    <td className="text-Th">{new Date(commande.command_at).toLocaleDateString("fr-FR")}</td>
                                    <td className=" w-[12vw] ">
                                        <div className="flex gap-4 items-center ">
                                            {commande.status === "Payé" ? <button className=" text-white text-[1vw] rounded-[.5vw] p-[.2vw]">
                                                <Trash2Icon className="Logout text-red-500" />
                                            </button> : <button className=" opacity-50 text-white text-[1vw] rounded-[.5vw] p-[.2vw]" disabled>
                                                <Trash2Icon className="Logout text-red-500" />
                                            </button>}

                                            {commande.status === "Payé" ? <button className=" text-white bg-green-700 py-[.3vw] px-[1vw] rounded-[1vw] text-[1vw]rounded-[.5vw] z-0" onClick={() => Livrer(commande.id)} >
                                                Livrer
                                            </button> : <button className=" text-white bg-green-700 py-[.3vw] px-[1vw] rounded-[1vw] text-[1vw]rounded-[.5vw] z-0 opacity-50" disabled >
                                                Livrer
                                            </button>}

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <dialog id="my_modal_3" className=" modal">
                        <div className="modal-box w-[30vw]! h-[27vw] bg-white!">
                            <h1 className="text-[#070b2b] text-[1.2vw] text-center underline">Modifier un utilisateur</h1>
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle hover:text-white text-black btn-ghost absolute right-2 top-2">x</button>
                            </form>
                            <form action="" className="flex flex-col gap-[.8vw]">
                                <label htmlFor="nom" className="text-[#070b2b] underline">Nom</label>
                                <input type="text" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="nom" name="nom" />
                                <label htmlFor="prenom" className="text-[#070b2b] underline">Prénom</label>
                                <input type="text" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="prenom" name="prenom" />
                                <label htmlFor="email" className="text-[#070b2b] underline">Email</label>
                                <input type="email" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="email" name="email" />
                                <button className=" mt-[1.5vw]! bg-[#600385ee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]">Modifier</button>
                            </form>
                        </div>
                    </dialog>
                </div>
            </div>
        </section>
    )
}

export default DashCommand;