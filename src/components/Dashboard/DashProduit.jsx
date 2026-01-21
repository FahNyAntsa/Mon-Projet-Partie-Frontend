import axios from "axios";
import { BellIcon, ChevronDown, ChevronUp, EditIcon, LayoutDashboard, MenuIcon, Moon, PlusCircle, Search, SquareArrowLeftIcon, SquareArrowRightIcon, Star, Store, Sun, Trash2Icon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ModalUserDashboard from "./ModalUserDashboard";
import { data, Link, useNavigate } from "react-router-dom";
import Charts from "./Charts";
import ChartsArea from "./ChartsArea";
import ModalAjoutPanier from "./ModalAjoutPanier";
import ModalDeConfirmation from "./ModalDeConfirmation";
import Notification from "./Notification";
import Sidebars from "./Sidebars";
import SideBarMobile from "./SideBarMobile";

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
    const [SideOpen, setSideOpen] = useState(false)
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
            <section className="relative bg-bgFah h-[110%] lg:!h-screen" id="">
                {AjoutOpen && <ModalAjoutPanier ProductAdded={ProductAdded} ClickAjout={ClickAjout} />}
                {SideOpen && (<SideBarMobile SideBarOpen={SideBarOpen} />)}
                <Sidebars />
                <div className="lg:pl-[17vw] pl-[4vw] pr-[2vw] w-full bg-topbar  shadow shadow-shadowBox md:h-20 h-14 lg:h-[4.5vw] flex justify-between  items-center z-30">
                    <MenuIcon className=" text-navbar md:w-[6vw] md:h-[5vw] lg:hidden" onClick={SideBarOpen} size={25} />
                    {isDark ? <Sun className="lg:!w-[1.5vw] md:w-[6vw] md:h-[5vw]  absolute md:left-24 left-14 lg:!h-[2.5vw] lg:hidden text-navbar cursor-pointer" onClick={LightMode} size={25} /> : <Moon className="lg:!w-[1.5vw] md:left-24  lg:!h-[2.5vw] md:w-[6vw] md:h-[5vw]  text-navbar absolute left-14 lg:hidden cursor-pointer" onClick={DarkMode} size={25} />}
                    <div className="flex absolute z-[9999] lg:relative items-center lg:top-0 top-[19vw] gap-[1vw]">
                        <h1 className="text-[1.4vw] hidden lg:flex text-navbar">Produits</h1>
                        <button className="lg:flex hidden text-[.8vw] gap-[.5vw] text-white bg-green-500 items-center p-[.2vw] rounded-[1vw] hover:bg-[#FFFF] hover:text-green-500 transition-colors " onClick={ClickAjout}>
                            <PlusCircle className="Logout hover:text-green-500" />
                            Ajouter un produit
                        </button>
                        <button className="flex lg:hidden text-base md:absolute md:top-[-7vw] lg:text-[.8vw] gap-[.5vw] text-white bg-green-500 items-center p-[.2vw] rounded-[1vw] hover:bg-[#FFFF] hover:text-green-500 transition-colors " onClick={ClickAjout}>
                            <PlusCircle className="Logout md:w-[6vw] md:h-[5vw]  hover:text-green-500" />
                        </button>
                        {ModalConfirmOpen && <ModalDeConfirmation TousLesProduits={TousLesProduits} ClickDelete={ClickDelete} id={id} />}
                    </div>
                    <div className="flex items-center gap-[.5vw]">
                        {isDark ? <Sun className="Usercircle text-navbar hidden lg:flex cursor-pointer" onClick={LightMode} /> : <Moon className="Usercircle hidden lg:flex text-navbar cursor-pointer" onClick={DarkMode} />}
                        <Notification />
                        <div className="flex items-center gap-[1vw] border-[.1vw] border-borderuser w-auto rounded-[2vw] px-[1vw]">
                            <img src={`http://localhost:8000/upload/users/${User ? User.photo : ""}`} className="lg:!w-[3vw] lg:!h-[3vw] w-[9vw] h-[9vw] rounded-full" alt="" />
                            <div>
                                <h1 className="text-navbar lg:text-base md:text-2xl ">{User ? User.prenom : ""}</h1>
                                <span className="badge badge-xs lg:badge-xs md:badge-lg badge-warning">Admin</span>
                            </div>
                            {modalOpen ? <ChevronUp className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClickX} /> : <ChevronDown className="text-navbar Usercircle cursor-pointer" id={modalOpen ? "active" : ""} onClick={handleClick} />}
                            {/* <ChevronDown className="cursor-pointer" onClick={handleClick} /> */}
                            {modalOpen && <ModalUserDashboard User={User} />}
                        </div>
                    </div>
                </div>
                <div className="  ml-[25vw] md:top-[12vw] top-[18vw] absolute lg:relative lg:top-[-3.5vw] right-[88vw] lg:right-[7vw] h-8 lg:w-[20vw]">
                    <input type="search" className="lg:w-[20vw] lg:h-8 md:text-xl md:h-16 ml-[25vw] absolute bg-navbar w-[60vw]  text-bgFah h-8 text-base lg:text-[1vw] bg-[#0f1520]! border-[.1vw]! rounded-xl border-[#ffffff60]! pr-[.5vw]!" placeholder="Rechecher un produit..." onChange={(e) => handleSearch(e.target.value)} />
                    {/* <Search className="absolute Logout md:top-[2.3vw] top-[.8vw] lg:hidden lg:top-[.4vw] lg:!right-[-7vw] left-[78vw] text-bgFah  w-[5vw]" /> */}
                </div>
                <div className="flex flex-col lg:flex-row lg:!mt-0 md:mt-[8vw] mt-[12vw] justify-center  -z-20">
                    <h1 className="text-[5vw] text-center underline lg:hidden text-navbar">Produits</h1>
                    <div className="overflow-x hidden lg:block rounded-box ml-[14vw] shadow shadow-shadowBox bg-bgFah  h-auto border-base-content/8 w-[80vw] ">
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
                    {/* Mobile */}
                    <div className="w-full h-auto px-4 lg:hidden flex flex-col gap-4">
                        {(DataProducts.map((p, index) => (
                            <div className="flex w-full
                             h-auto flex-col p-6 bg-bgFah rounded-xl shadow shadow-shadowBox gap-2" key={index} >
                                <div className="flex justify-between">
                                    <div>
                                        <h1 className="text-Th md:text-2xl text-lg"> {p.name}</h1>
                                        <span className="text-para md:text-xl text-base">{p.Price.toLocaleString('fr-FR')} ariary</span>
                                    </div>
                                    <div className=" w-[16vw] h-[12vw]  rounded-[.5vw] overflow-hidden bg-blue-500 shadow shadow-shadow ">
                                        {/* <img src={`../src/assets/images/${p.pics} `} className="w-full h-full" alt="" /> */}
                                        <img src={`http://localhost:8000/upload/products/${p.pics} `} className="w-full h-full" alt="" />
                                    </div>
                                </div>
                                {/* <hr /> */}
                                <div className="flex gap-4 items-center justify-center ">
                                    <button className=" text-white text-[1vw] rounded-[.5vw] p-[.2vw]">
                                        <Trash2Icon className=" text-red-500 md:w-[5vw] md:h-[4vw]" onClick={() => { ClickDelete(id), setId(p.id) }} size={23}/>
                                    </button>
                                    <button className="  text-white text-[1vw] p-[.2vw] rounded-[.5vw]   z-0" onClick={() => { document.getElementById('my_modal_3').showModal(), UpdateProduct(p.id), setId(p.id), document.body.style.overflow = "hidden" }}>
                                        <EditIcon className="Logout text-[#72039eee] md:w-[5vw] md:h-[4vw]" size={23}/>
                                    </button>
                                </div>
                            </div>
                        )))}
                    </div>
                    {/* Mobile fin */}
                </div>
                <div className="lg:!pl-[43vw] pl-[13vw] md:pl-[21vw] flex gap-[2vw] lg:gap-[1vw] md mt-[5vw] lg:mt-0">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowLeftIcon className="lg:w-[1.5vw] text-para md:w-[5vw] md:h-[4vw]" size={23} />
                    </button>
                    {PageNumber.map(nbrPage => (
                        <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="lg:text-[1vw] text-para md:text-xl text-base">{nbrPage}</button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === 12} className={page === 12 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowRightIcon className="lg:w-[1.5vw] text-para md:w-[5vw] md:h-[4vw]" />
                    </button>
                </div>
                <div className="md:block hidden lg:hidden h-8"></div>
            </section>
        </>
    )
}

export default DashProduit;