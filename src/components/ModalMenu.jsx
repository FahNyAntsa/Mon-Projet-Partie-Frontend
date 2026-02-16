import { LayoutDashboard, LogOutIcon } from "lucide-react";
import axios from "axios"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function ModalMenu({ User }) {
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
            <div className={`w-[36vw]  lg:w-[13vw]  ${User.email === "Administrateur@gmail.com" ? "h-auto lg:h-[15vw]" : "h-[13vw]"} flex flex-col gap-[1vw] bg-bgFah rounded-[1vw] absolute shadow shadow-shadow right-[-4vw] lg:right-1 top-[8.7vw] lg:top-[4.7vw] p-2 pt-[1vw]`}>
                <div className="flex flex-col justify-center items-center">
                    {User.email === "Administrateur@gmail.com" ? (
                        <div className="indicator">
                            <span className=" indicator-item badge badge-xs badge-primary">admin</span>
                            <img src={`http://localhost:8000/upload/users/${User.photo}`} className="lg:w-[5vw] lg:h-[5vw] w-[12vw] h-[12vw] bg-white rounded-full cursor-pointer UserProfil" alt="" />
                        </div>
                    ) :(
                        <img src={`http://localhost:8000/upload/users/${User.photo}`} className="lg:w-[5vw] lg:h-[5vw] w-[12vw] h-[12vw] bg-white rounded-full cursor-pointer UserProfil" alt="" />
                    )}
                    <h3 className="lg:text-[1.3vw] text-[4vw] text-cyan-600  font-bold">{User.prenom}</h3>
                    {User.email === "Administrateur@gmail.com" ? (
                        <div className="w-full flex  justify-start gap-[1vw] items-center h-[7vw] lg:h-[2vw] border-[.1vw] border-text rounded-[.5vw] mt-[1vw] px-1 relative !transition-colors duration-500 ease-in-out hover:bg-cyan-700 hover:border-0 DIV">
                            <LayoutDashboard className="text-text lg:w-[1.5vw] Logout" size={20}/>
                            <Link to={"/Dashboard"} className="text-text text-[3vw] lg:text-[1vw] Deconnexion">Dashboard</Link>
                        </div>
                    ) : ""}
                </div>
                <div className="w-full flex  justify-start gap-9 items-center h-[7vw] lg:h-[2vw] border-[.1vw] border-text rounded-[.5vw]  px-1 relative !transition-colors duration-500 ease-in-out hover:bg-red-500 hover:border-0 DIV">
                    <LogOutIcon className="text-text lg:w-[1.5vw] Logout" size={17}/>
                    <form onSubmit={Logout} className="w-full lg:left-[0.3vw] md:left-[-2.2vw] absolute top-[1vw] lg:top-[.3vw]">
                        <button className="w-full absolute text-text text-[3.1vw] lg:text-[1vw] Deconnexion">Déconnexion</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalMenu;