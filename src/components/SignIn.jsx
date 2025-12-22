import { Eye, EyeOff, ImagePlus, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast"


function SignIn() {
    const [InputType, setInputType] = useState("password")
    const [IsLock, setIsLock] = useState(false)
    const [On, setOn] = useState(false)
    const [Nom,setNom] = useState("")
    const [Prenom,setPrenom] = useState("")
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const [Image,setImage] = useState([])
    const Navigate = useNavigate()
    const HandleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const Data = new FormData()
            Data.append("nom",Nom)
            Data.append("prenom",Prenom)
            Data.append("email",Email)
            Data.append("password",Password)
            Data.append("image",Image)
            const response = await axios.post("http://localhost:8000/Registing",Data)
            console.log(response.data)
            if(response.data.status === 200){
                const Inscription = toast.loading("Inscription en cours...",{duration:1700})
                toast.success(response.data.message,{Inscription})
                setTimeout(()=>{
                    Navigate("/Login")
                },2000)
            }else if(response.data.status === 401){
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <> 
            <section id="SignInSection" className="relative w-full h-screen flex justify-evenly items-center bg-[#0B0E14]">
                <div className="logo flex flex-col justify-center items-center">
                    <img src="../src/assets/unnamed-removebg-preview.png" alt="Logo Mooz'hika" className="w-[15vw] h-[15vw] bg-white rounded-full p-0"/>
                    <p id="solgan" className="text-3xl text-[#00c3ff]">"Faites résonner votre passion."</p>
                </div>
                <div className="formulaire">
                    <form method="POST" encType="multipart/form-data" id="formSignIn" className="flex flex-col w-[25vw] h-[36vw] bg-[#0b0e144f] p-[1vw] rounded-[1vw] gap-[2vw]"
                        onSubmit={HandleSubmit}
                    >
                        <h1 id="inscription" className="text-[2vw] text-white text-center">Inscrivez-vous</h1>
                        <div className="ipt1 relative">
                            <input className="text-black text-[1vw]" type="text" name="nom" id="nom" required 
                                onChange={(e)=>setNom(e.target.value)}
                                
                            />
                            <User className="absolute top-[0.2vw] left-1 UserIcon text-black" />
                            <label htmlFor="nom" id="labelNom">Nom</label>
                        </div>
                        <div className="ipt1 relative">
                            <input className="text-black text-[1vw]" type="text" name="prenom" id="prenom" required 
                                onChange={(e)=>setPrenom(e.target.value)}
                            />
                            <User className="absolute top-[0.2vw] left-1 UserIcon text-black" />
                            <label htmlFor="prenom" id="labelPrenom">Prénom</label>
                        </div>
                        <div className="ipt1 relative">
                            <input className="text-black text-[1vw]" type="email" name="email" id="email" required
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <Mail className="absolute top-[0.3vw] left-[.5vw] MailIcon text-black" />
                            <label htmlFor="password" id="labelEmail">Email</label>
                        </div>
                        <div className="ipt1 relative">
                            <input className="text-black text-[1vw]" type={IsLock ? InputType : "password"} name="password" id="password" required 
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <Lock className="absolute top-[0.2vw] left-1.5 MailIcon text-black" />
                            <label htmlFor="password" id="labelPassword">Mot de passe</label>
                            {On ? (<EyeOff className="absolute top-[0.3vw] right-[.5vw] text-black cursor-pointer MailIcon"onClick={() => { setIsLock(false), setInputType("password"), setOn(false) }} />) : (<Eye className="absolute top-[0.3vw] right-[.5vw] text-black cursor-pointer MailIcon"  onClick={() => { setIsLock(true), setInputType("text"), setOn(true) }} />)}
                        </div>
                        <input className="text-black text-[1vw]" type="file" name="image" id="image" hidden required 
                            onChange={(e)=>setImage(e.target.files[0])}
                        />
                        <label htmlFor="image" id="labelImage" className="flex gap-1.5 items-center cursor-pointer">
                            <ImagePlus  className="MailIcon"/> Photo de profil
                        </label>
                        <button id="inscrire" name="register" className="text-[1vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] w-full mx-auto h-[2.5vw] rounded-[.4vw] cursor-pointer" >s'inscrire</button>
                        <p className="text-white text-center mb-2 text-[1vw]">Déjà un compte ? <Link to={"/Login"} className="text-cyan-500 text-sm Cliquer">Se connecter</Link></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default SignIn;