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
            <div className="w-full h-screen bg-[#0000008e] flex justify-center items-center top-0 left-0 absolute z-100 ">
                <form method="POST" encType="multipart/form-data" className="w-[25vw] h-[32vw] bg-[#ffffff] p-[2vw] flex justify-start flex-col  z-100 rounded-[1vw] relative transition-all" onSubmit={handleSubmit}>
                    <h1 className="text-[#070b2b] text-[1.2vw] text-center underline">Ajouter un produit</h1>
                    <button className="text-black btn-ghost absolute right-2 top-2 btn btn-sm btn-circle Logout cursor-pointer hover:text-white text-[.8vw] rounded-full p-[1vw]" onClick={ClickAjout}>X</button>
                    {/* <X className="text-black Logout absolute top-[.5vw] right-[.5vw] cursor-pointer hover:text-red-500" onClick={ClickAjout}/> */}
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="name" required className="bg-[#070b2b]! p-[1vw]! text-[1vw]" onChange={(e)=>setNom(e.target.value)} />
                    <label htmlFor="prix">Prix</label>
                    <input type="number" id="prix" name="price" required className="bg-[#070b2b]! p-[1vw]! text-[1vw]" onChange={(e)=>setPrice(e.target.value)}/>
                    <label htmlFor="description">Description</label>
                    <textarea name="describes" required id="descritpion" className="bg-[#070b2b]! flex-1 text-[1vw] px-[1vw]! rounded-[.5vw] mb-[1vw]!" rows={3} onChange={(e)=>setDescribes(e.target.value)}></textarea>
                    <label htmlFor="category">Catégorie</label>
                    <select name="category" id="category" className="mb-[1vw]! text-white text-[1vw] bg-[#070b2b]! rounded-[.5vw] py-[.5vw] px-[.4vw]" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="drum" className="text-white text-[1vw]">drum</option>
                        <option value="accessoriesOne" className="text-white text-[1vw]">accessoriesOne</option>
                        <option value="accessoriesTwo" className="text-white text-[1vw]">accessoriesTwo</option>
                    </select>
                    <label htmlFor="file" className="flex items-center justify-center cursor-pointer mb-[1vw]!">
                        <ImagePlus className="cursor-pointer"/>
                        Ajouter une image
                    </label>
                    <input type="file" id="file" onChange={(e)=>{setFile(e.target.files[0])}} name="file" required hidden className="mb-[1vw]!"/>
                    <button className="bg-green-500 hover:bg-white hover:border-[.1vw] hover:border-green-500 hover:text-green-500 transition-colors text-white p-[.5vw] rounded-[.5vw] text-[1vw]">Ajouter</button>
                </form>
            </div>
        </>
    )
}

export default ModalAjoutPanier;