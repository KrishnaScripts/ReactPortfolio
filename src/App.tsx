import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './view/List';
import Create from './view/Create';
import PassengerList from "./view/PassengerList";
import Registration from "./view/Registration";

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Registration/>}/>
        <Route path='/list' element={<List />} />
        <Route path="/edit/:id" element={<Create />} />
        <Route path='/create' element={<Create />} />
        <Route path='/getPassengers' element={<PassengerList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
