import { BellIcon, ChevronDown, ChevronUp, EditIcon, LayoutDashboard, PlusCircle, Search, SquareArrowLeftIcon, SquareArrowRightIcon, Store, Trash2Icon, TrendingUpIcon, UsersIcon } from "lucide-react";
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ModalAjoutUser from "./ModalAjoutUser";
import ModalModifierUser from "./ModalModifierUsers";
import ConfirmationModal from "./ConfirmationModal";
import Notification from "./Notification";



function DashboardUsers() {
    const path = window.location.pathname
    const [modalOpen, setModalOpen] = useState(false)
    const [AjoutOpen, setAjoutOpen] = useState(false)
    const [ModalConfirmOpen, setModalConfirmOpen] = useState(false)
    const [User, setUser] = useState()
    const [page, setPage] = useState(1)
    const [TotalPage, setTotalPage] = useState([])
    const [ModifierOpen, setModifierOpen] = useState(false)
    const [id, setId] = useState(0)

    const [UserSearch, setUserSearch] = useState("")
    const [UserToMap, setUserToMap] = useState([])

    const handleClick = () => {
        setModalOpen(true)
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
            <section className="relative">

                <div className="w-[15vw] min-h-dvh bg-[#192336] absolute pt-[2vw] z-100 flex flex-col gap-[3vw] ">
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
                        <button className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-amber-600 hover:border-0 DIV transition-colors w-full cursor-pointer ${path === "/DashboardUsers" ? "bg-amber-600 text-white" : ""}`}>
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
                <div className="pl-[17vw] pr-[2vw]  w-full bg-[#0f1520] h-[4.5vw] flex justify-between items-center z-30">
                    <div className="flex items-center gap-[1vw]">
                        <h1 className="text-[1.4vw]">Utilisateurs</h1>
                        <button className="flex text-[.8vw] gap-[.5vw] text-white bg-green-500 items-center p-[.2vw] rounded-[1vw] hover:bg-[#FFFF] hover:text-green-500 transition-colors " onClick={ClickAjout}>
                            <PlusCircle className="Logout hover:text-green-500" />
                            Ajouter un utilisateur
                        </button>
                        {AjoutOpen && <ModalAjoutUser TousLesUtilisateurs={TousLesUtilisateurs} ProductAdded={ProductAdded} ClickAjout={ClickAjout} />}
                        {ModalConfirmOpen && <ConfirmationModal TousLesUtilisateurs={TousLesUtilisateurs} ClickDelete={ClickDelete} id={id} />}
                        {ModifierOpen && <ModalModifierUser TousLesUtilisateurs={TousLesUtilisateurs} id={id} ClickModifier={ClickModifier} />}
                    </div>
                    <div className="flex items-center gap-[1vw]">
                        <Notification/>
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
                <div className="  ml-[25vw]! absolute top-[1vw] right-[32vw] w-[20vw]">
                    <input type="search" className="w-[20vw]! ml-[25vw] absolute  text-white text-[1vw] bg-[#0f1520]! border-[.1vw]! border-[#ffffff60]! pr-[.5vw]!" placeholder="Rechecher un utilisateur..." onChange={(e) => handleSearch(e.target.value)} />
                    <Search className="absolute Logout top-[.3vw] left-[.5vw]" />
                </div>
                <div className="flex items-center h-full! flex-col pl-[16vw] justify-center pt-[2vw]">
                    <div className="overflow-x rounded-box flex-1 border mt-[2vw]!  border-base-content/8 w-[80vw] ">
                        <table className="table h-full!">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {UserToMap.map((user, index) => (
                                    <tr key={index}>
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
                                                    <div className="">{user.lastname}</div>
                                                    <span className={user.email === "Administrateur@gmail.com" ? "badge badge-info badge-sm" : "badge badge-warning badge-sm"} >{user.email === "Administrateur@gmail.com" ? "admin" : "utilisateur"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.firstname}
                                        </td>
                                        <td>{user.email}</td>
                                        <td className=" w-[8vw] ">
                                            <div className="flex gap-4 items-center justify-center ">
                                                <button className=" text-white text-[1vw] rounded-[.5vw] p-[.2vw]">
                                                    <Trash2Icon className="Logout text-red-500" onClick={() => { ClickDelete(id),setId(user.id) }} />
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
                            <SquareArrowLeftIcon className="Usercircle" />
                        </button>
                        {PageNumber.map(nbrPage => (
                            <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="text-[1vw]">{nbrPage}</button>
                        ))}
                        <button onClick={() => setPage(page + 1)} disabled={page === (PageNumber.length)} className={page === (PageNumber.length) ? "opacity-25" : "opacity-100"}>
                            <SquareArrowRightIcon className="Usercircle" />
                        </button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default DashboardUsers;