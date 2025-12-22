import { Star } from "lucide-react";
function HomeSectionTwo() {
    return (
        <>
            <section className="w-full bg-[#0B0E14] h-[150vh] flex justify-between items-center gap-[2vw] px-[4vw] flex-col py-[8vw] relative ">
                <h1 className="text-6xl text-white absolute right-[15vw] top-[11vw]">Nos Produits</h1>
                <div className="w-1/3 h-[16vw] bg-[#ffffff] shadow absolute left-[4vw] rounded-[1.5vw] flex  overflow-hidden" >
                    <div className="w-1/2 p-3 flex flex-col gap-1">
                        <h1 className="text-[1.3vw] text-black">Tama Super Star Hyper Drive</h1>
                        <p className="text-[.8vw] flex grow">Tama super star Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente officiis alias consequatur ullam!</p>
                        <div className="flex gap-1">
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                        </div>
                        <button className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                    </div>
                    <img src="../src/assets/images/51hfcf2wbdL._AC_UF1000,1000_QL80_.jpg" alt="" className="w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                </div>
                <div className="w-1/3 h-[16vw] bg-[#ffffff]  shadow absolute left-[32vw] top-[28vw] rounded-[1.5vw] flex  overflow-hidden">
                    <div className="w-1/2 p-3 flex flex-col gap-1">
                        <h1 className="text-[1.3vw] text-black">Meinl MCS serie</h1>
                        <p className="text-[.8vw] flex-1">Meinl MCS serie Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus a possimus esse dolorum in autem illo facere quasi ipsa culpa!</p>
                        <div className="flex gap-1">
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                        </div>
                        <button className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                    </div>
                    <img src="../src/assets/images/meinl-mcs-special-set_1_DRU0036657-000.jpg" alt="" className="w-[25vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                </div>
                <div className="w-1/3 h-[16vw] bg-[#ffffff]  shadow absolute right-[4vw] top-[48vw] rounded-[1.5vw] flex  overflow-hidden">
                  <div className="w-1/2 p-3 flex flex-col gap-1">
                        <h1 className="text-[1.3vw] text-black">Gibraltar Hardware</h1>
                        <p className="text-[.8vw] flex-1">Gibraltar Hardware Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus a possimus esse dolorum in autem illo!</p>
                        <div className="flex gap-1">
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                            <Star className="Star"/>
                        </div>
                        <button className="text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                    </div>
                    <img src="../src/assets/images/Gibraltar-5700_-Gig_Hardware-Pack.jpg" alt="" className="w-[25vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                </div>

            </section>
        </>
    )
}

export default HomeSectionTwo;