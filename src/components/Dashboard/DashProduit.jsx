import axios from "axios";
import { BellIcon, ChevronDown, ChevronUp, EditIcon, LayoutDashboard, Moon, PlusCircle, Search, SquareArrowLeftIcon, SquareArrowRightIcon, Star, Store, Sun, Trash2Icon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import Charts from "./Charts";
import ChartsArea from "./ChartsArea";
import ModalAjoutPanier from "./ModalAjoutPanier";
import ModalDeConfirmation from "./ModalDeConfirmation";
import Notification from "./Notification";
import Sidebars from "./Sidebars";

function DashProduit() {
    const path = window.location.pathname
    // console.log(path)
    const [modalOpen, setModalOpen] = useState(false)
    const [ModalConfirmOpen, setModalConfirmOpen] = useState(false)
    const [User, setUser] = useState()
    const [DataProducts, setDataProducts] = useState([])
    const [page, setPage] = useState(1)
    const [AjoutOpen, setAjoutOpen] = useState(false)
    const [NombreTotalDePage, setNombreTotalDePage] = useState([])
    const [ProduitToUpdate, setProduitToUpdate] = useState([])
    const [Nom, setNom] = useState("")
    const [Prix, setPrix] = useState(0)
    const [describes, setDescribes] = useState("")
    const [id, setId] = useState(0)
    const [UpdateCategory, setUpdateCategory] = useState("")
    const navigate = useNavigate()
    const [isDark, setIsDark] = useState(false)
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
    const ClickAjout = () => {
        setAjoutOpen(!AjoutOpen)
    }
    const ClickDelete = () => {
        setModalConfirmOpen(!ModalConfirmOpen)
        // setId(Produit.id)
    }
    const handleSearch = async (value) => {
        try {
            // setUserSearch(value)
            // console.log(UserSearch)
            const URL = `http://localhost:8000/ProductSearch?value=${value}`
            const data = await axios.get(URL, { withCredentials: true })
            // console.log(data.data)
            if (value === "") {
                TousLesProduits()
            }
            setDataProducts(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const Data = {
                prix: Prix,
                describes,
                id,
                category: UpdateCategory,
                name: Nom
            }
            const response = await axios.put("http://localhost:8000/UpdateProduct", Data, { withCredentials: true })
            // console.log(response.data)
            if (response.data.status === 200) {
                document.getElementById('my_modal_3').close()
                TousLesProduits()
            }
        } catch (error) {
            console.log(error)
        }
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
            // console.log(response.data)
            setDataProducts(response.data.responseSql)
            setNombreTotalDePage(response.data.NombreDePage)
        } catch (error) {
            console.log(error)
        }
    }
    const ProductAdded = (produit) => {
        setDataProducts(prev => [produit, ...prev])
    }
    const UpdateProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/Product/${id}`, { withCredentials: true })
            // console.log(response.data.response[0])
            setProduitToUpdate(response.data.response[0])
            setPrix(response.data.response[0].Price)
            setUpdateCategory(response.data.response[0].category)
            setDescribes(response.data.response[0].describes)
            setNom(response.data.response[0].name)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDrumData()
        TousLesProduits()
    }, [page])
    const PageNumber = Array.from({ length: NombreTotalDePage }, (_, index) => index + 1)
    return (
        <>
            <section className="relative bg-bgFah h-screen" id="">
                <Sidebars/>
                <div className="pl-[17vw] pr-[2vw] w-full bg-topbar h-[4.5vw] flex justify-between items-center z-30 shadow shadow-shadowBox">
                    <div className="flex items-center gap-[1vw]">
                        <h1 className="text-[1.4vw] text-navbar">Produits</h1>
                        <button className="flex text-[.8vw] gap-[.5vw] text-white bg-green-500 items-center p-[.2vw] rounded-[1vw] hover:bg-[#FFFF] hover:text-green-500 transition-colors " onClick={ClickAjout}>
                            <PlusCircle className="Logout hover:text-green-500" />
                            Ajouter un produit
                        </button>
                        {AjoutOpen && <ModalAjoutPanier ProductAdded={ProductAdded} ClickAjout={ClickAjout} />}
                        {ModalConfirmOpen && <ModalDeConfirmation TousLesProduits={TousLesProduits} ClickDelete={ClickDelete} id={id} />}
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
                <div className="  ml-[25vw] relative top-[-3.5vw] right-[7vw] w-[20vw]">
                    <input type="search" className="w-[20vw]! ml-[25vw] absolute bg-bgFah  text-navbar text-[1vw] bg-[#0f1520]! border-[.1vw]! border-[#ffffff60]! pr-[.5vw]!" placeholder="Rechecher un produit..." onChange={(e) => handleSearch(e.target.value)} />
                    <Search className="absolute Logout top-[.4vw] right-[-7vw] text-navbar " />
                </div>
                <div className="flex  justify-center pt-[2vw] -z-20">
                    <div className="overflow-x rounded-box ml-[14vw] shadow shadow-shadowBox bg-bgFah  h-auto border-base-content/8 w-[80vw] ">
                        <table className="table">
                            <thead>
                                <tr className="border-none">
                                    <th className="text-Th">Nom</th>
                                    <th className="text-Th">Prix</th>
                                    <th className="text-Th">Image</th>
                                    <th className="text-Th !z-20">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(DataProducts.map((p, index) => (
                                    <tr key={index} className="border-none">
                                        <td className=" w-[20vw] align-middle text-Th">
                                            {p.name}
                                        </td>
                                        <td className="text-para">{p.Price.toLocaleString('fr-FR')} ariary</td>
                                        <td>
                                            <div className=" w-[8vw] h-[5vw]  rounded-[.5vw] overflow-hidden bg-blue-500 shadow shadow-shadow ">
                                                {/* <img src={`../src/assets/images/${p.pics} `} className="w-full h-full" alt="" /> */}
                                                <img src={`http://localhost:8000/upload/products/${p.pics} `} className="w-full h-full" alt="" />
                                            </div>
                                        </td>
                                        <td className=" w-[8vw] ">
                                            <div className="flex gap-4 items-center justify-center ">
                                                <button className=" text-white text-[1vw] rounded-[.5vw] p-[.2vw]">
                                                    <Trash2Icon className="Logout text-red-500" onClick={() => { ClickDelete(id), setId(p.id) }} />
                                                </button>

                                                <button className="  text-white text-[1vw] p-[.2vw] rounded-[.5vw]   z-0" onClick={() => { document.getElementById('my_modal_3').showModal(), UpdateProduct(p.id), setId(p.id), document.body.style.overflow = "hidden" }}>
                                                    <EditIcon className="Logout text-[#72039eee]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                )))}
                            </tbody>
                        </table>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box w-[30vw]! h-[35vw] bg-white!">
                                <h1 className="text-[#070b2b] text-[1.2vw] text-center underline">Modifier le produit</h1>
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle hover:text-white text-black btn-ghost absolute right-2 top-2">x</button>
                                </form>
                                <form action="" className="flex flex-col gap-[.8vw]" onSubmit={handleUpdate}>
                                    <label htmlFor="nom" className="text-[#070b2b] underline">Nom</label>
                                    <input type="text" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="nom" name="nom" value={Nom} onChange={(e) => setNom(e.target.value)} />
                                    <label htmlFor="prix" className="text-[#070b2b] underline">Prix</label>
                                    <input type="number" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="prix" name="price" value={Prix} onChange={(e) => setPrix(e.target.value)} />
                                    <label htmlFor="describes" className="text-[#070b2b] underline">Description</label>
                                    <textarea name="describes" id="" className="text-white bg-[#070b2b]! rounded-[.5vw] text-[1vw] px-[1vw]" value={describes} rows={4} onChange={(e) => setDescribes(e.target.value)}></textarea>
                                    <label htmlFor="category" className="text-[#070b2b] underline">Catégorie</label>
                                    <select name="category" className="text-white bg-[#070b2b]! rounded-[.5vw] text-[1vw] p-[.5vw]" value={UpdateCategory} id="category" onChange={(e) => setUpdateCategory(e.target.value)}>
                                        <option value="drum" className="text-white text-[1vw]">drum</option>
                                        <option value="accessoriesOne" className="text-white text-[1vw]">accessoriesOne</option>
                                        <option value="accessoriesTwo" className="text-white text-[1vw]">accessoriesTwo</option>
                                    </select>
                                    <button className=" mt-[1.5vw]! bg-[#600385ee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]">Modifier</button>
                                </form>
                            </div>
                        </dialog>
                    </div>
                </div>
                <div className="pl-[43vw] flex gap-[1vw] pt-[1vw]">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowLeftIcon className="Usercircle text-para" />
                    </button>
                    {PageNumber.map(nbrPage => (
                        <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="text-[1vw] text-para">{nbrPage}</button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === 12} className={page === 12 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowRightIcon className="Usercircle text-para" />
                    </button>
                </div>
            </section>
        </>
    )
}

export default DashProduit;