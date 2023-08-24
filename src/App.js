import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './containers/HomePage/Home';
import ProductPage from './containers/ProductPage/ProductPage';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
    </Routes> 
    </BrowserRouter>
  );
}

export default App;
