import { Home, LayoutDashboard, LogOutIcon } from "lucide-react";
import axios from "axios"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function ModalUserDashboard({ User }) {
    const navigate = useNavigate()
    const Logout = async (e) => {
        e.preventDefault()
        try {
            const logout = toast.loading("Déconnexion en cours...", { duration: 1700 })
            const response = await axios.post("http://localhost:8000/Logout", {}, { withCredentials: true })
            localStorage.clear()
            // console.log(response.data)
            if (response.data.status === 200) {
                setTimeout(() => {
                    navigate("/Login")
                    toast.success("Vous êtes déconnecté", { logout })
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className={`lg:w-[13vw] lg:h-[7vw] w-[40vw] md:w-[25vw] h-[20vw] md:h-[15vw] flex flex-col gap-[2vw] lg:gap-[1vw] bg-bgFah shadow shadow-shadowBox rounded-[1vw] absolute right-5 md:top-[12vw] top-16 lg:right-6 lg:top-[4.7vw] p-2 pt-[1vw] z-[99999]`}>
                <div className="flex flex-col gap-1 justify-center items-center">
                    {/* <h3 className="text-[1.3vw] text-cyan-600  font-bold">{User.prenom}</h3> */}
                    {User.email === "Administrateur@gmail.com" ? (
                        <div className="w-full flex  justify-start gap-[1vw] items-center h-8 lg:h-[2vw] border-[.1vw] border-bgFah rounded-[.5vw]  px-1 relative !transition-colors duration-75 ease-in-out hover:bg-cyan-700 hover:border-0 DIV">
                            <Home className="text-navbar Logout" size={20}/>
                            <Link to={"/"} className="text-navbar text-base lg:text-[1vw] md:text-xl Deconnexion">Accueil</Link>
                        </div>
                    ) : ""}
                </div>
                <div className="w-full flex  justify-start gap-9 items-center h-8 lg:h-[2vw] border-[.1vw] border-bgFah rounded-[.5vw] z-100  px-1 relative !transition-colors duration-75 ease-in-out hover:bg-red-500 hover:border-0 DIV">
                    <LogOutIcon className="text-navbar Logout" size={20} />
                    <form onSubmit={Logout} className="w-full absolute lg:top-0 top-[.3vw]">
                        <button className="w-full absolute text-navbar text-base lg:text-[1vw] md:text-xl Deconnexion">Déconnexion</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalUserDashboard;