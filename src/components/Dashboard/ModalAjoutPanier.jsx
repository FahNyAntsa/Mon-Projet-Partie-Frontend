import { X } from "lucide-react";

function ModalAjoutPanier({ClickAjout}) {
    return (
        <>
            <div className="w-full h-full bg-[#0000008e] flex justify-center items-center top-0 left-0 absolute z-100">
                <form className="w-[25vw] h-[22vw] bg-[#ffffff] p-[2vw] flex justify-start flex-col  z-100 rounded-[1vw] relative">
                    <X className="text-black Logout absolute top-[.5vw] right-[.5vw] cursor-pointer hover:text-red-500" onClick={ClickAjout}/>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" className="bg-[#070b2b]! p-[1vw]! text-[1vw]" />
                    <label htmlFor="prix">Prix</label>
                    <input type="number" id="prix" className="bg-[#070b2b]! p-[1vw]! text-[1vw]"/>
                    <label htmlFor="description">Descritpion</label>
                    <textarea name="descritpion" id="descritpion" className="bg-[#070b2b]! text-[1vw] px-[1vw]! rounded-[.5vw] mb-[1vw]!" rows={3}></textarea>
                    <button className="bg-green-500 text-white p-[.5vw] rounded-[.5vw] text-[1vw]">Ajouter</button>
                </form>
            </div>
        </>
    )
}

export default ModalAjoutPanier;