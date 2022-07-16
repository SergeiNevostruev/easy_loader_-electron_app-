import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import PageWrapper from './components/common/PageWrapper';
import MainPage from './components/mainPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
