import { LogOutIcon } from "lucide-react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function ModalMenu({User}) {
    const navigate = useNavigate()
    const Logout =async  (e) => {
        e.preventDefault()
        try {
            const logout=toast.loading("Déconnexion en cours...",{duration:1700})
            const response = await axios.post("http://localhost:8000/Logout", {}, { withCredentials: true })
            // console.log(response.data)
            if (response.data.status === 200) {
                setTimeout(() => {
                    navigate("/Login")
                    toast.success("Vous êtes déconnecté",{logout})
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="w-[13vw] h-[12vw] flex flex-col gap-[1vw] bg-white rounded-[1vw] absolute right-6 top-[4.5vw] p-2">
                <div className="flex flex-col gap-1 justify-center items-center">
                    <img src={`http://localhost:8000/upload/users/${User.photo}`} className="w-[5vw] h-[5vw] bg-white rounded-full cursor-pointer UserProfil" alt="" />
                    <h3 className="text-[1.3vw] text-cyan-600  font-bold">{User.prenom}</h3>
                </div>
                <div className="w-full flex  justify-start gap-9 items-center h-[2vw] border-[.1vw] border-black rounded-[.5vw] mt-[3vw] px-1 relative hover:bg-red-500 hover:border-0 DIV">
                    <LogOutIcon className="text-black Logout" />
                    <form onSubmit={Logout} className="w-full absolute top-[.3vw]">
                        <button className="w-full absolute text-black text-[1vw] Deconnexion">Déconnexion</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalMenu;