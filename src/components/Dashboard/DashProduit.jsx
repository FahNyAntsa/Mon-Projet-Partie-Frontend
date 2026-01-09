import axios from "axios";
import { BellIcon, ChevronDown, ChevronUp, EditIcon, LayoutDashboard, PlusCircle, SquareArrowLeftIcon, SquareArrowRightIcon, Star, Store, Trash2Icon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import Charts from "./Charts";
import ChartsArea from "./ChartsArea";
import ModalAjoutPanier from "./ModalAjoutPanier";

function DashProduit() {
    const path = window.location.pathname
    // console.log(path)
    const [modalOpen, setModalOpen] = useState(false)
    const [User, setUser] = useState()
    const [DataProducts, setDataProducts] = useState([])
    const [page, setPage] = useState(1)
    const [AjoutOpen,setAjoutOpen] = useState(false)
    const [NombreTotalDePage, setNombreTotalDePage] = useState([])
    const [ProduitToUpdate, setProduitToUpdate] = useState([])
    const [Prix, setPrix] = useState(0)

    const navigate = useNavigate()
    const handleClick = () => {
        setModalOpen(true)
    }
    const handleClickX = () => {
        setModalOpen(false)
    }
    const ClickAjout=()=>{
        setAjoutOpen(!AjoutOpen)
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
            const response = await axios.get(`http://localhost:8000/AllProducts?page=${page}&limit=5`, { withCredentials: true })
            console.log(response.data)
            setDataProducts(response.data.responseSql)
            setNombreTotalDePage(response.data.NombreDePage)
        } catch (error) {
            console.log(error)
        }
    }
    const UpdateProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/Product/${id}`, { withCredentials: true })
            // console.log(response.data.response[0])
            setProduitToUpdate(response.data.response[0])
            setPrix(response.data.response[0].Price)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDrumData()
        TousLesProduits()
    }, [page])
    const Page = Array.from({ length: NombreTotalDePage }, (_, index) => index + 1)
    return (
        <>
            <section className="relative" id="">
                <div className="w-[15vw] h-screen bg-[#192336] absolute pt-[2vw] flex flex-col gap-[3vw] ">
                    <div className="w-[10vw] h-[10vw] bg-[#FFFF] ml-[2.3vw]! rounded-full">
                        <img src="../src/assets/unnamed-removebg-preview.png" className=" w-full object-cover  h-[10vw] rounded-full" alt="" />
                    </div>
                    <div className="flex flex-col gap-[1vw] px-[1vw]">
                        <div className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-red-500 hover:border-0 DIV cursor-pointer`}>
                            <LayoutDashboard className="Logout" />
                            <Link className="text-[1.1vw]!" to={"/Dashboard"}>Tableau de bord</Link>
                        </div>
                        <hr />
                        <div className={`flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-blue-500 hover:border-0 DIV cursor-pointer ${path === "/DashProduit" ? "bg-blue-500" : ""}`}>
                            <Store className="Logout" />
                            <Link className="text-[1.1vw]!">Produits</Link>
                        </div>
                        <hr />
                        <div className=" flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-amber-600 hover:border-0 DIV cursor-pointer">
                            <UsersIcon className="Logout" />
                            <Link className="text-[1.1vw]!">Utilisateurs</Link>
                        </div>
                        <hr />
                        <div className=" flex  justify-start gap-[1vw] items-center h-[2.8vw]  border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-green-600 hover:border-0 DIV cursor-pointer">
                            <TrendingUpIcon className="Logout" />
                            <Link className="text-[1.1vw]!">Revenus</Link>
                        </div>
                    </div>

                </div>
                <div className="pl-[17vw] pr-[2vw] w-full bg-[#0f1520] h-[4.5vw] flex justify-between items-center z-30">
                    <div className="flex items-center gap-[1vw]">
                        <h1 className="text-[1.4vw]">Produits</h1>
                        <button className="flex text-[.8vw] gap-[.5vw] text-white bg-green-500 items-center p-[.2vw] rounded-[1vw]" onClick={ClickAjout}>
                            <PlusCircle className="Logout" />
                            Ajouter un produit
                        </button>
                        {AjoutOpen && <ModalAjoutPanier ClickAjout={ClickAjout}/>}
                    </div>
                    <div className="flex items-center gap-[1vw]">
                        <div className="indicator">
                            <span className="indicator-item badge badge-xs badge-error">2</span>
                            <BellIcon />
                        </div>
                        <div className="flex items-center gap-[1vw] border-[.1vw] border-[#ffffff2f] w-auto rounded-[2vw] px-[1vw]">
                            <img src="../src/assets/zoky-lunette.png" className="w-[3vw] h-[3vw] rounded-full" alt="" />
                            <div>
                                <h1>Admin</h1>
                                <span className="badge badge-xs badge-warning">Admin</span>
                            </div>
                            {modalOpen ? <ChevronUp className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <ChevronDown className="text-white Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} />}
                            {/* <ChevronDown className="cursor-pointer" onClick={handleClick} /> */}
                            {modalOpen && <ModalUserDashboard User={User} />}
                        </div>
                    </div>
                </div>
                <div className="flex items-center pl-[16vw] justify-center pt-[2vw]">
                    <div className="overflow-x rounded-box bg-[#171c27] border h-auto border-base-content/8 w-[60vw] ml-[24vw]">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prix</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(DataProducts.map((p, index) => (
                                    <tr key={index}>
                                        <td className=" w-[20vw] align-middle">
                                            {p.name}
                                        </td>
                                        <td>{p.Price.toLocaleString('fr-FR')} ariary</td>

                                        <td>
                                            <div className=" w-[8vw] h-[5vw]  rounded-[.5vw] overflow-hidden bg-blue-500 ">
                                                <img src={`../src/assets/images/${p.pics} `} className="w-full h-full" alt="" />
                                            </div>
                                        </td>
                                        <td className=" w-[8vw] ">
                                            <div className="flex gap-4 items-center justify-center ">
                                                <button className=" text-white text-[1vw] rounded-[.5vw] p-[.2vw]">
                                                    <Trash2Icon className="Logout text-red-500" />
                                                </button>
                                                <button className="  text-white text-[1vw] p-[.2vw] rounded-[.5vw]   z-0" onClick={() => { document.getElementById('my_modal_3').showModal(), UpdateProduct(p.id) }}>
                                                    <EditIcon className="Logout text-[#72039eee]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                )))}
                            </tbody>
                        </table>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box w-[30vw]! h-[23vw]">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">x</button>
                                </form>

                                <form action="" className="flex flex-col gap-[.8vw]" onSubmit={(e) => e.preventDefault()}>
                                    <label htmlFor="prix" className="text-white! underline">Prix</label>
                                    <input type="number" className="text-black text-[1vw] px-[1vw]!" id="prix" defaultValue={ProduitToUpdate.Price} />
                                    <label htmlFor="describes" className="text-white! underline">Description</label>
                                    <textarea name="" id="" className="bg-white rounded-[.5vw] text-black text-[1vw] px-[1vw]" defaultValue={ProduitToUpdate.describes} rows={4}></textarea>
                                    <button className=" mt-[1.5vw]! bg-[#600385ee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]">Modifier</button>
                                </form>

                            </div>
                        </dialog>
                    </div>
                </div>
                <div className="pl-[47vw] flex gap-[1vw] pt-[1vw]">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowLeftIcon className="Usercircle" />
                    </button>
                    {Page.map(nbrPage => (
                        <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="text-[1vw]">{nbrPage}</button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === 12} className={page === 12 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowRightIcon className="Usercircle" />
                    </button>
                </div>
            </section>
        </>
    )
}

export default DashProduit;