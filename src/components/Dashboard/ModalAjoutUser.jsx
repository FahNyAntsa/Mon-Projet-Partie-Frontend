import { Eye, EyeOff, ImagePlus, Lock, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModalAjoutUser({ ClickAjout, ProductAdded,TousLesUtilisateurs }) {
    const [InputType, setInputType] = useState("password")
    const [IsLock, setIsLock] = useState(false)
    const [On, setOn] = useState(false)
    const [Nom, setNom] = useState("")
    const [Prenom, setPrenom] = useState()
    const [Image, setImage] = useState([])
    const [DataProducts, setDataProducts] = useState([])
    const [Email, setEmail] = useState("")
    const [Mdp,setMdp]=useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const Data = new FormData()
            Data.append("nom", Nom)
            Data.append("prenom", Prenom)
            Data.append("email", Email)
            Data.append("password", Mdp)
            Data.append("image", Image)

            const response = await axios.post("http://localhost:8000/Registing", Data, { withCredentials: true })
            // console.log(response.data)
            ProductAdded(response.data)
            setTimeout(() => {
                ClickAjout()
            }, 200)
            TousLesUtilisateurs()
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
        <>
            <div className="w-full h-screen bg-[#0000008e] flex justify-center items-center top-0 left-0 fixed lg:absolute z-[99999]">
                <form method="POST" encType="multipart/form-data"  className="lg:!w-[25vw] lg:gap-2 w-full md:w-[70%] h-auto lg:!h-[32vw] bg-bgFah p-[2vw] flex justify-start flex-col  z-100 rounded-[1vw] gap-[1vw] relative transition-all" onSubmit={handleSubmit}>
                    <h1 className="text-navbar md:text-3xl text-lg lg:text-[1.2vw] text-center underline">Ajouter un utilisateur</h1>
                    <button className="text-navbar btn-ghost absolute right-2 top-2 btn btn-sm btn-circle Logout cursor-pointer hover:text-white text-base md:text-xl lg:text-[.8vw] rounded-full p-[1vw]" onClick={ClickAjout}>X</button>
                    {/* <X className="text-black Logout absolute top-[.5vw] right-[.5vw] cursor-pointer hover:text-red-500" onClick={ClickAjout}/> */}
                    <label htmlFor="Nom" className="text-navbar lg:text-sm text-base md:text-xl ">Nom</label>
                    <input type="text" id="Nom" name="nom" required className="bg-navbar lg:h-3 lg:px-2 md:text-xl rounded-md p-[1vw]! md:h-12 h-8 text-bgFah lg:text-[1vw]" onChange={(e) => setNom(e.target.value)} />
                    <label htmlFor="Prenom" className="text-base lg:text-sm md:text-xl text-navbar">Prénom</label>
                    <input type="text" id="Prenom" name="prenom" required className="bg-navbar lg:px-2 lg:h-3 md:text-xl rounded-md p-[1vw]! md:h-12 text-bgFah h-8 lg:text-[1vw]" onChange={(e) => setPrenom(e.target.value)} />
                    <label htmlFor="Email" className="text-navbar lg:text-sm text-base md:text-xl">Email</label>
                    <input type="email" id="Email" name="email" required className="bg-navbar lg:h-3 lg:px-2 md:text-xl rounded-md p-[1vw]! md:h-12 text-bgFah h-8 lg:text-[1vw]" onChange={(e) => setEmail(e.target.value)} />
                    <div className="ipt1 relative !mb-[1vw]">
                        <label htmlFor="password" id="labelPassword" className="text-navbar lg:text-sm text-base md:text-xl ">Mot de passe</label>
                        <input className="bg-navbar md:text-xl rounded-md lg:px-7 px-[8vw] md:h-12 lg:h-3 text-bgFah h-8 lg:text-[1vw]" type={IsLock ? InputType : "password"} name="password" id="password" required
                            onChange={(e) => setMdp(e.target.value)}
                        />
                        <Lock className="absolute top-[6.5vw] lg:top-[2vw] left-1.5 lg:w-[1.2vw] text-bgFah" size={20}/>
                        {On ? (<EyeOff className="absolute z-[7777]lg:top-[2vw]  lg:right-[.5vw] top-[6.5vw] text-red-500 cursor-pointer lg:w-[1.2vw]" onClick={() => { setIsLock(false), setInputType("password"), setOn(false) }} size={30}/>) : (<Eye className="absolute lg:top-[2vw]  right-[.5vw] text-bgFah cursor-pointer lg:w-[1.2vw]" onClick={() => { setIsLock(true), setInputType("text"), setOn(true) }} size={20} />)}
                    </div>
                    <label htmlFor="Image" className="flex items-center text-navbar lg:text-sm text-base md:text-xl justify-center cursor-pointer !mb-[1vw]">
                        <ImagePlus className="cursor-pointer text-navbar" />
                        Ajouter une image
                    </label>
                    <input type="file" id="Image" onChange={(e) => { setImage(e.target.files[0]) }} name="Image" required hidden className="mb-[1vw]!" />
                    <button className="bg-green-500 hover:bg-white hover:border-[.1vw] hover:border-green-500 hover:text-green-500 transition-colors text-white p-[.5vw] lg:rounded-[.5vw] text-base md:text-2xl rounded-md lg:text-[1vw]">Ajouter</button>
                </form>
            </div>
        </>
    )
}

export default ModalAjoutUser;