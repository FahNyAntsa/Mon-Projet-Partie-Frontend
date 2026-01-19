import { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios"
import HomeSectionFooter from "../Home/HomeSectionFooter"
import { BoxSelect, LassoSelect, LucideOption, Option, PackageOpenIcon, SquareArrowLeftIcon, SquareArrowRightIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
function Boutique() {
    const [modalOpen, setModalOpen] = useState(false)
    const [InputSearch, setInputSearch] = useState(false)
    const [DrumData, setDrumData] = useState([])
    const [Search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [NombreTotalDePage, setNombreTotalDePage] = useState([])
    const InputFocusRef = useRef()
    const navigate = useNavigate()
    const [AccessoriesOne, setAccessoriesOne] = useState([])
    const [User, setUser] = useState()
    const [status, setStatus] = useState([])
    const [notif, setNotif] = useState(JSON.parse(localStorage.getItem("ProduitDansPanier")) ? JSON.parse(localStorage.getItem("ProduitDansPanier")).length : 0)
    // const [notif, setNotif] = useState(JSON.parse(localStorage.getItem("ProduitDansPanier")).length)
    const handleClick = () => {
        setModalOpen(true)
    }
    const handleSearchClick = () => {
        setInputSearch(true)
        console.log(InputSearch)
        InputFocusRef.current.focus()
    }
    const fetchDrumData = async () => {
        try {
            const data = await axios.get("http://localhost:8000/Drum", { withCredentials: true })
            setDrumData(data.data.Drum)
            setUser(data.data.User)
            console.log(data.data)
            if (data.data.status === 405) {
                navigate("/Login")
            }
        } catch (error) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchDrumData();
    }, [])
    const fetchAccessoriesOneData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/AccessoriesOne?page=${page}&limit=8`, { withCredentials: true })
            // console.log(response.data)
            // console.log(response.data.Drum)
            if (response.data.status === 405) {
                navigate("/Login")
            }
            setAccessoriesOne(response.data.Drum)
            setNombreTotalDePage(response.data.nombreTotalDePage)
        } catch (error) {
            console.log(`une erreur ${error} s'est produit`)
        }
    }
    const fetchCommand = async () => {
        try {
            const response = await axios.get("http://localhost:8000/Product", { withCredentials: true })
            // console.log(response.data)
            setStatus(response.data)
            // console.log(status)
        } catch (error) {
            console.log(error)
        }
    }
    const HandleSearch = (value) => {
        setSearch(value)
        // fetchAllAccessoriesData()
        // const fetchAllAccessoriesData = () => {
        fetch(`http://localhost:8000/Accessories?accessoire=${value}&page=${page}&limit=8`)
            .then(res => res.json())
            .then(SearchData => {
                // console.log(SearchData.SearchResponse)
                const Drum = SearchData.SearchResponse.filter(d => d.category === "drum")
                const Accessories = SearchData.SearchResponse.filter(d => d.category !== "drum")
                // const Accessories = SearchData.SearchResponse.filter(d => d.category === "accessoriesOne" || d.category === "accessoriesTwo")
                setDrumData(Drum)
                setAccessoriesOne(Accessories)
                if (value === "") {
                    fetchAccessoriesOneData()
                }
            })
            .catch(err => console.log(err))
        // }
        // fetchAllAccessoriesData()
    }
    // console.log(AccessoriesOne)
    useEffect(() => {
        fetchAccessoriesOneData()
        fetchCommand()
        // fetchAllAccessoriesData()
    }, [page])
    const Page = Array.from({ length: NombreTotalDePage }, (_, index) => index + 1)
    // console.log(page)
    return (
        <>
            <NavigationBar
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                handleClick={handleClick}
                handleSearchClick={handleSearchClick}
                InputSearch={InputSearch}
                setSearch={setSearch}
                Search={Search}
                User={User}
                fetchAccessoriesOneData={fetchAccessoriesOneData}
                InputFocusRef={InputFocusRef}
                HandleSearch={HandleSearch}
                fetchDrumData={fetchDrumData}
                setInputSearch={setInputSearch}
                status={status}
                notif={notif}
            />
            <section className="w-full h-auto md:py-[16vw] py-[12vw] lg:py-[9vw] bg-white  flex flex-col justify-center gap-[3vw]">
                <h1 className="text-cyan-700 lg:text-5xl text-[10vw] text-center font-bold">Batteries</h1>
                <div className=" lg:hidden ">
                    {/* MOBILE */}
                    <Swiper spaceBetween={10} slidesPerView={1} modules={[Navigation, Pagination]} navigation className="!ml-[6vw]!" observer={true} observeParents={true}>
                        {DrumData.length > 0 ? (DrumData.map(drum => (
                            <SwiperSlide>
                                <div className="lg:w-[40vw] lg:h-[20vw] h-auto w-[100%]  bg-[#0B0E14] flex rounded-[1.6vw] overflow-hidden border-2 border-[#0B0E14]" key={drum.id}>
                                    <div className="w-1/2 p-6 flex flex-col gap-5">
                                        <h1 className="text-[3.5vw] text-white">{drum.name}</h1>
                                        <p className="text-[2.5vw] flex-1 text-white Describes">{drum.describes}</p>
                                        <Link to={`/Produit/${drum.id}`} className="text-[3vw] h-7 text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw]  w-full flex items-center rounded-2xl justify-center ">Voir le produit</Link>
                                    </div>
                                    <img src={`http://localhost:8000/upload/products/${drum.pics}`} alt="" className="w-1/2 image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                                </div>
                            </SwiperSlide>
                        ))) : (
                            <div className="flex gap-4 !ml-[20vw] mr-[12vw] justify-center items-center">
                                <PackageOpenIcon className=" text-black" size={120} />
                                <h1 className="text-[5vw] text-black">Oups ! l'article n'existe pas en ce moment</h1>
                            </div>
                        )}
                    </Swiper>
                </div>
                {/* MOBILE FIN */}
                <div className="hidden lg:block">
                    <Swiper spaceBetween={10} slidesPerView={2} modules={[Navigation, Pagination]} navigation className="px-[3vw]!" observer={true} observeParents={true}>
                        {DrumData.length > 0 ? (DrumData.map(drum => (
                            <SwiperSlide>
                                <div className="w-[40vw] h-[20vw] bg-[#0B0E14] flex rounded-[1.6vw] overflow-hidden border-2 border-[#0B0E14]" key={drum.id}>
                                    <div className="w-1/2 p-6 flex flex-col gap-5">
                                        <h1 className="text-[1.3vw] text-white">{drum.name}</h1>
                                        <p className="text-[.8vw] flex-1 text-white Describes">{drum.describes}</p>
                                        <Link to={`/Produit/${drum.id}`} className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full flex justify-center ">Voir le produit</Link>
                                    </div>
                                    <img src={`http://localhost:8000/upload/products/${drum.pics}`} alt="" className="w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                                </div>
                            </SwiperSlide>
                        ))) : (
                            <div className="flex gap-4 h-[18vw] justify-center items-center">
                                <PackageOpenIcon className="PackageOpenIcon text-black" size={60} />
                                <h1 className="text-[1.5vw] text-black">Oups ! l'article n'existe pas en ce moment</h1>
                            </div>
                        )}
                    </Swiper>
                </div>
            </section>
            <section className="w-full h-auto bg-bgFah relative pt-[4vw] lg:pt-[12vw] pb-[12vw] lg:pb-[4vw] pl-[3vw] lg:pl-[7vw] border-b-[.1vw] border-[#ffffff23]  flex flex-col items-center gap-[3vw]">
                <h1 className="text-cyan-700 lg:text-5xl text-[10vw] text-center top-[4vw] left-[39vw] lg:absolute font-bold">Accessoires</h1>
                <div className="flex gap-[3vw] lg:hidden flex-wrap">
                    {AccessoriesOne.length > 0 ? (AccessoriesOne.map(accessories => (
                        <div className="w-[45vw] h-[90vw] bg-bgFah shadow-shadowBox shadow  p-2 flex flex-col gap-2 rounded-[.3vw]" key={accessories.id}>
                            <img src={`http://localhost:8000/upload/products/${accessories.pics}`} alt="" className="h-1/2 w-full" />
                            <div className="flex flex-col gap-2 w-full h-1/2">
                                <h2 className="text-[3.5vw] text-center text-cyan-600">{accessories.name}</h2>
                                <p className="text-[2.5vw] flex-1 text-para AccessoriesOne text-justify">{accessories.describes}</p>
                                <Link to={`/Produit/${accessories.id}`} className="text-[3vw] h-7 rounded-2xl text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] items-center w-full flex justify-center ">Voir le produit</Link>
                            </div>
                        </div>
                    ))) : (
                        <div className="flex w-screen h-[18vw] !mr-[17vw] relative">
                            <div className=" gap-4 items-center justify-between absolute flex left-[27vw]">
                                <PackageOpenIcon className=" text-navbar" size={60} />
                                <h1 className="text-[5vw] text-navbar flex-1 ">Oups ! l'article n'existe pas en ce moment</h1>
                            </div>
                        </div>
                    )}
                </div>
                {AccessoriesOne.length > 0 ? (<div className="flex lg:hidden !mt-[2vw] justify-center items-center pr-[7vw] gap-[2vw] w-full h-[2vw]">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? "opacity-25" : "opacity-100 text-Th"}>
                        <SquareArrowLeftIcon className="" size={20} />
                    </button>
                    {Page.map(nbrPage => (
                        <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="text-[3vw] text-Th">{nbrPage}</button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === 6} className={page === 6 ? "opacity-25" : "opacity-100 text-Th"}>
                        <SquareArrowRightIcon className="" size={20} />
                    </button>
                </div>) : ""}
                {/* MOBILE FIN */}
                <div className="hidden lg:flex gap-[4vw] flex-wrap">
                    {AccessoriesOne.length > 0 ? (AccessoriesOne.map(accessories => (
                        <div className="w-[18vw] h-[28vw] bg-bgFah shadow-shadowBox shadow  p-2 flex flex-col gap-2 rounded-[.3vw]" key={accessories.id}>
                            <img src={`http://localhost:8000/upload/products/${accessories.pics}`} alt="" className="h-1/2 w-full" />
                            <div className="flex flex-col gap-2 w-full h-1/2">
                                <h2 className="text-[1.1vw] text-center text-cyan-600">{accessories.name}</h2>
                                <p className="text-[.9vw] flex-1 text-para AccessoriesOne text-justify">{accessories.describes}</p>
                                <Link to={`/Produit/${accessories.id}`} className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full flex justify-center ">Voir le produit</Link>
                            </div>
                        </div>
                    ))) : (
                        <div className="flex w-screen h-[18vw] relative">
                            <div className=" gap-4 items-center justify-between absolute flex left-[27vw]">
                                <PackageOpenIcon className="PackageOpenIcon text-navbar" />
                                <h1 className="text-[1.5vw] text-navbar flex-1 ">Oups ! l'article n'existe pas en ce moment</h1>
                            </div>
                        </div>
                    )}
                </div>
                {AccessoriesOne.length > 0 ? (<div className="lg:flex hidden  justify-center items-center pr-[7vw] gap-[2vw] w-full h-[2vw]">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? "opacity-25" : "opacity-100 text-Th"}>
                        <SquareArrowLeftIcon className="Usercircle" />
                    </button>
                    {Page.map(nbrPage => (
                        <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="text-[1vw] text-Th">{nbrPage}</button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === 6} className={page === 6 ? "opacity-25" : "opacity-100 text-Th"}>
                        <SquareArrowRightIcon className="Usercircle" />
                    </button>
                </div>) : ""}

            </section>

            <HomeSectionFooter />
        </>
    )
}

export default Boutique;