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
            <div className="w-full h-screen bg-modal flex justify-center items-center top-0 left-0 absolute z-[999999] ">
                <form method="POST" encType="multipart/form-data"  className="w-[25vw] h-[28vw] bg-bgFah p-[2vw] flex justify-start flex-col  z-[9999999] rounded-[1vw] relative transition-all" onSubmit={handleSubmit}>
                    <h1 className="text-navbar text-[1.2vw] text-center underline">Ajouter un utilisateur</h1>
                    <button className="text-navbar btn-ghost absolute right-2 top-2 btn btn-sm btn-circle Logout cursor-pointer hover:text-navbar hover:bg-bgFah text-[.8vw] rounded-full p-[1vw]" onClick={ClickAjout}>X</button>
                    {/* <X className="text-black Logout absolute top-[.5vw] right-[.5vw] cursor-pointer hover:text-red-500" onClick={ClickAjout}/> */}
                    <label htmlFor="Nom" className="text-navbar">Nom</label>
                    <input type="text" id="Nom" name="nom" required className="bg-bgInput !p-[1vw] text-[1vw] text-bgFah" onChange={(e) => setNom(e.target.value)} />
                    <label htmlFor="Prenom" className="text-navbar">Prénom</label>
                    <input type="text" id="Prenom" name="prenom" required className="bg-bgInput !p-[1vw] text-[1vw] text-bgFah" onChange={(e) => setPrenom(e.target.value)} />
                    <label htmlFor="Email" className="text-navbar">Email</label>
                    <input type="email" id="Email" name="email" required className="bg-bgInput !p-[1vw] text-[1vw] text-bgFah" onChange={(e) => setEmail(e.target.value)} />
                    <div className="ipt1 relative !mb-[1vw]">
                        <label htmlFor="password" id="labelPassword" className="text-navbar">Mot de passe</label>
                        <input className="bg-bgInput p-[1vw]! px-[2vw]! text-[1vw] text-bgFah" type={IsLock ? InputType : "password"} name="password" id="password" required
                            onChange={(e) => setMdp(e.target.value)}
                        />
                        <Lock className="absolute top-[2vw] left-1.5 MailIcon text-bgFah" />
                        {On ? (<EyeOff className="absolute top-[2vw] right-[.5vw] text-bgFah cursor-pointer MailIcon" onClick={() => { setIsLock(false), setInputType("password"), setOn(false) }} />) : (<Eye className="absolute top-[2vw] right-[.5vw] text-bgFah cursor-pointer MailIcon" onClick={() => { setIsLock(true), setInputType("text"), setOn(true) }} />)}
                    </div>
                    <label htmlFor="Image" className="flex items-center text-navbar justify-center cursor-pointer !mb-[1vw]">
                        <ImagePlus className="cursor-pointer text-navbar" />
                        Ajouter une image
                    </label>
                    <input type="file" id="Image" onChange={(e) => { setImage(e.target.files[0]) }} name="Image" required hidden className="mb-[1vw]!" />
                    <button className="bg-green-500 hover:bg-white hover:border-[.1vw] hover:border-green-500 hover:text-green-500 transition-colors text-white p-[.5vw] rounded-[.5vw] text-[1vw]">Ajouter</button>
                </form>
            </div>
        </>
    )
}

export default ModalAjoutUser;