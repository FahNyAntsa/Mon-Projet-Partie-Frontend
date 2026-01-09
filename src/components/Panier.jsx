import { ChevronDown, Star } from "lucide-react";
import NavigationBar from "./NavigationBar";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Produit from "./Produit";
import toast from "react-hot-toast";


function Panier() {
    const [modalOpen, setModalOpen] = useState(false)
    const [InputSearch, setInputSearch] = useState(false)
    const [Search, setSearch] = useState("")
    const [User, setUser] = useState()
    const InputFocusRef = useRef()
    const [Product, setProduct] = useState([])
    const [SelectedProduct, setSelectedProduct] = useState("")
    const [Prix, setPrix] = useState([])
    const [Quantity, setQuantity] = useState(1)
    const [status, setStatus] = useState([])
    const [isCommand, setIsCommand] = useState(false)
    const [PrixToCommand, setPrixToCommand] = useState("")
    const handleClick = () => {
        setModalOpen(true)
    }
    const handleSearchClick = () => {
        setInputSearch(true)
        console.log(InputSearch)
        InputFocusRef.current.focus()
    }
    const HandleSearch = (e) => {
        setSearch(e.target.value)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/Product`, { withCredentials: true })
            const ProduitId = response.data
            // setProduct(ProduitId)
            // console.log(ProduitId)
            setProduct(JSON.parse(localStorage.getItem("ProduitDansPanier")))
            // console.log(Product)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(JSON.parse(localStorage.getItem("ProduitDansPanier")))
    const Commander = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/Product`, { id }, { withCredentials: true })
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    }
    const fetchDrumData = async () => {
        try {
            const data = await axios.get("http://localhost:8000/Drum", { withCredentials: true })
            setUser(data.data.User)
            // console.log(User)
            // console.log(data.data.User)
            if (data.data.status === 405) {
                navigate("/Login")
            }
        } catch (error) {
            console.log(err)
        }
    }
    const fetchCommand = async () => {
        try {
            const response = await axios.get("http://localhost:8000/Product", { withCredentials: true })
            // console.log(response.data)
            setStatus(response.data)
            // console.log(status)
        } catch (error) {
            console.log(error)
        }
    }
    const CancelCommand = (id) => {
        // localStorage.removeItem()
        const Item = JSON.parse(localStorage.getItem("ProduitDansPanier"))
        const newTab = Item.filter((i, index) => i.id != id)
        localStorage.setItem("ProduitDansPanier", JSON.stringify(newTab))
        // console.log(id)
        setProduct(newTab)

    }
    let Total = 0
    if (localStorage.getItem("ProduitDansPanier")) {
        Total = Product.reduce((a, b) => a + b.Price, 0)
        const Price = Product.map(a => a.price)
        // console.log(Total)
        const TotalePrice = Total
        localStorage.setItem("Prix", JSON.stringify(Price))
    }
    // console.log(Price)
    const Vprix = JSON.parse(localStorage.getItem("Prix"))
    useEffect(() => {
        fetchData()
        fetchDrumData()
        setProduct(JSON.parse(localStorage.getItem("ProduitDansPanier")))
        fetchCommand()
    }, [])
    const Payer = (e, Prix, SelectedProduct) => {
        e.preventDefault()

        if (PrixToCommand < Prix) {
            toast.error("Montant insuffisant")
            return
        } else {
            setPrix(SelectedProduct.price), Commander(SelectedProduct.id), setIsCommand(true), CancelCommand(SelectedProduct.id), fetchCommand()
            document.getElementById('my_modal_3').close()
        }

        console.log(Prix)

    }
    // console.log(status.length)
    // console.log(User)
    return (
        <>
            <NavigationBar
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleClick={handleClick}
                handleSearchClick={handleSearchClick}
                InputSearch={InputSearch}
                setSearch={setSearch}
                HandleSearch={HandleSearch}
                Search={Search}
                User={User}
                InputFocusRef={InputFocusRef}
                setInputSearch={setInputSearch}
                status={status}

            />
            <section className="h-auto w-full px-[4vw] pt-[8vw] flex flex-col gap-[3vw]">
                <h1 className="text-cyan-700 text-5xl text-center top-[4vw] left-[39vw] font-bold">Vos commandes</h1>
                <div className="overflow-x rounded-box bg-[#171c27] border h-auto border-base-content/8 w-full">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localStorage.getItem("ProduitDansPanier") && (localStorage.getItem("ProduitDansPanier") ? (Product.map((p, index) => (
                                <tr key={index}>
                                    <td className=" w-[35vw] align-middle">
                                        <div className="flex items-center w-full justify-center gap-[2vw] h-[8vw]gap-[5vw]">
                                            <div className=" w-[10vw] h-[7vw]  rounded-[.5vw] overflow-hidden bg-blue-500 ">
                                                <img src={`../src/assets/images/${p.pics} `} className="w-full h-full" alt="" />
                                            </div>
                                            <div className="flex flex-col gap-1 flex-1">
                                                <h1>{p.name}</h1>
                                                <p className="text-[.8vw] Description">{p.describes}</p>
                                                <div className="flex gap-1">
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{p.Price.toLocaleString("fr-FR")} ariary</td>
                                    <td>
                                        {/* <input type="number" className="w-[7vw]! text-[.9vw] text-black p-[1vw]!" min={1} defaultValue={1} placeholder="Entrez..." onChange={(e) => setQuantity(e.target.value)} /> */}
                                        1
                                    </td>
                                    <td>
                                        <span className="badge badge-warning">
                                            En attente
                                        </span>
                                    </td>
                                    <td className=" w-[8vw] ">
                                        <div className="flex gap-4 items-center justify-center ">
                                            <button className="bg-red-400 text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]" onClick={() => CancelCommand(p.id)}>Annuler</button>
                                            <button className=" bg-[#1ace1aee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]" onClick={() => { document.getElementById('my_modal_3').showModal(), console.log(p.name), setSelectedProduct(p) }}>commander</button>
                                            {/* <button className=" bg-[#1ace1aee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]">{isCommand ? status.map(stat => stat.status) : "commander"}</button> */}
                                        </div>
                                    </td>
                                </tr>

                            ))) : "")}
                            {(status.map((p, index) => (
                                <tr key={index}>
                                    <td className=" w-[35vw] align-middle">
                                        <div className="flex items-center w-full justify-center gap-[2vw] h-[8vw]gap-[5vw]">
                                            <div className=" w-[10vw] h-[7vw]  rounded-[.5vw] overflow-hidden bg-blue-500 ">
                                                <img src={`../src/assets/images/${p.pics} `} className="w-full h-full" alt="" />
                                            </div>
                                            <div className="flex flex-col gap-1 flex-1">
                                                <h1>{p.name}</h1>
                                                <p className="text-[.8vw] Description">{p.describes}</p>
                                                <div className="flex gap-1">
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                    <Star className="Star" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{p.price.toLocaleString("fr-FR")} ariary</td>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <span className="badge badge-info">{p.status}</span>
                                    </td>
                                    <td className=" w-[8vw] ">
                                        <div className="flex gap-4 items-center justify-center ">
                                            <button className="bg-red-400 text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw] opacity-50" disabled>Annuler</button>
                                            <button className=" bg-[#1ace1aee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw] opacity-50" disabled onClick={() => { document.getElementById('my_modal_3').showModal(), console.log(p.name), Commander(p.id), setSelectedProduct(p) }}>Commander</button>
                                        </div>
                                    </td>
                                </tr>

                            )))}
                            {localStorage.getItem("ProduitDansPanier") ? (
                                <tr>
                                    <th colSpan={5} className="text-center">Total : {Total.toLocaleString("fr-FR")}  ariary</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th colSpan={5} className="text-center">Total : 0 ariary</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box w-[30vw]! h-[13vw]">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setPrixToCommand("")}>x</button>
                            </form>
                            {SelectedProduct && (
                                <form action="" className="flex flex-col gap-[.8vw]" onSubmit={(e) => e.preventDefault()}>
                                    <label htmlFor="Prix" className="text-cyan-700! text-center underline text-[1.5vw]!">Montant</label>
                                    <div className="flex gap-[1vw] items-center mb-[1vw]! text-[1vw]">
                                        <input type="number" id="Prix" placeholder="Entrez le montant à payer" className="w-[18vw]! text-black text-[1vw] px-[1vw]!" onChange={(e) => setPrixToCommand(e.target.value)} value={PrixToCommand} required />
                                        (en Ariary)
                                    </div>
                                    <button className=" bg-[#1ace1aee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]" onClick={(e) => { Payer(e, SelectedProduct.Price, SelectedProduct), fetchCommand() }}>Payer</button>
                                </form>
                            )}
                        </div>
                    </dialog>
                </div>
                {/* <ChevronDown /> */}
            </section>

        </>
    )
}

export default Panier;