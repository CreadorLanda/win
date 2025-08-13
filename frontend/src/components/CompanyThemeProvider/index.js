import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import api from "../../services/api";

const CompanyThemeProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  
  // Verificação de segurança para o contexto
  const user = authContext?.user;
  const isAuth = authContext?.isAuth;

  useEffect(() => {
    // Só buscar a cor se o usuário estiver autenticado e tiver companyId
    if (isAuth && user && user.companyId) {
      // Adicionar um pequeno delay para garantir que o token foi configurado
      const timer = setTimeout(() => {
        fetchCompanyColor();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [user, isAuth]);

  const fetchCompanyColor = async () => {
    try {
      const { data } = await api.get(`/companies/${user.companyId}`);
      if (data && data.primaryColor) {
        // Aplicar a cor diretamente nas variáveis CSS
        document.documentElement.style.setProperty('--company-primary-color', data.primaryColor);
        
        // Também aplicar em algumas propriedades específicas do Material-UI
        const root = document.documentElement;
        root.style.setProperty('--primary-main', data.primaryColor);
        
        // Disparar evento customizado para componentes que precisam reagir à mudança de cor
        window.dispatchEvent(new CustomEvent('companyColorChanged', { 
          detail: { color: data.primaryColor } 
        }));
      }
    } catch (err) {
      // Só logar se não for erro 401/403 (não autenticado)
      if (err.response && err.response.status !== 401 && err.response.status !== 403) {
        console.error("Error fetching company color:", err);
      }
      // Em caso de erro, manter a cor padrão
      document.documentElement.style.setProperty('--company-primary-color', '#2DDD7F');
    }
  };

  return children;
};

export default CompanyThemeProvider;
