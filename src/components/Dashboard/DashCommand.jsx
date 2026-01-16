import { useState } from "react"


function DashCommand() {
    const [UserToMap,setUserToMap]=useState([])
    const TousLesCommandes = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/AllCommand`, { withCredentials: true })
            // console.log(response.data)
            setUserToMap(response.data)
            // setTotalPage(response.data.NbrDePage)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="overflow-x rounded-box flex-1 shadow shadow-shadowBox mt-[2vw]!  w-[80vw] ">
            <table className="table h-full!">
                {/* head */}
                <thead>
                    <tr className="border-none">
                        <th className="text-Th">Nom</th>
                        <th className="text-Th">Prénom</th>
                        <th className="text-Th">Email</th>
                        <th className="text-Th">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {UserToMap.map((user, index) => (
                        <tr key={index} className="border-none">
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={`http://localhost:8000/upload/users/${user.picture}`}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-Th">{user.lastname}</div>
                                        <span className={user.email === "Administrateur@gmail.com" ? "badge badge-info badge-sm" : "badge badge-warning badge-sm"} >{user.email === "Administrateur@gmail.com" ? "admin" : "utilisateur"}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="text-Th">
                                {user.firstname}
                            </td>
                            <td className="text-Th">{user.email}</td>
                            <td className=" w-[8vw] ">
                                <div className="flex gap-4 items-center justify-center ">
                                    <button className=" text-white text-[1vw] rounded-[.5vw] p-[.2vw]">
                                        <Trash2Icon className="Logout text-red-500" onClick={() => { ClickDelete(id), setId(user.id) }} />
                                    </button>
                                    {user.email === "Administrateur@gmail.com" ? (<button className="  text-white text-[1vw] p-[.2vw] rounded-[.5vw]   z-0" onClick={() => { setModifierOpen(!ModifierOpen), setId(user.id) }}>
                                        <EditIcon className="Logout text-[#72039eee]" />
                                    </button>) : ""}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <dialog id="my_modal_3" className=" modal">
                <div className="modal-box w-[30vw]! h-[27vw] bg-white!">
                    <h1 className="text-[#070b2b] text-[1.2vw] text-center underline">Modifier un utilisateur</h1>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle hover:text-white text-black btn-ghost absolute right-2 top-2">x</button>
                    </form>
                    <form action="" className="flex flex-col gap-[.8vw]">
                        <label htmlFor="nom" className="text-[#070b2b] underline">Nom</label>
                        <input type="text" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="nom" name="nom" />
                        <label htmlFor="prenom" className="text-[#070b2b] underline">Prénom</label>
                        <input type="text" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="prenom" name="prenom" />
                        <label htmlFor="email" className="text-[#070b2b] underline">Email</label>
                        <input type="email" className="text-white bg-[#070b2b]! text-[1vw] px-[1vw]!" id="email" name="email" />
                        <button className=" mt-[1.5vw]! bg-[#600385ee] text-white text-[1vw] px-[1vw] rounded-[.5vw] py-[.3vw]">Modifier</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default DashCommand;