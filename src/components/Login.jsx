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
            } else if (response.data.status === 301) {
                return toast.error("Ce compte n'existe pas")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* MOBILE */}
            <section id="SignInSection" className="relative w-full h-screen  lg:hidden flex flex-col lg:flex-row  lg:justify-evenly justify-start pt-[6vw] gap-[4vw] items-center bg-[#0B0E14]">
                <div className="logo flex flex-col justify-center items-center">
                    <img src="../src/assets/unnamed-removebg-preview.png" alt="Logo Mooz'hika" className="lg:w-[15vw] w-[25vw] h-[25vw] md:w-[20vw] md:h-[20vw] lg:h-[15vw] bg-white rounded-full" />
                </div>
                <div className="formulaire">
                    <form method="POST" encType="multipart/form-data" id="formSignIn" className=" lg:hidden flex flex-col w-[90vw] md:w-[70vw] lg:w-[25vw] h-auto lg:h-[23vw] bg-[#0b0e144f] p-4 lg:p-[1vw] rounded-2xl lg:rounded-[1vw] md:gap-[1vw] gap-[2vw]" onSubmit={HandleSubmit}>
                        <h1 id="inscription" className="lg:text-[2vw] md:text-[5vw] text-[6.5vw] text-white text-center">Connectez-vous</h1>
                        <div className=" relative">
                            <label htmlFor="password" className="text-base md:text-[2.5vw] text-white !top-[1vw] lg:!top-[.8vw] lg:text-[1vw]" id="labelEmail">Email</label>
                            <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} className="text-black !px-[8vw] md:text-base rounded-lg  h-10 md:h-12 text-base lg:text-[1vw] md:!px-[6vw] lg:!px-[2vw]" />
                            <Mail className="absolute top-[8.5vw] md:top-[5vw]  md:w-[3vw] md:h-[3vw] left-[1.5vw] lg:w-[1.2vw] text-black" size={18} />
                        </div>
                        <div className="relative mb-[4vw]">
                            <label htmlFor="password" className="text-base md:text-[2.5vw] text-white !top-[1vw] lg:!top-[1vw] left-[2.2] lg:text-[1vw]" id="labelPassword">Mot de passe</label>
                            <input type={IsLock ? InputType : "password"} name="password" id="password" required onChange={(e) => setPassword(e.target.value)} className="text-black lg:text-[1vw] h-10 md:h-12 rounded-lg text-base md:!px-[6vw] md:text-base !px-[8vw] lg:!px-[2vw] " />
                            <Lock className="absolute top-[8.5vw] left-[1.5vw]  lg:w-[1.2vw] text-black md:top-[5vw]  md:w-[3vw] md:h-[3vw] " size={18} />
                            {On ? (<EyeOff className="absolute top-[8.5vw] text-black right-[1.7vw] cursor-pointer  lg:w-[1.2vw] md:top-[5vw]  md:w-[3vw] md:h-[3vw]  " onClick={() => { setIsLock(false), setInputType("password"), setOn(false) }} size={18} />) : (<Eye className="absolute top-[8.5vw] text-black  right-[1.7vw] cursor-pointer  lg:w-[1.2vw] md:top-[5vw]  md:w-[3vw] md:h-[3vw]  " onClick={() => { setIsLock(true), setInputType("text"), setOn(true) }} size={18} />)}
                        </div>
                        <button id="inscrire" name="register" className="lg:text-[1vw] text-[3.4vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] w-full mx-auto h-10 rounded-lg cursor-pointer" >se connecter</button>
                        <p className="text-white text-center text-[3vw] lg:text-[1vw] mb-2">Pas de compte ? <Link to={"/SignIn"} className="text-cyan-500 text-[3vw] lg:text-sm Cliquer">Créer</Link></p>
                    </form>
                    <p id="solgan" className="lg:text-3xl text-center text-[4vw] text-[#00c3ff]">"Faites résonner votre passion."</p>
                </div>
            </section>
            {/* MOBILE FIN */}
            <section id="SignInSection" className="relative hidden w-full h-screen lg:flex flex-col lg:flex-row  lg:justify-evenly justify-start pt-[6vw] gap-[4vw] items-center bg-[#0B0E14] SignInSection">
                <div className="logo flex flex-col justify-center items-center">
                    <img src="../src/assets/unnamed-removebg-preview.png" alt="Logo Mooz'hika" className="w-[15vw] h-[15vw] bg-white rounded-full" />
                     <p id="solgan" className="lg:text-3xl text-[4vw] text-[#00c3ff]">"Faites résonner votre passion."</p>
                </div>
                <div className="formulaire">
                    <form method="POST" encType="multipart/form-data" id="formSignIn" className="hidden lg:flex flex-col w-[75vw] lg:w-[25vw] h-auto lg:h-[23vw] bg-[#0b0e144f] p-4 lg:p-[1vw] rounded-[1vw] gap-[2vw]" onSubmit={HandleSubmit}>
                        <h1 id="inscription" className="lg:text-[2vw] text-[6vw] text-white text-center">Connectez-vous</h1>
                       <div className="ipt1 relative">
                            <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)} className="text-black text-[1vw]" />
                            <Mail className="absolute top-[0.5vw] left-1 UserIcon text-black" size={17} />
                            <label htmlFor="password" id="labelEmail">Email</label>
                        </div>
                        <div className="ipt1 relative">
                            <input type={IsLock ? InputType : "password"} name="password" id="password" required onChange={(e) => setPassword(e.target.value)} className="text-black text-[1vw] " />
                            <Lock className="absolute top-[0.5vw] left-1 UserIcon text-black" size={17}/>
                            <label htmlFor="password" id="labelPassword">Mot de passe</label>
                            {On ? (<EyeOff className="absolute  text-black right-[.5vw] cursor-pointer  lg:w-[1.2vw] top-[0.5vw] UserIcon " onClick={() => { setIsLock(false), setInputType("password"), setOn(false) }}  />) : (<Eye className="absolute  text-black right-[.5vw] cursor-pointer  lg:w-[1.2vw] top-[0.5vw] UserIcon " onClick={() => { setIsLock(true), setInputType("text"), setOn(true) }} />)}
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