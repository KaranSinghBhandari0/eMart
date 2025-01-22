import { useContext } from 'react';
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export default function Navbar() {
  const {user, logout} = useContext(AuthContext);

  return (
    <header className="bg-slate-800 w-full shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to='/' className='flex gap-1 items-center'>
          <div className='h-6 w-6 bg-blue-500 rounded-full'></div>
          <p className='font-semibold text-white text-lg'>eMart</p>
        </Link>

        {/* Navigation Links */}
        <div className='flex gap-12 hidden md:flex transition-all duration-300'>
          <Link to='/' className='text-white hover:bg-slate-600 px-2 py-1 rounded'>Home</Link>
          <Link to='/cart' className='text-white hover:bg-slate-600 px-2 py-1 rounded'>Cart</Link>
          <button className='text-white hover:bg-slate-600 px-2 py-1 rounded' 
          onClick={() => window.open('https://emart-admin-by-karan.vercel.app', '_blank', 'noopener,noreferrer')}>
            Become a Seller
          </button>
        </div>

        <div className='flex items-center gap-6'>
          <div className={`flex gap-8 bg-slate-600 px-2 py-1 ${user ? 'rounded-full' : 'rounded-lg'}`}>
            {
              user ? 
              <>
                <div className="dropdown">
                  <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user text-white"></i>
                  </a>

                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={()=> logout()}>
                      Logout <i className="fa-solid fa-right-from-bracket ml-2"></i>
                      </a></li>
                      <Link to='/orders' >
                        <li className="dropdown-item" >Orders</li>
                      </Link>
                  </ul>
                </div>
              </>
              :  
              <Link to='/login' className='text-white'>
                Login <i className="fa-solid fa-arrow-right"></i>
              </Link>
            }
          </div>
          <i className=" text-white text-xl fa-solid fa-bars md:hidden cursor-pointer" 
          data-bs-toggle="offcanvas" href="#offcanvasExample" ></i>
        </div>
      </nav>
      
      <div className="offcanvas offcanvas-start  bg-[#f0f0f0]" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body flex flex-col gap-4 align-center">
          <Link to='/' className='text-center bg-slate-700 text-white rounded-2xl p-2'>Home</Link>
          <Link to='/cart' className='text-center bg-slate-700 text-white rounded-2xl p-2'>Cart</Link>
          <Link to='/' className='text-center bg-slate-700 text-white rounded-2xl p-2'>Become a Seller</Link>
        </div>
      </div>
    </header>
  );
}
