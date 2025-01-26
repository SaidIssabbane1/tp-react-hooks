import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext, ThemeContext } from '../App';
import { useDebounce } from '../hooks/useProductSearch';

const ProductSearch = ({ setProductSearchValue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const{selectedLanguage} = useContext(LanguageContext);
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  const debouncedValue = useDebounce(searchTerm,500);
  
  useEffect(()=>{
    setProductSearchValue(debouncedValue)
  },[setProductSearchValue,debouncedValue])

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setProductSearchValue(searchTerm);
  //   }, 500);
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [searchTerm, setProductSearchValue]);
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={selectedLanguage ==="FR"?"Rechercher un produit...":"Search product..."}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;