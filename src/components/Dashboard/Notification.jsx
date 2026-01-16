import axios from "axios";
import { BellIcon } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";


function Notification() {
    const [userNotif, setUserNotif] = useState([])
    const [productNotif, setProductNotif] = useState([])
    const [commandNotif, setCommandNotif] = useState([])
    const [LastUserId, setLastUserId] = useState(0)
    const [newUserTab, setNewUserTab] = useState([])
    const [CountNewUser, setCountNewUser] = useState(parseInt(localStorage.getItem("UserInscrit"))|| 0)
    const LastUserIdRef = useRef(0)
    const TotalDesCommandes = async () => {
        try {
            const response = await axios.get("http://localhost:8000/CountCommand", { withCredentials: true })
            // console.log(response.data[0])
            setCommandNotif(response.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    let UserList = []

    // console.log(newUserTab)
    const UserInitial = async (id) => {
        try {
            const response = await axios.get("http://localhost:8000/LastUser", { withCredentials: true })
            const users = response.data
            const newUser = users.filter(user => user.id > id)
            setCountNewUser(prev => prev + newUser.length)
            setLastUserId(Math.max(...newUser.map(user => user.id)))
            // }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(LastUserId)
    // SOLUTION
    useEffect(() => {
        let interval;
        const initLastUser = async () => {
            try {
                const response = await axios.get("http://localhost:8000/LastUser", { withCredentials: true });
                const users = response.data;
                if (users.length > 0) {
                    LastUserIdRef.current = users[0].id
                    setLastUserId(users[0].id);
                }
                interval = setInterval(async () => {
                    const res = await axios.get("http://localhost:8000/LastUser", { withCredentials: true });
                    const users = res.data;
                    const newUsers = users.filter(u => u.id > LastUserIdRef.current);
                    if (newUsers.length > 0) {
                        LastUserIdRef.current = Math.max(...newUsers.map(u => u.id))
                        setCountNewUser(prev => prev + newUsers.length);
                        setLastUserId(Math.max(...newUsers.map(u => u.id)));
                    }
                }, 1000);
            } catch (err) {
                console.log(err);
            }
        }
        initLastUser();
        return () => clearInterval(interval);
    }, []);
    localStorage.setItem("UserInscrit",CountNewUser)

    useEffect(() => {
        TotalDesCommandes()
    }, [])
    const clearStorage=()=>{
        setTimeout(() => {
            localStorage.clear()
            setCountNewUser(0)
        }, 5000);
    }
    return (
        <>
            <div className="dropdown dropdown-end " onClick={clearStorage}>
                <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none hover:bg-transparent">
                    <div className="indicator border-none" >
                        {commandNotif.Total > 0 ? <span className="indicator-item badge badge-xs badge-error">{commandNotif.Total}</span> : ""}
                        {CountNewUser > 0 ? <span className="indicator-item badge badge-xs badge-error">{CountNewUser}</span> : ""}
                        <BellIcon className="text-navbar Usercircle"/>
                    </div>
                </div>
                <div className="dropdown-content menu bg-bgFah rounded-box z-1 w-52 p-2">
                    {commandNotif.Total > 0 || CountNewUser > 0 ? (
                        <>
                            <span className="text-[.9vw] text-navbar">il y a {commandNotif.Total} {commandNotif.Total > 1 ? "nouvelles commandes" : "nouvelle commande"}
                            </span>
                            <span className="text-[.9vw] text-navbar">il y a {CountNewUser} {CountNewUser > 1 ? "nouveaux utilisateurs" : "nouveau utilisateur"}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-[.9vw] text-navbar">Pas de nouvelle commande</span>
                            <span className="text-[.9vw] text-navbar">Pas de nouveau utilisateur</span>
                        </>
                    )}
                </div>
                {/* <div className="dropdown-content menu bg-[#FFFF]! rounded-box z-1 w-52 p-2">
                    
                </div> */}
            </div>
        </>

    )
}

export default Notification;