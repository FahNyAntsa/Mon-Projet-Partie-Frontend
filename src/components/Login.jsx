import axios from "axios";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



function Login() {
    const [InputType, setInputType] = useState("password")
    const [IsLock, setIsLock] = useState(false)
    const [On, setOn] = useState(false)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigate()
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            // const login = toast.loading("Connexion en cours...",{duration:1800})
            // const MdpError = toast.loading("Connexion en cours...",{duration:1000})
            // const mdp = toast.loading("")
            const response = await axios.post("http://localhost:8000/Login", { Email, Password }, { withCredentials: true })
            if (response.data.status === 402) {
                return toast.error("Mot de passe invalide")
                
            }
            else if (response.data.status === 200) {
                toast("Connexion en cours...", { duration: 1700 })
                setTimeout(() => {
                    navigate("/")
                    console.log(response.data)
                    toast.success("Vous êtes connecté")
                    return
                }, 2000)
            }else if(response.data.status === 301){
                return toast.error("Ce compte n'existe pas")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section id="SignInSection" className="relative w-full h-screen flex justify-evenly items-center bg-[#0B0E14]">
                <div className="logo flex flex-col justify-center items-center">
                    <img src="../src/assets/unnamed-removebg-preview.png" alt="Logo Mooz'hika" className="w-[15vw] h-[15vw] bg-white rounded-full" />
                    <p id="solgan" className="text-3xl text-[#00c3ff]">"Faites résonner votre passion."</p>
                </div>
                <div className="formulaire">
                    <form method="POST" encType="multipart/form-data" id="formSignIn" className="flex flex-col w-[25vw] h-[23vw] bg-[#0b0e144f] p-[1vw] rounded-[1vw] gap-[2vw]" onSubmit={HandleSubmit}>
                        <h1 id="inscription" className="text-[2vw] text-white text-center">Connectez-vous</h1>
                        <div className="ipt1 relative">
                            <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} className="text-black text-[1vw]" />
                            <Mail className="absolute top-[0.3vw] left-[.5vw] MailIcon text-black" />
                            <label htmlFor="password" id="labelEmail">Email</label>
                        </div>
                        <div className="ipt1 relative">
                            <input type={IsLock ? InputType : "password"} name="password" id="password" required onChange={(e) => setPassword(e.target.value)} className="text-black text-[1vw]" />
                            <Lock className="absolute top-[0.2vw] left-1.5 MailIcon text-black" />
                            <label htmlFor="password" id="labelPassword">Mot de passe</label>
                            {On ? (<EyeOff className="absolute top-[0.3vw] text-black right-[.5vw] cursor-pointer MailIcon" onClick={() => { setIsLock(false), setInputType("password"), setOn(false) }} />) : (<Eye className="absolute text-black top-[0.3vw] right-[.5vw] cursor-pointer MailIcon" onClick={() => { setIsLock(true), setInputType("text"), setOn(true) }} />)}
                        </div>
                        <button id="inscrire" name="register" className="text-[1vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] w-full mx-auto h-[2.5vw] rounded-[.4vw] cursor-pointer" >se connecter</button>
                        <p className="text-white text-center text-[1vw] mb-2">Pas de compte ? <Link to={"/SignIn"} className="text-cyan-500 text-sm Cliquer">Créer</Link></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login;