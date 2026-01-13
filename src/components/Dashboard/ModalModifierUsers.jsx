import { EditIcon, Eye, EyeOff, ImagePlus, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModalModifierUser({ ClickModifier, TousLesUtilisateurs, id }) {
    const [Lastname, setLastname] = useState("")
    const [Firstname, setFirstname] = useState("")
    const [Email, setEmail] = useState("")
    const [Picture, setPicture] = useState(null)
    const [SelectedPicture, setSelectedPicture] = useState("")
    const [Image, setImage] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const Data = new FormData()
            Data.append("nom", Lastname)
            Data.append("prenom", Firstname)
            Data.append("email", Email)
            Data.append("Image", SelectedPicture ? SelectedPicture : Picture)
            Data.append("id", id)

            const response = await axios.put("http://localhost:8000/UpdateUser", Data, { withCredentials: true })
            console.log(response.data)
            // ProductAdded(response.data[0])
            TousLesUtilisateurs()
            setTimeout(() => {
                ClickModifier()
            }, 200)
        } catch (error) {
            console.log(error)
        }
    }
    const UpdateUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/User/${id}`, { withCredentials: true })
            // console.log(response.data[0])
            setLastname(response.data[0].lastname)
            setFirstname(response.data[0].firstname)
            setEmail(response.data[0].email)
            setPicture(response.data[0].picture)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        UpdateUser()
    }, [])
    return (
        <>
            <div className="w-full h-screen bg-[#0000008e] flex justify-center items-center top-0 left-0 absolute z-100 ">
                <form method="POST" encType="multipart/form-data[0]" className="w-[25vw] h-[25vw] bg-[#ffffff] p-[2vw] flex justify-start flex-col  z-100 rounded-[1vw] relative transition-all" onSubmit={handleSubmit}>
                    <h1 className="text-[#070b2b] mb-[2vw]! text-[1.2vw] text-center underline">Modifier un utilisateur</h1>
                    <button className="text-black btn-ghost absolute right-2 top-2 btn btn-sm btn-circle Logout cursor-pointer hover:text-white text-[.8vw] rounded-full p-[1vw]" onClick={ClickModifier}>X</button>
                    <div className="w-[5vw] flex indicator items-center h-[5vw] rounded-full">
                        <label htmlFor="Image" className="flex items-center justify-center cursor-pointer mb-[1vw]!">
                            <span className="indicator-item badge-sm badge badge-ghost">
                                <EditIcon className="w-[1vw] h-[1vw]" />
                            </span>
                            <input type="file" id="Image" style={{ opacity: 0 }} onChange={(e) => { setSelectedPicture(e.target.files[0]), setImage(URL.createObjectURL(e.target.files[0])) }} name="Image" hidden className="mb-[1vw]!" />
                        </label>
                        <img src={Image ? Image : `http://localhost:8000/upload/users/${Picture}`} alt="" className="w-full h-full rounded-full" />
                    </div>
                    {/* <X className="text-black Logout absolute top-[.5vw] right-[.5vw] cursor-pointer hover:text-red-500" onClick={ClickModifier}/> */}
                    <label htmlFor="Nom">Nom</label>
                    <input type="text" id="Nom" name="nom" required className="bg-[#070b2b]! p-[1vw]! text-[1vw]" value={Lastname} onChange={(e) => setLastname(e.target.value)} />
                    <label htmlFor="Prenom">Prénom</label>
                    <input type="text" id="Prenom" value={Firstname} name="prenom" required className="bg-[#070b2b]! p-[1vw]! mb-[1.5vw]! text-[1vw]" onChange={(e) => setFirstname(e.target.value)} />
                    <button className="bg-green-500 hover:bg-white hover:border-[.1vw] hover:border-green-500 hover:text-green-500 transition-colors text-white p-[.5vw] rounded-[.5vw] text-[1vw]">Ajouter</button>
                </form>
            </div>
        </>
    )
}

export default ModalModifierUser;