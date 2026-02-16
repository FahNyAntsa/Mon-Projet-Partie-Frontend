import { Eye, EyeOff, ImagePlus, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast"


function SignIn() {
    const [InputType, setInputType] = useState("password")
    const [IsLock, setIsLock] = useState(false)
    const [On, setOn] = useState(false)
    const [Nom, setNom] = useState("")
    const [Prenom, setPrenom] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Image, setImage] = useState([])
    const Navigate = useNavigate()
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const Data = new FormData()
            Data.append("nom", Nom)
            Data.append("prenom", Prenom)
            Data.append("email", Email)
            Data.append("password", Password)
            Data.append("image", Image)
            const response = await axios.post("http://localhost:8000/Registing", Data)
            console.log(response.data)
            if (response.data.status === 200) {
                const Inscription = toast.loading("Inscription en cours...", { duration: 1700 })
                toast.success("inscription réussite", { Inscription })
                setTimeout(() => {
                    Navigate("/Login")
                }, 2000)
            } else if (response.data.status === 401) {
                toast.error("L'email a déjà un compte")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* MOBILE */}
            <section id="SignInSection" className="relative w-full h-screen  lg:hidden flex flex-col lg:flex-row  lg:justify-evenly justify-start pt-[6vw]  items-center bg-[#0B0E14]">
                <div className="logo flex flex-col justify-center items-center">
                    <img src="../src/assets/unnamed-removebg-preview.png" alt="Logo Mooz'hika" className="lg:w-[15vw] w-[25vw] h-[25vw] md:w-[20vw] md:h-[20vw] lg:h-[15vw] bg-white rounded-full" />
                    {/* <p id="solgan" className="text-3xl text-[#00c3ff]">"Faites résonner votre passion."</p> */}
                </div>
                <div className="formulaire">
                    <form method="POST" encType="multipart/form-data" id="formSignIn" className="lg:hidden flex flex-col w-[90vw] md:w-[70vw] lg:w-[25vw] h-auto lg:h-[23vw] bg-[#0b0e144f] p-4 lg:p-[1vw] rounded-2xl lg:rounded-[1vw] md:gap-[1vw] gap-[2vw]"
                        onSubmit={HandleSubmit}
                    >
                        <h1 id="inscription" className="lg:text-[2vw] md:text-[5vw] text-[6.5vw] text-white text-center">Inscrivez-vous</h1>
                        <div className="relative">
                            <label htmlFor="nom" id="labelNom" className="text-base md:text-[2.5vw] text-white !top-[1vw] lg:!top-[.8vw] lg:text-[1vw]">Nom</label>
                            <input className="text-black !px-[8vw] md:text-base rounded-lg  h-10 md:h-12 text-base lg:text-[1vw] md:!px-[6vw] lg:!px-[2vw]" type="text" name="nom" id="nom" required
                                onChange={(e) => setNom(e.target.value)}
                            />
                            <User className="absolute top-[9.5vw] md:top-[5vw]  md:w-[3vw] md:h-[3vw] left-[1.5vw] lg:w-[1.2vw] text-black" size={18} />
                        </div>
                        <div className="relative">
                            <label htmlFor="prenom" id="labelPrenom" className="text-base md:text-[2.5vw] text-white !top-[1vw] lg:!top-[1vw] left-[2.2] lg:text-[1vw]">Prénom</label>
                            <input className="text-black !px-[8vw] md:text-base rounded-lg  h-10 md:h-12 text-base lg:text-[1vw] md:!px-[6vw] lg:!px-[2vw] " type="text" name="prenom" id="prenom" required
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                            <User className="absolute top-[9.2vw] left-1  text-black" size={20}/>
                        </div>
                        <div className="ipt1 relative">
                            <label htmlFor="password" id="labelEmail" className="text-base md:text-[2.5vw] text-white !top-[1vw] lg:!top-[.8vw] lg:text-[1vw]" >Email</label>
                            <input className="text-black !px-[8vw] md:text-base rounded-lg  h-10 md:h-12 text-base lg:text-[1vw] md:!px-[6vw] lg:!px-[2vw]" type="email" name="email" id="email" required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Mail className="absolute top-[8.5vw] md:top-[5vw]  md:w-[3vw] md:h-[3vw] left-[1.5vw] lg:w-[1.2vw] text-black" size={18} />
                        </div>
                        <div className="relative mb-[4vw]">
                            <label htmlFor="password" id="labelPassword" className="text-base md:text-[2.5vw] text-white !top-[1vw] lg:!top-[1vw] left-[2.2] lg:text-[1vw]" >Mot de passe</label>
                            <input className="text-black lg:text-[1vw] h-10 md:h-12 rounded-lg text-base md:!px-[6vw] md:text-base !px-[8vw] lg:!px-[2vw] " type={IsLock ? InputType : "password"} name="password" id="password" required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Lock className="absolute top-[8.5vw] left-[1.5vw]  lg:w-[1.2vw] text-black md:top-[5vw]  md:w-[3vw] md:h-[3vw] " size={18} />
                            {On ? (<EyeOff className="absolute top-[8.5vw] text-black right-[1.7vw] cursor-pointer  lg:w-[1.2vw] md:top-[5vw]  md:w-[3vw] md:h-[3vw]  " onClick={() => { setIsLock(false), setInputType("password"), setOn(false) }} size={18} />) : (<Eye className="absolute top-[8.5vw] text-black  right-[1.7vw] cursor-pointer  lg:w-[1.2vw] md:top-[5vw]  md:w-[3vw] md:h-[3vw] " onClick={() => { setIsLock(true), setInputType("text"), setOn(true) }} size={18} />)}
                        </div>
                        <input className="text-black text-[1vw]" type="file" name="image" id="image" hidden required
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <label htmlFor="image" id="labelImage" className="flex gap-1.5 items-center cursor-pointer text-base !py-2 !rounded-lg !px-[2vw] md:!py-3 mb-[4vw]">
                            <ImagePlus size={18} className=" lg:w-[1.2vw]  md:w-[3vw] md:h-[3vw]" /> Photo de profil
                        </label>
                        <button id="inscrire" name="register" className="lg:text-[1vw] text-[3.4vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] w-full mx-auto h-10  rounded-lg cursor-pointer" >s'inscrire</button>
                        <p className="text-white text-center text-[3vw] lg:text-[1vw] mb-2">Déjà un compte ? <Link to={"/Login"} className="text-cyan-500 text-[3vw] lg:text-sm Cliquer">Se connecter</Link></p>
                    </form>
                    <p id="solgan" className="lg:text-3xl text-center text-[4vw] text-[#00c3ff]">"Faites résonner votre passion."</p>
                </div>
            </section>
            {/* MOBILE */}
            <section id="SignInSection" className="relative hidden w-full h-screen lg:flex flex-col lg:flex-row  lg:justify-evenly justify-start pt-[6vw] gap-[4vw] items-center bg-[#0B0E14] SignInSection">
                <div className="logo flex flex-col justify-center items-center">
                    <img src="../src/assets/unnamed-removebg-preview.png" alt="Logo Mooz'hika" className="w-[15vw] h-[15vw] bg-white rounded-full p-0" />
                    <p id="solgan" className="text-3xl text-[#00c3ff]">"Faites résonner votre passion."</p>
                </div>
                <div className="formulaire">
                    <form method="POST" encType="multipart/form-data" id="formSignIn" className="flex flex-col w-[25vw] h-[36vw] bg-[#0b0e144f] p-[1vw] rounded-[1vw] gap-[2vw]"
                        onSubmit={HandleSubmit}
                    >
                        <h1 id="inscription" className="text-[2vw] text-white text-center">Inscrivez-vous</h1>
                        <div className="ipt1 relative">
                            <input className="text-black text-[1vw]" type="text" name="nom" id="nom" required
                                onChange={(e) => setNom(e.target.value)}

                            />
                            <User className="absolute top-[0.2vw] left-1 UserIcon text-black" />
                            <label htmlFor="nom" id="labelNom">Nom</label>
                        </div>
                        <div className="ipt1 relative">
                            <input className="text-black text-[1vw]" type="text" name="prenom" id="prenom" required
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                            <User className="absolute top-[0.2vw] left-1 UserIcon text-black" />
                            <label htmlFor="prenom" id="labelPrenom">Prénom</label>
                        </div>
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
                        <input className="text-black text-[1vw]" type="file" name="image" id="image" hidden required
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <label htmlFor="image" id="labelImage" className="flex gap-1.5 items-center cursor-pointer">
                            <ImagePlus className="MailIcon" /> Photo de profil
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