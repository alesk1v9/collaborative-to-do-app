

const Header = () => {
  return (
    <header className="">
        <nav className="flex w-full h-16 justify-around items-center text-lg font-bold">
            <div>
                <a href="#" className="">
                    <span>Collaborative TO-DO App</span>
                </a>
            </div>
            
            <div className="">
                <a href="/login" className="">Log in</a>
          </div>
        </nav>
    </header>
  )
}

export default Header