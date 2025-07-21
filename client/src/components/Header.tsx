import { useAuth } from "../context/authContext";

const Header = () => {

    const { isAuth, logout } = useAuth();

  return (
    <header className="">
        <nav className="flex w-full h-16 justify-around items-center text-lg font-bold">
            <div>
                <a href="#" className="">
                    <span>Collaborative TO-DO App</span>
                </a>
            </div>
            
            <div className="">
                {isAuth && (
                    <button onClick={logout} className="">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Header