import { useState, useEffect } from "react";

const useCompanyTheme = () => {
  const [companyColor, setCompanyColor] = useState("#2DDD7F");

  useEffect(() => {
    // Listener para mudanças na cor da empresa
    const handleCompanyColorChange = (event) => {
      setCompanyColor(event.detail.color);
    };

    window.addEventListener('companyColorChanged', handleCompanyColorChange);
    
    // Tentar ler a cor atual das variáveis CSS
    const currentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--company-primary-color').trim();
    
    if (currentColor) {
      setCompanyColor(currentColor);
    }
    
    return () => {
      window.removeEventListener('companyColorChanged', handleCompanyColorChange);
    };
  }, []);

  return {
    companyColor,
    setCompanyColor
  };
};

export default useCompanyTheme;