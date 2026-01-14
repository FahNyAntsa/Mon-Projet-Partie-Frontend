import axios from "axios";
import { X } from "lucide-react";


function ConfirmationModal({ ClickDelete, id,TousLesUtilisateurs }) {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    // console.log(id)
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/User/${id}`, { withCredentials: true })
            setTimeout(() => {
                ClickDelete()
            }, 100);
            TousLesUtilisateurs()
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="w-full h-screen bg-[#0000008e] flex justify-center items-center top-0 left-0 absolute z-100 ">
                <div className="w-[25vw] h-[10vw] bg-[#ffffff] p-[2vw] flex justify-start flex-col gap-[1vw]  z-100 rounded-[1vw] relative transition-all" onSubmit={handleSubmit}>
                    <h1 className="text-[#070b2b] text-[1.2vw]">Voulez-vous vraiment supprimer cette utilisateur ?</h1>
                    {/* <X className="text-black Logout absolute top-[.5vw] right-[.5vw] cursor-pointer hover:text-red-500" onClick={ClickDelete} /> */}
                    <button className="text-black btn-ghost absolute right-2 top-2 btn btn-sm btn-circle Logout cursor-pointer hover:text-white text-[.8vw] rounded-full p-[1vw]" onClick={ClickDelete}>X</button>
                    <div className="flex justify-between gap-[1vw]">
                        <button className="border-[.1vw] border-[#0000008e] hover:bg-red-500 transition-colors hover:text-white hover:border-none text-black p-[.5vw] rounded-[.5vw] w-1/2 text-[1vw]" onClick={ClickDelete}>Non</button>
                        <button className="bg-green-500 w-1/2 hover:bg-white hover:border-[.1vw] hover:border-green-500 hover:text-green-500 transition-colors text-white p-[.5vw] rounded-[.5vw] text-[1vw]" onClick={() => handleDelete(id)}>Oui</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal;