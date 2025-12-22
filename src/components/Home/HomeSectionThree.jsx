function HomeSectionThree() {
    return (
        <>
            <section className="w-full h-[65vh] bg-cyan-700 py-[4vw] flex flex-col gap-[3vw] items-center px-[4vw]">
                <h1 className="text-6xl text-white text-center">Témoignages</h1>
                <div className="flex gap-2">
                    <div className="flex flex-col w-[22vw] border-r-2 gap-3">
                        <img src="../src/assets/zoky-2.png" alt="" className="w-[6vw] h-[6vw] rounded-full" />
                        <p className="text-[1vw] text-white flex-1 italic">" Tena hafa-po be tamin'ny entana nalefanareo aho.Madio be ny feon'ilay "batterie" sady aingana ny livraison."</p>
                        <span className="text-black font-bold text-sm"> Christian Ratsimiseta</span> 
                    </div>
                    <div className="flex flex-col w-[22vw] border-r-2 gap-3">
                        <img src="../src/assets/zoky-1.png" alt="" className="w-[6vw] h-[6vw] rounded-full" />
                        <p className="text-[1vw] text-white flex-1 italic">" Tsara kalitao be ny accessoires ! Nividy baguette sy peau aho efa ela,hatramin'izao mbola maharitra tsara."</p>
                        <span className="text-black font-bold text-sm"> Toky Randria</span> 
                    </div>
                    <div className="flex flex-col w-[22vw] border-r-2 gap-3">
                        <img src="../src/assets/sheila_e.jpg" alt="" className="w-[6vw] h-[6vw] rounded-full" />
                        <p className="text-[1vw] text-white flex-1 italic">" Mahafinaritra ny service-client.Nomen'iry zareo toro-hevitra tsara aho alohan'ny nividianako batterie hoan'ny zanako."</p>
                        <span className="text-black font-bold text-sm">Suzie Razanakolona</span> 
                    </div>
                    <div className="flex flex-col w-[22vw] gap-3">
                        <img src="../src/assets/zoky-lunette.png" alt="" className="w-[6vw] h-[6vw] rounded-full" />
                        <p className="text-[1vw] text-white flex-1 italic">" Sérieux tsara ny site Aponga Maro Anaka ! ,Araka ny sary sy ny déscription mihitsy ny vokatra , hiverina hividy indray aho @ manaraka"</p>
                        <span className="text-black font-bold text-sm">Jean Jacques</span> 
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeSectionThree;