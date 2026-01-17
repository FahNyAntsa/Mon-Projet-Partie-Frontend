function HomeSectionThree() {
    return (
        <>
            <section className="w-full h-auto bg-cyan-700 py-[4vw] flex flex-col gap-[5vw] lg:gap-[3vw] items-center lg:px-[4vw] px-[6vw]">
                <h1 className="text-[10vw] lg:text-6xl text-white text-center">Témoignages</h1>
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-2">
                    <div className="flex lg:flex-col w-full lg:w-[22vw] lg:border-r-2 gap-3">
                        <img src="../src/assets/zoky-2.png" alt="" className="lg:w-[6vw] lg:h-[6vw] rounded-full w-[12vw] h-[12vw]" />
                        <div className="flex flex-col">
                            <p className="text-[3vw] lg:text-[1vw] text-white flex-1 italic">" Tena hafa-po be tamin'ny entana nalefanareo aho.Madio be ny feon'ilay "batterie" sady aingana ny livraison."</p>
                            <span className="text-black font-bold text-[2.5vw] lg:text-sm"> Christian Ratsimiseta</span>
                        </div>
                    </div>
                    <hr className="lg:hidden"/>
                    <div className="flex lg:flex-col w-full lg:w-[22vw] lg:border-r-2 gap-3">
                        <img src="../src/assets/zoky-1.png" alt="" className="lg:w-[6vw] lg:h-[6vw] rounded-full w-[12vw] h-[12vw]" />
                        <div className="flex flex-col">
                            <p className="text-[3vw] lg:text-[1vw] text-white flex-1 italic">"Tsara kalitao be ny accessoires ! Nividy baguette sy peau aho efa ela,hatramin'izao mbola maharitra tsara."</p>
                            <span className="text-black font-bold text-[2.5vw] lg:text-sm">Toky Randria</span>
                        </div>
                    </div>
                    <hr className="lg:hidden"/>
                    {/* <hr className="lg:hidden"/> */}
                    <div className="flex lg:flex-col w-full lg:w-[22vw] lg:border-r-2 gap-3">
                        <img src="../src/assets/sheila_e.jpg" alt="" className="lg:w-[6vw] lg:h-[6vw] rounded-full w-[12vw] h-[12vw]" />
                        <div className="flex flex-col">
                            <p className="text-[3vw] lg:text-[1vw] text-white flex-1 italic">" Mahafinaritra ny service-client.Nomen'iry zareo toro-hevitra tsara aho alohan'ny nividianako batterie hoan'ny zanako."</p>
                            <span className="text-black font-bold text-[2.5vw] lg:text-sm">Suzie Razanakolona</span>
                        </div>
                    </div>
                    <hr className="lg:hidden"/>
                    <div className="flex lg:flex-col w-full lg:w-[22vw] lg:border-r-2 gap-3">
                        <img src="../src/assets/zoky-lunette.png" alt="" className="lg:w-[6vw] lg:h-[6vw] rounded-full w-[12vw] h-[12vw]" />
                        <div className="flex flex-col">
                            <p className="text-[3vw] lg:text-[1vw] text-white flex-1 italic">" Sérieux tsara ny site Aponga Maro Anaka ! ,Araka ny sary sy ny déscription mihitsy ny vokatra , hiverina hividy indray aho @ manaraka"</p>
                            <span className="text-black font-bold text-[2.5vw] lg:text-sm">Jean Jacques</span>
                        </div>
                    </div>
                    {/* <hr className="lg:hidden"/> */}
                </div>
            </section>
        </>
    )
}

export default HomeSectionThree;