import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// TODO: Exercice 3.2 - Créer le hook useLocalStorage
export const useLocalStorage = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const [itemsPerPage, setItemsPerPage] = useState(6); // Nombre de produits par page
  const [totalProducts, setTotalProducts] = useState(0); // Total des produits récupérés


  const fetchProducts = async (page = 1) => {
    try {
      // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const response = await fetch(`https://api.daaif.net/products?delay=1000&page=${page}&skip=${currentPage ===1 ? 0 : currentPage * itemsPerPage}&limit=${itemsPerPage}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
      setLoading(false);   
      console.log(data.products[1]);
         
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadProducts = () => {
    setLoading(true); 
    setError(null);    
    fetchProducts();   
  };
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const previousPage = () => {
    if (currentPage > 1) {
      setLoading(true); 
      setError(null);  
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true); 
      setError(null);  
      setCurrentPage(currentPage + 1);
    }
  };
  return { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reloadProducts,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    totalPages,
    previousPage,
    nextPage,
  };
};

export default useProductSearch;