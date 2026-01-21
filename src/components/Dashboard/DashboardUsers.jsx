import { BellIcon, ChevronDown, ChevronUp, EditIcon, MenuIcon, Moon, PlusCircle, Search, SquareArrowLeftIcon, SquareArrowRightIcon, Sun, Trash2Icon } from "lucide-react";
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ModalAjoutUser from "./ModalAjoutUser";
import ModalModifierUser from "./ModalModifierUsers";
import ConfirmationModal from "./ConfirmationModal";
import Notification from "./Notification";
import ModalDeConfirmation from "./ModalDeConfirmation";
import Sidebars from "./Sidebars";
import SideBarMobile from "./SideBarMobile";



function DashboardUsers() {
    const [modalOpen, setModalOpen] = useState(false)
    const [AjoutOpen, setAjoutOpen] = useState(false)
    const [ModalConfirmOpen, setModalConfirmOpen] = useState(false)
    const [User, setUser] = useState()
    const [page, setPage] = useState(1)
    const [TotalPage, setTotalPage] = useState([])
    const [ModifierOpen, setModifierOpen] = useState(false)
    const [id, setId] = useState(0)
    const [SideOpen, setSideOpen] = useState(false)
    const [UserSearch, setUserSearch] = useState("")
    const [UserToMap, setUserToMap] = useState([])
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
    const handleClick = () => {
        setModalOpen(true)
    }
    const SideBarOpen = () => {
        setSideOpen(!SideOpen)
    }
    const handleClickX = () => {
        setModalOpen(false)
    }
    const ClickAjout = () => {
        setAjoutOpen(!AjoutOpen)
    }
    const ClickModifier = () => {
        setModifierOpen(!ModifierOpen)
    }
    const ClickDelete = () => {
        setModalConfirmOpen(!ModalConfirmOpen)
        // setId(Produit.id)
    }
    const handleSearch = async (value) => {
        try {
            setUserSearch(value)
            // console.log(UserSearch)
            const URL = `http://localhost:8000/UserSearch?value=${value}`
            const data = await axios.get(URL, { withCredentials: true })
            // console.log(data.data)
            if (value === "") {
                TousLesUtilisateurs()
            }
            setUserToMap(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    // handleSearch()
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
    const TousLesUtilisateurs = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/AllUser?page=${page}&limit=6`, { withCredentials: true })
            // console.log(response.data)
            setUserToMap(response.data.Response)
            setTotalPage(response.data.NbrDePage)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(UserSearch)

    const ProductAdded = (produit) => {
        setUserToMap(prev => [produit, ...prev])
    }
    useEffect(() => {
        fetchDrumData()
        TousLesUtilisateurs()
    }, [page])
    const PageNumber = Array.from({ length: TotalPage }, (_, index) => index + 1)
    return (
        <>
            <section className="relative bg-bgFah h-screen">
                {AjoutOpen && <ModalAjoutUser TousLesUtilisateurs={TousLesUtilisateurs} ProductAdded={ProductAdded} ClickAjout={ClickAjout} />}
                {SideOpen && (<SideBarMobile SideBarOpen={SideBarOpen} />)}
                <Sidebars />
                <div className="lg:pl-[17vw] pl-[4vw] pr-[2vw] w-full bg-topbar  shadow shadow-shadowBox md:h-20 h-14 lg:h-[4.5vw] flex justify-between  items-center z-30">
                    <MenuIcon className=" text-navbar md:w-[6vw] md:h-[5vw] lg:hidden" onClick={SideBarOpen} size={25} />
                    {isDark ? <Sun className="lg:!w-[1.5vw] md:w-[6vw] md:h-[5vw]  absolute md:left-24 left-14 lg:!h-[2.5vw] lg:hidden text-navbar cursor-pointer" onClick={LightMode} size={25} /> : <Moon className="lg:!w-[1.5vw] md:left-24  lg:!h-[2.5vw] md:w-[6vw] md:h-[5vw]  text-navbar absolute left-14 lg:hidden cursor-pointer" onClick={DarkMode} size={25} />}
                    <div className="flex absolute z-[9999] lg:relative items-center lg:top-0 top-[19vw] gap-[1vw]">
                        <h1 className="text-[1.4vw] hidden lg:flex text-navbar">Utilisateurs</h1>
                        <button className="lg:flex hidden text-[.8vw] gap-[.5vw] text-white bg-green-500 items-center p-[.2vw] rounded-[1vw] hover:bg-[#FFFF] hover:text-green-500 transition-colors " onClick={ClickAjout}>
                            <PlusCircle className="Logout hover:text-green-500" />
                            Ajouter un utilisateur
                        </button>
                        <button className="flex lg:hidden text-base md:absolute md:top-[-7vw] lg:text-[.8vw] gap-[.5vw] text-white bg-green-500 items-center p-[.2vw] rounded-[1vw] hover:bg-[#FFFF] hover:text-green-500 transition-colors " onClick={ClickAjout}>
                            <PlusCircle className="Logout md:w-[6vw] md:h-[5vw]  hover:text-green-500" />
                        </button>
                        {ModalConfirmOpen && <ConfirmationModal TousLesUtilisateurs={TousLesUtilisateurs} ClickDelete={ClickDelete} id={id} />}
                        {ModifierOpen && <ModalModifierUser User={User} ClickModifier={ClickModifier} TousLesUtilisateurs={TousLesUtilisateurs} id={id} />}
                    </div>
                    <div className="flex items-center gap-[.5vw]">
                        {isDark ? <Sun className="Usercircle text-navbar hidden lg:flex cursor-pointer" onClick={LightMode} /> : <Moon className="Usercircle hidden lg:flex text-navbar cursor-pointer" onClick={DarkMode} />}
                        <Notification />
                        <div className="flex items-center gap-[1vw] border-[.1vw] border-borderuser w-auto rounded-[2vw] px-[1vw]">
                            <img src={`http://localhost:8000/upload/users/${User ? User.photo : ""}`} className="lg:!w-[3vw] lg:!h-[3vw] w-[9vw] h-[9vw] rounded-full" alt="" />
                            <div>
                                <h1 className="text-navbar md:text-2xl">{User ? User.prenom : ""}</h1>
                                <span className="badge md:badge-lg  badge-xs badge-warning">Admin</span>
                            </div>
                            {modalOpen ? <ChevronUp className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <ChevronDown className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} />}
                            {/* <ChevronDown className="cursor-pointer" onClick={handleClick} /> */}
                            {modalOpen && <ModalUserDashboard User={User} ClickModifier={ClickModifier} TousLesUtilisateurs={TousLesUtilisateurs} id={id} />}
                        </div>
                    </div>
                </div>
                <div className="  ml-[25vw] md:top-[12vw] top-[18vw] absolute lg:relative lg:top-[-3.5vw] right-[88vw] lg:right-[7vw] h-8 lg:w-[20vw]">
                    <input type="search" className="lg:w-[20vw] md:text-xl md:h-16 ml-[25vw] absolute bg-navbar w-[60vw]  text-bgFah h-8 text-base lg:text-[1vw] bg-[#0f1520]! border-[.1vw]! rounded-xl border-[#ffffff60]! pr-[.5vw]!" placeholder="Rechecher un utilisateur..." onChange={(e) => handleSearch(e.target.value)} />
                    {/* <Search className="absolute Logout top-[.4vw] right-[-7vw] text-navbar " /> */}
                </div>
                <div className="flex items-center h-full! flex-col pl-[16vw] justify-center pt-[2vw]">
                    <div className="overflow-x rounded-box flex-1 shadow shadow-shadowBox mt-[2vw]!  w-[80vw] ">
                        <table className="table h-full!">
                            {/* head */}
                            <thead>
                                <tr className="border-none">
                                    <th className="text-Th">Nom</th>
                                    <th className="text-Th">Prénom</th>
                                    <th className="text-Th">Email</th>
                                    <th className="text-Th">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {UserToMap.map((user, index) => (
                                    <tr key={index} className="border-none">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={`http://localhost:8000/upload/users/${user.picture}`}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-Th">{user.lastname}</div>
                                                    <span className={user.email === "Administrateur@gmail.com" ? "badge badge-info badge-sm" : "badge badge-warning badge-sm"} >{user.email === "Administrateur@gmail.com" ? "admin" : "utilisateur"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-Th">
                                            {user.firstname}
                                        </td>
                                        <td className="text-Th">{user.email}</td>
                                        <td className=" w-[8vw] ">
                                            <div className="flex gap-4 items-center justify-center ">
                                                <button className=" text-white text-[1vw] rounded-[.5vw] p-[.2vw]">
                                                    <Trash2Icon className="Logout text-red-500" onClick={() => { ClickDelete(id), setId(user.id) }} />
                                                </button>
                                                {user.email === "Administrateur@gmail.com" ? (<button className="  text-white text-[1vw] p-[.2vw] rounded-[.5vw]   z-0" onClick={() => { setModifierOpen(!ModifierOpen), setId(user.id) }}>
                                                    <EditIcon className="Logout text-[#72039eee]" />
                                                </button>) : ""}
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
                    <div className=" flex gap-[1vw] pt-[1vw]">
                        <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? "opacity-25" : "opacity-100"}>
                            <SquareArrowLeftIcon className="Usercircle text-para" />
                        </button>
                        {PageNumber.map(nbrPage => (
                            <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="text-[1vw] text-para">{nbrPage}</button>
                        ))}
                        <button onClick={() => setPage(page + 1)} disabled={page === (PageNumber.length)} className={page === (PageNumber.length) ? "opacity-25" : "opacity-100"}>
                            <SquareArrowRightIcon className="Usercircle text-para" />
                        </button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default DashboardUsers;