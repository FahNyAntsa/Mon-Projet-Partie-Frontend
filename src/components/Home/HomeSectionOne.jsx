import { Link } from "react-router-dom";
import { useState } from "react";
import HomeNavigationBar from "./HomeNavigationBar";
import HomeNavigationBarUsers from "./HomeNavigationBarUsers";
import { useEffect } from "react";
import axios from "axios";
function HomeSectionOne() {
    const [modalOpen, setModalOpen] = useState(false)
    const [User, setUser] = useState()
    const [InputSearch, setInputSearch] = useState(false)
    // const [notif,setNotif]=useState(JSON.parse(localStorage.getItem("ProduitDansPanier")).length)
    const [notif,setNotif]=useState(JSON.parse(localStorage.getItem("ProduitDansPanier")) ? JSON.parse(localStorage.getItem("ProduitDansPanier")).length : 0)

    const handleClick = () => {
        setModalOpen(true)
    }
    const handleSearchClick = () => {
        setInputSearch(true)
        console.log(InputSearch)
    }
    const fetchDrumData = async () => {
        try {
            const data = await axios.get("http://localhost:8000/Drum", { withCredentials: true })
            //   setDrumData(data.data.Drum)
            setUser(data.data.User)
            console.log(data.data.User)
            if (data.data.status === 405) {
                navigate("/Login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchDrumData()
    }, [])
    // console.log(User)
    return (
        <>
            {User ? <HomeNavigationBarUsers notif={notif} modalOpen={modalOpen} setModalOpen={setModalOpen} handleClick={handleClick} User={User} /> : <HomeNavigationBar />}
            <section
                className="w-full  h-screen  flex justify-center items-center flex-col gap-9 SignInSection" id="SignInSection"
                onClick={() => { setInputSearch(false) }}
            >
                <div className="flex w-[90%] lg:w-[43vw]">
                    <div className="flex flex-col gap-[1vw] w-full bg-amber-400 p-[2vw] rounded-[1vw] Bienvenu">
                        <h1 className="text-white lg:flex-none text-[8vw] lg:text-[2.5vw]  font-bold">Bienvenue sur
                            <span className="text-[#00FFFF] text-[8vw] lg:text-[2.5vw]"> Aponga maro Anaka</span>
                        </h1>
                        <p className="lg:w-[39.2vw] lg:text-justify text-white text-[4vw] lg:text-[1.1vw]">Votre boutiques spécialisée dans les batteries acoustiques et éléctroniques modernes et leurs accessoires.Nous vous proposons des produits fiables performants et adaptés à tous les niveaux , du débutant au batteur professionel.</p>
                        <div className="w-full">
                            <button
                                className="text-white text-[4vw] w-full lg:w-[70%] lg:ml-[6vw] lg:text-[1.2vw] bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-6 py-2 rounded-[.5vw]"
                            >
                                {User ? <Link to={"/Boutique"}>Acheter maintenant</Link> : <Link to={"/Login"}>Acheter maintenant</Link>}
                            </button>
                        </div>
                    </div>
                    {/* <div>
                        <img src="../src/assets/snaredrum_233695612_1000-removebg-preview.png" className="w-[45vw] h-[30vw] " alt="" />
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default HomeSectionOne;