import axios from "axios";
import { CheckCircle, Star, X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function Produit() {
    const { id } = useParams()
    const [ProductInfo, setInfo] = useState({ Price: 0 })
    const [UserInfo, setUserInfo] = useState([])
    const [Added, setAdded] = useState(false)
    const navigate = useNavigate()

    const FetchInfoProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/Product/${id}`, { withCredentials: true })
            console.log(response.data.User.id)
            const InformationOfProduct = response.data.response[0]
            const InformationOfUser = response.data.User
            setInfo(InformationOfProduct)
            setUserInfo(InformationOfUser)
        } catch (error) {
            console.log(error)
        }
    }
    const key = `user_${UserInfo.id}_panier`
    // console.log(key)
    const AddToPanier =(userId,product)=>{
        const key = `user_${userId}_panier`
        
    }
    useEffect(() => {
        FetchInfoProduct()
    }, [])
    const HandleClick = async (id) => {
        setAdded(true)
        try {
            const Tab = JSON.parse(localStorage.getItem("ProduitDansPanier")) || []
            // const response = await axios.post(`http://localhost:8000/Product/${id}`, {}, { withCredentials: true })
            // console.log(response.data)
            Tab.push(ProductInfo)
            // console.log(Tab)
            // console.log(ProductInfo)
            localStorage.setItem("ProduitDansPanier",JSON.stringify(Tab))
            setTimeout(() => {
                navigate("/Panier")
            }, 500);
        } catch (error) {
            console.log(error)
        }
    }
    const Price = ProductInfo.Price.toLocaleString()
    // console.log(Prix)

    return (
        <>
            <section className="w-full h-screen  flex flex-col ">
                <div className="w-full h-screen flex justify-center items-center ">
                    <div className="bg-[#ffffff] relative  w-[60vw] h-[35vw] rounded-[1vw] p-[2vw] flex overflow-hidden gap-1">
                        <Link to={"/Boutique"}><X className="absolute right-2 top-2 text-black" /></Link>
                        <div className="w-1/2 p-3 flex flex-col gap-1">
                            <h1 className="text-[1.5vw] text-black">{ProductInfo.name}</h1>
                            <p className="text-[1.1vw] flex-1 text-gray-500 mt-[2vw]!">{ProductInfo.describes}</p>
                            <div className="flex gap-1">
                                <Star className="Star" />
                                <Star className="Star" />
                                <Star className="Star" />
                                <Star className="Star" />
                                <Star className="Star" />
                            </div>
                            <h1 className="text-[1.3vw] text-cyan-600 flex  items-center gap-2">Prix <span className="text-[1.2vw] text-black">{Price} ariary</span></h1>

                            <button className={`text-[.9vw] text-white px-4 py-[.1vw] rounded-[.2vw] w-full flex justify-center items-center gap-2 ${Added ? "bg-[#0de70dee]" : "bg-[linear-gradient(90deg,#00c6ff,#0072ff)]"}`} onClick={() => HandleClick(ProductInfo.id)}>{Added && <CheckCircle className="CheckCircle" />}{Added ? "Produit ajouté" : "Ajouter au panier"}</button>
                        </div>
                        <img src={`../src/assets/images/${ProductInfo.pics}`} alt="" className="w-[35vw] image cursor-pointer" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Produit;