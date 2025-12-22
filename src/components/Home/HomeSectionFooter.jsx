import { ArrowRightCircle, MailIcon, MapPinHouseIcon, Phone } from "lucide-react";

function HomeSectionFooter() {
    return (
        <>
            <footer className="w-full h-[25vw] bg-[#0B0E14] flex flex-col gap-[5vw] p-[4vw]">
                <div className="flex">
                    <div className="w-1/2 flex flex-col gap-2 justify-center border-r-2 border-white">
                        <span className="text-[1.2vw] text-[#00FFFF]">Aponga Maro Anaka </span>
                        <p className="text-white text-[1vw]">- Votre boutique de batteries et accessoires . Qualité , passion et professionnalisme au service de votre musique .</p>
                        <p className="text-white text-[1vw] flex gap-1 items-center">- Contactez-nous pour plus d'informations ou des conseils personnalisés. <ArrowRightCircle className="IconeFooter text-[#00FFFF]" /> </p>
                    </div>
                    <div className="w-1/2 flex flex-col gap-6 justify-center px-[13vw]">
                        <h2 className="text-[#00FFFF] text-[2vw]">Infos sur la société</h2>
                        <div className="w-full px-[6] flex flex-col gap-5">
                            <div className="flex gap-2 items-center">
                                <MapPinHouseIcon className="text-white IconeFooter" />
                                <p className="text-white text-[1vw]">Lot IAB Ter Ak , rue boulevard</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Phone className="text-white IconeFooter" />
                                <p className="text-white text-[1vw]">(+261)-33 12 346 78</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <MailIcon className="text-white IconeFooter" />
                                <p className="text-white text-[1vw]">ApongaMaroAnaka@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <hr className="text-[#ffffff62] h-[.5vw]" />
                    <h2 className="text-white text-[.8vw] text-center flex justify-center">&copy; Fah Ny Antsa Arindranto | dec 2025 | Project</h2>
                </div>
            </footer>
        </>
    )
}

export default HomeSectionFooter;