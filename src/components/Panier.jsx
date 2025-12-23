import { ChevronDown, Star } from "lucide-react";
import NavigationBar from "./NavigationBar";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Produit from "./Produit";


function Panier() {
    const [modalOpen, setModalOpen] = useState(false)
    const [InputSearch, setInputSearch] = useState(false)
    const [Search, setSearch] = useState("")
    const [User, setUser] = useState()
    const InputFocusRef = useRef()
    const [Product, setProduct] = useState([])
    const [Prix, setPrix] = useState([])
    const [Quantity, setQuantity] = useState(1)
    const [status, setStatus] = useState()
    const [isCommand, setIsCommand] = useState(false)
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
            console.log(Product)
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
    // const CancelCommand= async(id)=>{
    //     try {
    //         const response = await axios.delete(`http://localhost:8000/Product/${id}`,{withCredentials:true})
    //         console.log(response.data)
    //         fetchData()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localStorage.getItem("ProduitDansPanier") ? (Product.map((p, index) => (
                                <tr key={index}>
                                    <td className="flex items-center gap-[5vw] w-[35vw]">
                                        <img src={`../src/assets/images/${p.pics} `} className="w-[12vw] h-[8vw] rounded-[.5vw]" alt="" />
                                        <div className="flex flex-col gap-1">
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
                                    </td>
                                    <td>{p.Price.toLocaleString("fr-FR")} ariary</td>
                                    <td>
                                        <input type="number" className="w-[7vw]! text-[.9vw] text-black p-[1vw]!" min={1} defaultValue={1} placeholder="Entrez..." onChange={(e) => setQuantity(e.target.value)} />
                                    </td>
                                    <td className=" w-[8vw] ">
                                        <div className="flex gap-4 items-center justify-center ">
                                            <button className="bg-[#eeca00] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]" onClick={() => CancelCommand(p.id)}>Annuler</button>
                                            <button className=" bg-[#1ace1aee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]" onClick={() => { setPrix(p.price), Commander(p.id), setIsCommand(true) }}>{isCommand?status.map(stat=>stat.status):"commander"}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))) : ""}
                            {localStorage.getItem("ProduitDansPanier") ? (
                                <tr>
                                    <th colSpan={4} className="text-center">Total : {Total.toLocaleString("fr-FR")}  ariary</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th colSpan={4} className="text-center">Total : 0 ariary</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ChevronDown />
            </section>

        </>
    )
}

export default Panier;