import { Link } from "react-router-dom"
const Default = () => {
  return (
    <header className="mainheader flex bg-blue-200">
      <form action="">
        <div className="flex-1" >
            <img src="../assets/logo.png" alt="" />
        </div>
        <div className="flex-1 justify-center">
        <input type="text" name="search" id="search" placeholder="Search products"/>
        </div>
        <div className="flex-1">
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </div>
      </form>
    </header>
  ) 
}

export default Default
