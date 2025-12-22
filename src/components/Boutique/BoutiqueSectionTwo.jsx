import axios from "axios";
import { useEffect, useState } from "react";


function BoutiqueSectionTwo() {
    const [AccessoriesOne, setAccessoriesOne] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    useEffect(() => {
        const fetchAccessoriesOneData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/AccessoriesOne")
                console.log(response.data)
                setAccessoriesOne(response.data)
            } catch (error) {
                console.log(`une erreur ${error} s'est produit`)
            }
        }
        fetchAccessoriesOneData()
    }, [])
    return (
        <>
            <section className="w-full bg-[#0B0E14] py-[4vw] pl-[7vw] flex flex-col justify-center items-center gap-[3vw]" >
                <h1 className="text-cyan-700 text-5xl text-center mr-[5vw] font-bold">Accessoires</h1>
                <div className="flex gap-[4vw] flex-wrap">
                    {AccessoriesOne.map(accessories => (
                        <div className="w-[18vw] h-[28vw] bg-[#0B0E14] shadow-[0_0_.2vw_white] shadow-white p-2 flex flex-col gap-2 rounded-[.3vw]" key={accessories.id}>
                            <img src={`../src/assets/images/${accessories.pics}`} alt="" className="h-1/2 w-full" />
                            <div className="flex flex-col gap-2 w-full h-1/2">
                                <h2 className="text-[1.1vw] text-center text-white">{accessories.name}</h2>
                                <p className="text-[.9vw] flex-1 text-white AccessoriesOne text-justify">{accessories.describes}</p>
                                <button className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Voir le produit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default BoutiqueSectionTwo;