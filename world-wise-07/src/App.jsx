import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  const [cities, setCities] = useState([]);
  // const [err, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const base_url = `http://localhost:8000/cities`;

  useEffect(() => {
    async function getCities() {
      try {
        setLoading(true);
        // setError(null);
        const response = await fetch(base_url);

        if (!response.ok) {
          throw new Error("Error Fetching Cities");
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.log(error);
        // setError(error.message);
      }
      setLoading(false);
    }

    getCities();
  }, [base_url]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<Navigate replace to="cities" />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:cityId" element={<City cities={cities} />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="form"
            element={<Form cities={cities} />}
          />
          <Route path="form" element={<p>FORM</p>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
