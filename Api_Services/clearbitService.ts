import axios from "axios";

export const fetchCompanyLogo = async (domain: string) => {
  const apiUrl = `https://logo.clearbit.com/${domain}`;
  return apiUrl; // Simplemente devolvemos la URL de la imagen.
};
