import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FishingMapPage from './FishingMapPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<FishingMapPage />} />
      </Routes>
    </BrowserRouter>
  );
}
