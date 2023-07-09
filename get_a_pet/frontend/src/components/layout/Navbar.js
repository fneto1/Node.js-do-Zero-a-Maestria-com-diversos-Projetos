import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

//Context
import { Context } from '../../context/UserContext'
import { useContext } from 'react'

const Navbar = () => {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav className={styles.navbar} >
      <a href="/">
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />
        <h2>Get A Pet</h2>
      </div>
      </a>
      <ul>
        <li>
          <Link to='/'>Adotar</Link>
        </li>
        {
          authenticated ? (<>
            <li>
              <Link to='/pet/mypets'>Meus Pets</Link>
            </li>
            <li>
              <Link to='/pet/myadoptions'>Minhas Adoções</Link>
            </li>
            <li>
              <Link to='/user/profile'>Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>) : (
            <>
              <li>
                <Link to='/login'>Entrar</Link>
              </li>
              <li>
                <Link to='/register'>Cadastrar</Link>
              </li>
            </>
          )
        }

      </ul>
      {/* <NavLink to='/'>Adotar</NavLink>
      <NavLink to='/login'>Entrar</NavLink>
      <NavLink to='/register'>Cadastrar</NavLink> */}
    </nav>
  )
}

export default Navbar