import { useEffect, useRef, useState } from "react";
import NavigationBar from "./NavigationBar";
import axios from "axios";
import { SendIcon } from "lucide-react";

function Contact() {
    const [modalOpen, setModalOpen] = useState(false)
    const InputFocusRef = useRef()
    const [InputSearch, setInputSearch] = useState(false)
    const [Search, setSearch] = useState("")
    const [User, setUser] = useState()
    const [status, setStatus] = useState([])
    // SEND MAIL INFO
    const [Username, setUsername] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserObject, setUserObject] = useState("")
    const [UserMessage, setUserMessage] = useState("")
    const [notif, setNotif] = useState(JSON.parse(localStorage.getItem("ProduitDansPanier")) ? JSON.parse(localStorage.getItem("ProduitDansPanier")).length : 0)
    const handleClick = () => {
        setModalOpen(true)
    }
    const handleSearchClick = () => {
        setInputSearch(true)
        console.log(InputSearch)
        InputFocusRef.current.focus()
    }
    const HandleSearch = (e) => {
        setSearch(e.target.value)
    }
    const fetchDrumData = async () => {
        try {
            const data = await axios.get("http://localhost:8000/Drum", { withCredentials: true })
            setUser(data.data.User)
            // console.log(User)
            // console.log(data.data.User)
            if (data.data.status === 405) {
                navigate("/Login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchCommand = async () => {
        try {
            const response = await axios.get("http://localhost:8000/Product", { withCredentials: true })
            // console.log(response.data)
            setStatus(response.data)
            // console.log(status)
            // console.log(JSON.parse(localStorage.getItem("ProduitDansPanier")))
            setNotif(JSON.parse(localStorage.getItem("ProduitDansPanier")).length)
        } catch (error) {
            console.log(error)
        }
    }
    const sendMail=async(e)=>{
        e.preventDefault()
        try {
            const data = {
                name:Username,
                email:UserEmail,
                object:UserObject,
                message:UserMessage
            }
            const response = await axios.post("http://localhost:8000/Contact",data,{withCredentials:true})
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDrumData()
        fetchCommand()
    }, [])
    return (
        <>
            <NavigationBar
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleClick={handleClick}
                handleSearchClick={handleSearchClick}
                InputSearch={InputSearch}
                setSearch={setSearch}
                HandleSearch={HandleSearch}
                Search={Search}
                User={User}
                InputFocusRef={InputFocusRef}
                setInputSearch={setInputSearch}
                status={status}
                notif={notif}
            />
            <section className="py-14 lg:py-24 lg:px-14 md:py-40 px-5 bg-bgFah lg:h-screen  w-full h-auto">
                <h1 className="text-3xl md:mb-6 md:text-5xl text-center text-cyan-700">Contactez-nous</h1>
                <div className="flex flex-col px-14 w-full h-full  lg:justify-start lg:items-center lg:flex-row">
                    <div>
                        <p className="text-base md:text-xl lg:text-base text-navbar">Nous sommes ravis de recevoir votre messages !</p>
                        <p className="text-base md:text-xl lg:text-base text-navbar">Que ce soit pour poser une question , nous envoyer une suggestion ou signaler un problème , notre équipe vous répondra dans les plus brefs délais.</p>
                        <p className="text-base md:text-xl lg:text-base text-navbar">Merci de remplir le formulaire ci dessous pour que nous puissions vous répondre efficacement.</p>
                    </div>
                    <form action="" className="w-full lg:w-[90%] md:ml-[14vw] lg:ml-[32vw] md:mt-7 bg-bgFah md:w-[70%] rounded-md flex flex-col lg:gap-0 gap-3 py-4 px-3 shadow shadow-shadowBox" onSubmit={sendMail}>
                        <label htmlFor="Nom" className="text-base text-navbar md:text-lg lg:text-[1vw]">Nom :</label>
                        <input type="text" id="Nom" name="Nom" className="text-base lg:p-2 lg:text-[1vw] md:h-16 md:text-lg text-bgFah bg-navbar rounded-md lg:h-8 h-8" placeholder="Votre nom ..." onChange={(e)=>setUsername(e.target.value)} />
                        <label htmlFor="Email" className="text-base text-navbar md:text-lg lg:text-[1vw]">Email :</label>
                        <input type="email" name="Email" id="Email" className="text-base lg:p-2  lg:text-[1vw] md:h-16 md:text-lg text-bgFah bg-navbar rounded-md lg:h-8 h-8" placeholder="Votre email ..." onChange={(e)=>setUserEmail(e.target.value)}/>
                        <label htmlFor="Objet" className="text-base text-navbar md:text-lg lg:text-[1vw]">Objet :</label>
                        <input type="text" id="Objet" className="text-base lg:p-2  lg:h-8 md:h-16 lg:text-[1vw] md:text-lg text-bgFah bg-navbar rounded-md h-8" placeholder="L'objet de votre email ..." onChange={(e)=>setUserObject(e.target.value)} />
                        <label htmlFor="Message" className="text-base text-navbar lg:text-[1vw] md:text-lg">Message :</label>
                        <textarea name="Message" id="Message" placeholder="Votre message ..." className="px-3 bg-navbar rounded-md md:text-lg lg:text-[1vw] text-bgFah" onChange={(e)=>setUserMessage(e.target.value)} rows={5}></textarea>
                        <button className="flex lg:mt-4 gap-2 lg:!h-4 justify-center lg:text-[1vw] md:h-16 md:mt-7 md:text-xl mt-3 text-base btn btn-success text-white">
                            Envoyé
                            <SendIcon size={18} />
                        </button>
                    </form>
                </div>
            </section>

        </>
    )
}

export default Contact;