import styles from './App.module.css';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Home from './components/Home/Home';

import NavBar from './components/NavBar/NavBar';
import Bikes from './components/Bikes/Bikes';
import News from './components/News/News';
import BikeDetails from './components/Bikes/BikeDetails';
import NewsDetails from './components/News/NewsDetails';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import Review from './components/Bikes/Review';
import Cart from './components/Cart/Cart'
import Profile from './components/User/Profile'
import Account from './components/User/Account'
import Orders from './components/User/Orders'
import NotFound from './NotFound';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './features/userSlice';
import { fetchCart } from './features/cartSlice';


const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // console.log("localSt ", isAuthenticated)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    ( (isAuthenticated && isAuthenticated === "true") || isLoggedIn ) ? 
        
        <Outlet/> 
          : 
        <Navigate to='/login'/>
  )
}

const AnonymousRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    ( !isAuthenticated || !isLoggedIn) ? <Outlet/> : <Navigate to='/' replace />
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchCart());
  }, [dispatch])

  return (
    <>
      <NavBar />
      <main className={styles.mainBody}>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route exact path={'/bikes'} element={<Bikes />} />
          <Route path={'/bike/:bikeId'} element={<BikeDetails />} />
          <Route element={<PrivateRoutes />}>
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/orders'} element={<Orders />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/account'} element={<Account />} />
          </Route>
            <Route path={'/bike/:bikeId/review'} element={<Review />} />
          <Route path={'/news'} element={<News />} />
          <Route path={'/news/:newsId'} element={<NewsDetails />} />
          <Route element={<AnonymousRoutes />}>
            <Route path={'/signup'} element={<SignUp />} />
            <Route path={'/login'} element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
