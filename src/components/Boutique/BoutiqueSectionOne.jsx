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
    const HandleSearch = (e) => {
        setSearch(e.target.value)
        // fetchAllAccessoriesData()
        // const fetchAllAccessoriesData = () => {
        fetch(`http://localhost:8000/Accessories?accessoire=${e.target.value}&page=${page}&limit=8`)
            .then(res => res.json())
            .then(SearchData => {
                // console.log(SearchData.SearchResponse)
                const Drum = SearchData.SearchResponse.filter(d => d.category === "drum")
                const Accessories = SearchData.SearchResponse.filter(d => d.category !== "drum")
                // const Accessories = SearchData.SearchResponse.filter(d => d.category === "accessoriesOne" || d.category === "accessoriesTwo")
                setDrumData(Drum)
                setAccessoriesOne(Accessories)
            })
            .catch(err => console.log(err))
        // }
        // fetchAllAccessoriesData()
    }
    // console.log(AccessoriesOne)
    useEffect(() => {
        fetchAccessoriesOneData()
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
            />
            <section className="w-full h-auto py-[9vw]  flex flex-col justify-center gap-[3vw]">
                <h1 className="text-cyan-700 text-5xl text-center font-bold">Batteries</h1>
                <div className="">
                    <Swiper spaceBetween={10} slidesPerView={2} modules={[Navigation, Pagination]} navigation className="px-[3vw]!" observer={true} observeParents={true}>
                        {DrumData.length > 0 ? (DrumData.map(drum => (
                            <SwiperSlide>
                                <div className="w-[40vw] h-[20vw] bg-[#0B0E14] flex rounded-[1.6vw] overflow-hidden border-2 border-[#0B0E14]" key={drum.id}>
                                    <div className="w-1/2 p-6 flex flex-col gap-5">
                                        <h1 className="text-[1.3vw] text-white">{drum.name}</h1>
                                        <p className="text-[.8vw] flex-1 text-white Describes">{drum.describes}</p>
                                        <Link to={`/Produit/${drum.id}`} className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full flex justify-center ">Voir le produit</Link>
                                    </div>
                                    <img src={`../src/assets/images/${drum.pics}`} alt="" className="w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                                </div>
                            </SwiperSlide>
                        ))) : (
                            <div className="flex gap-4 justify-center items-center">
                                <PackageOpenIcon className="PackageOpenIcon text-white" />
                                <h1 className="text-[1.5vw] text-white">Oups ! l'article n'existe pas en ce moment</h1>
                            </div>
                        )}
                    </Swiper>
                </div>
            </section>
            <section className="w-full h-auto bg-[#0B0E14] relative pt-[12vw] pb-[4vw] pl-[7vw] border-b-[.1vw] border-[#ffffff23] flex flex-col items-center gap-[3vw]">
                <h1 className="text-cyan-700 text-5xl text-center top-[4vw] left-[39vw] absolute font-bold">Accessoires</h1>
                <div className="flex gap-[4vw] flex-wrap">
                    {AccessoriesOne.length > 0 ? (AccessoriesOne.map(accessories => (
                        <div className="w-[18vw] h-[28vw] bg-[#0B0E14] shadow-[0_0_.2vw_white] shadow-white p-2 flex flex-col gap-2 rounded-[.3vw]" key={accessories.id}>
                            <img src={`../src/assets/images/${accessories.pics}`} alt="" className="h-1/2 w-full" />
                            <div className="flex flex-col gap-2 w-full h-1/2">
                                <h2 className="text-[1.1vw] text-center text-cyan-600">{accessories.name}</h2>
                                <p className="text-[.9vw] flex-1 text-white AccessoriesOne text-justify">{accessories.describes}</p>
                                <Link to={`/Produit/${accessories.id}`} className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full flex justify-center ">Voir le produit</Link>
                            </div>
                        </div>
                    ))) : (
                        <div className="flex w-screen h-[18vw] relative">
                            <div className=" gap-4 items-center justify-between absolute flex left-[27vw]">
                                <PackageOpenIcon className="PackageOpenIcon text-white" />
                                <h1 className="text-[1.5vw] text-white flex-1 ">Oups ! l'article n'existe pas en ce moment</h1>
                            </div>
                        </div>
                    )}
                </div>
                {AccessoriesOne.length > 0 ? (<div className="flex justify-center items-center pr-[7vw] gap-[2vw] w-full h-[2vw]">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={page === 1 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowLeftIcon className="Usercircle" />
                    </button>
                    {Page.map(nbrPage => (
                        <button key={nbrPage} id={page === nbrPage ? "active" : ""} onClick={() => setPage(nbrPage)} className="text-[1vw]">{nbrPage}</button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === 6} className={page === 6 ? "opacity-25" : "opacity-100"}>
                        <SquareArrowRightIcon className="Usercircle" />
                    </button>
                </div>) : ""}
                
            </section>
            
            <HomeSectionFooter />
        </>
    )
}

export default Boutique;