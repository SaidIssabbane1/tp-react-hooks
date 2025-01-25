import React, { createContext, useState } from "react";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ThemeToggle from "./components/ThemeToggle";
import LanguageSelector from "./components/LanguageSelector";

// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext();

export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [productSearchValue, setProductSearchValue] = useState("");
  // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  const languages = ["FR", "EN"];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <LanguageContext.Provider
        value={{ languages, selectedLanguage, setSelectedLanguage }}
      >
        <div
          className={`container ${
            isDarkTheme ? "bg-dark text-light" : "bg-light"
          }`}
        >
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <LanguageSelector/>
            </div>
          </header>
          <main>
            <ProductSearch
              productSearchValue={productSearchValue}
              setProductSearchValue={setProductSearchValue}
            />
            <ProductList productSearchValue={productSearchValue} />
          </main>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
