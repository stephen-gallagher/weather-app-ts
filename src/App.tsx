import './App.css';
import Footer2 from './components/Footer2';
import Header from './components/Header';

import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App">
      <Header h2Text="Stephen's Weather App" />
      <Homepage />
      <Footer2 />
    </div>
  );
}

export default App;
