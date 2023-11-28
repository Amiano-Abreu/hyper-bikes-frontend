
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

import styles from './App.module.css';

import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Loader from './components/Utility/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './features/userSlice';
import { fetchCart } from './features/cartSlice';

const Bikes = lazy(() => import('./components/Bikes/Bikes'));
const News = lazy(() => import('./components/News/News'));
const BikeDetails = lazy(() => import('./components/Bikes/BikeDetails'));
const NewsDetails = lazy(() => import('./components/News/NewsDetails'));
const Login = lazy(() => import('./components/Authentication/Login'));
const SignUp = lazy(() => import('./components/Authentication/SignUp'));
const Review = lazy(() => import('./components/Bikes/Review'));
const Cart = lazy(() => import('./components/Cart/Cart')); 
const Profile = lazy(() => import('./components/User/Profile')); 
const Account = lazy(() => import('./components/User/Account')); 
const Orders = lazy(() => import('./components/User/Orders')); 
const NotFound = lazy(() => import('./NotFound'));

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
        <Suspense fallback={<Loader />} >
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
        </Suspense>
      </main>
    </>
  );
}

export default App;
