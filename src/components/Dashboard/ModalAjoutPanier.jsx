import { ImagePlus, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModalAjoutPanier({ClickAjout,ProductAdded}) {
    const [Nom,setNom]=useState("")
    const [Price,setPrice]=useState()
    const [File,setFile]=useState([])
    const [Category,setCategory]=useState("drum")
    const [Describes,setDescribes]=useState("")
    const navigate = useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        
        try {
            const Data = new FormData()
            Data.append("name",Nom)
            Data.append("price",Price)
            Data.append("describes",Describes)
            Data.append("category",Category)
            Data.append("file",File)
 
            const response = await axios.post("http://localhost:8000/AddProduct",Data,{withCredentials:true})
            // console.log(response.data)
            ProductAdded(response.data)
            navigate("/DashProduit")
            setTimeout(()=>{
                ClickAjout()
            },200)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="w-full h-screen bg-[#0000008e] flex justify-center items-center top-0 left-0 fixed lg:absolute z-[99999] ">
                <form method="POST" encType="multipart/form-data" className="lg:!w-[25vw] w-full md:w-[70%] h-auto  bg-bgFah p-[2vw] flex justify-start flex-col  z-100 rounded-[1vw] gap-[1vw] relative transition-all" onSubmit={handleSubmit}>
                    <h1 className="text-navbar md:text-3xl text-lg lg:text-[1.2vw] text-center underline">Ajouter un produit</h1>
                    <button className="text-navbar btn-ghost absolute right-2 top-2 btn btn-sm btn-circle Logout cursor-pointer hover:text-white text-base md:text-xl lg:text-[.8vw] rounded-full p-[1vw]" onClick={ClickAjout}>X</button>
                    {/* <X className="text-black Logout absolute top-[.5vw] right-[.5vw] cursor-pointer hover:text-red-500" onClick={ClickAjout}/> */}
                    <label htmlFor="nom" className="text-base md:text-xl lg:text-sm text-navbar">Nom</label>
                    <input type="text" id="nom" name="name" required className="bg-navbar md:text-xl rounded-md !p-[1vw] md:h-12 h-8 lg:h-3 text-bgFah lg:text-[1vw]" onChange={(e)=>setNom(e.target.value)} />
                    <label htmlFor="prix" className="text-base md:text-xl lg:text-sm text-navbar">Prix</label>
                    <input type="number" id="prix" name="price" required className="bg-navbar md:text-xl rounded-md !p-[1vw] md:h-12 lg:h-3 text-bgFah h-8 lg:text-[1vw]" onChange={(e)=>setPrice(e.target.value)}/>
                    <label htmlFor="description" className="text-base lg:text-sm md:text-xl  text-navbar">Description</label>
                    <textarea name="describes" required id="descritpion" className="bg-navbar md:text-xl text-bgFah flex-1 text-base lg:text-[1vw] !px-[1vw] rounded-md lg:rounded-[.5vw] mb-[1vw]!" rows={3} onChange={(e)=>setDescribes(e.target.value)}></textarea>
                    <label htmlFor="category" className="text-base lg:text-sm md:text-xl  text-navbar">Catégorie</label>
                    <select name="category" id="category" className="mb-[1vw]! h-8 md:h-12 md:text-xl  text-bgFah text-base lg:text-sm  bg-navbar rounded-[.5vw] py-[.5vw] px-[.4vw]" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="drum" className="text-bgFah text-xs md:text-md  lg:text-[1vw]">drum</option>
                        <option value="accessoriesOne" className="text-bgFah md:text-md  text-xs lg:text-[1vw]">accessoriesOne</option>
                        <option value="accessoriesTwo" className="text-bgFah md:text-md  text-xs lg:text-[1vw]">accessoriesTwo</option>
                    </select>
                    <label htmlFor="file" className="flex items-center md:text-2xl lg:text-sm text-base text-navbar justify-center cursor-pointer mt-[1vw] !mb-[1vw]">
                        <ImagePlus className="cursor-pointer"/>
                        Ajouter une image
                    </label>
                    <input type="file" id="file" onChange={(e)=>{setFile(e.target.files[0])}} name="file" required hidden className="mb-[1vw]!"/>
                    <button className="bg-green-500 hover:bg-white hover:border-[.1vw] hover:border-green-500 hover:text-green-500 transition-colors text-white p-[.5vw] lg:rounded-[.5vw] text-base md:text-2xl rounded-md lg:text-[1vw]">Ajouter</button>
                </form>
            </div>
        </>
    )
}

export default ModalAjoutPanier;