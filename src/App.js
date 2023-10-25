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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './features/userSlice';


const PrivateRoutes = () => {
  let auth = { token: false};

  return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  return (
    <>
      <NavBar />
      <main className={styles.mainBody}>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route exact path={'/bikes'} element={<Bikes />} />
          <Route path={'/bikes/all'} element={<p>all bikes</p>} />
          <Route path={'/bike/:bikeId'} element={<BikeDetails />} />
            <Route path={'/cart'} element={<Cart />} />
          <Route element={<PrivateRoutes />}>
            <Route path={'/bike/:bikeId/review'} element={<Review />} />
            <Route path={'/profile'} element={<p>profile</p>} />
            <Route path={'/account'} element={<p>account</p>} />
          </Route>
          <Route path={'/news'} element={<News />} />
          <Route path={'/news/:newsId'} element={<NewsDetails />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
