import React from "react";
import { useNavigate } from "react-router-dom";
import SimpleVideoTest from "../components/SimpleVideoTest";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AutoCategory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />

      <main className="pt-20">
        <SimpleVideoTest />
      </main>

      <Footer />
    </div>
  );
};

export default AutoCategory;
