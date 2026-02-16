

function ModalModifierProduit({ handleUpdate,setNom,setPrix,setDescribes,setUpdateCategory,UpdateCategory,describes,Nom,Prix,clickIsOpen }) {

    return (
        <>
            <div className="w-full h-screen bg-modal z-[999999] flex justify-center items-center top-0 left-0 absolute z-100 ">
                <div className=" !w-[30vw] rounded-lg bg-bgFah p-4 h-auto relative bg-bgFah!">
                    <h1 className="text-navbar text-[1.2vw] text-center underline">Modifier le produit</h1>
                    <button className="  text-navbar  absolute right-2 top-2" onClick={clickIsOpen}>x</button>
                    <form action="" className="flex flex-col gap-[.8vw]" onSubmit={handleUpdate}>
                        <label htmlFor="nom" className="text-navbar underline">Nom</label>
                        <input type="text" className="text-bgFah bg-navbar lg:p-2 text-[1vw] px-[1vw]!" id="nom" name="nom" value={Nom} onChange={(e) => setNom(e.target.value)} />
                        <label htmlFor="prix" className="text-navbar underline">Prix</label>
                        <input type="number" className="text-bgFah bg-navbar lg:p-2 text-[1vw] px-[1vw]!" id="prix" name="price" value={Prix} onChange={(e) => setPrix(e.target.value)} />
                        <label htmlFor="describes" className="text-navbar underline">Description</label>
                        <textarea name="describes" id="" className="text-bgFah bg-navbar rounded-[.5vw] text-[1vw] px-[1vw]" value={describes} rows={4} onChange={(e) => setDescribes(e.target.value)}></textarea>
                        <label htmlFor="category" className="text-navbar underline">Catégorie</label>
                        <select name="category" className="text-bgFah bg-navbar rounded-[.5vw] text-[1vw] p-[.5vw]" value={UpdateCategory} id="category" onChange={(e) => setUpdateCategory(e.target.value)}>
                            <option value="drum" className="text-bgFah text-[1vw]">drum</option>
                            <option value="accessoriesOne" className="text-bgFah text-[1vw]">accessoriesOne</option>
                            <option value="accessoriesTwo" className="text-bgFah text-[1vw]">accessoriesTwo</option>
                        </select>
                        <button className=" mt-[1.5vw]! bg-[#600385ee] mt-4 text-bgFah lg:p-2 text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]" onClick={()=>setTimeout(() => {clickIsOpen()}, 500)}>Modifier</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalModifierProduit;