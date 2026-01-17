import { Star } from "lucide-react";
function HomeSectionTwo() {
    return (
        <>
            <section className="w-full bg-bgFah h-auto lg:h-[70vw] lg:h-[150vh] flex lg:justify-between items-center gap-[2vw] px-[6vw] lg:px-[4vw] flex-col py-[4vw] lg:py-[8vw] lg:relative ">
                <h1 className="lg:text-6xl text-[10vw] text-navbar lg:absolute right-[15vw] top-[11vw]">Nos Produits</h1>
                <div className="lg:w-1/3 w-full h-auto lg:h-[16vw] bg-bgFah  shadow shadow-shadowBox lg:absolute left-[4vw] rounded-[1.5vw] flex  overflow-hidden" >
                    <div className="w-1/2 p-3 flex flex-col gap-1">
                        <h1 className="lg:text-[1.3vw] text-[5vw] text-navbar">Tama Super Star Hyper Drive</h1>
                        <p className="lg:text-[.8vw] text-[3vw] text-para flex grow">Tama super star Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente officiis alias consequatur ullam!</p>
                        <div className="flex gap-1">
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                        </div>
                        <button className="text-[3.4vw] lg:text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                    </div>
                    <img src="../src/assets/images/51hfcf2wbdL._AC_UF1000,1000_QL80_.jpg" alt="" className="w-1/2 lg:w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                </div>
                <div className="lg:w-1/3 w-full h-auto lg:h-[16vw] bg-bgFah  shadow shadow-shadowBox lg:absolute left-[32vw] top-[28vw] rounded-[1.5vw] flex  overflow-hidden" >
                    <div className="w-1/2 p-3 flex flex-col gap-1">
                        <h1 className="lg:text-[1.3vw] text-[5vw] text-navbar">Meinl MCS serie</h1>
                        <p className="lg:text-[.8vw] text-[3vw] text-para flex grow">Meinl MCS serie Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus a possimus esse dolorum in autem illo facere quasi ipsa culpa!</p>
                        <div className="flex gap-1">
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                        </div>
                        <button className="text-[3.4vw] lg:text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                    </div>
                    <img src="../src/assets/images/meinl-mcs-special-set_1_DRU0036657-000.jpg" alt="" className="w-1/2 lg:w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                </div>
                <div className="lg:w-1/3 w-full h-auto lg:h-[16vw] bg-bgFah  shadow shadow-shadowBox lg:absolute right-[4vw] top-[48vw] rounded-[1.5vw] flex  overflow-hidden" >
                    <div className="w-1/2 p-3 flex flex-col gap-1">
                        <h1 className="lg:text-[1.3vw] text-[5vw] text-navbar">Gibraltar Hardware</h1>
                        <p className="lg:text-[.8vw] text-[3vw] text-para flex grow">Gibraltar Hardware Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus a possimus esse dolorum in autem illo!</p>
                        <div className="flex gap-1">
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                            <Star className="Star w-[4vw] lg:w-[1.2vw]"/>
                        </div>
                        <button className="text-[3.4vw] lg:text-[.9vw] text-white bg-[linear-gradient(90deg,#00c6ff,#0072ff)] px-4 py-[.1vw] rounded-[.2vw] w-full">Acheter</button>
                    </div>
                    <img src="../src/assets/images/Gibraltar-5700_-Gig_Hardware-Pack.jpg" alt="" className="w-1/2 lg:w-[20vw] image transform hover:scale-[1.1] transition-all duration-300 cursor-pointer" />
                </div>
            </section>
        </>
    )
}

export default HomeSectionTwo;