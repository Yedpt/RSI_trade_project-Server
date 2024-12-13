import axios from "axios";

export const fetchCompanyLogo = async (domain: string): Promise<string> => {
  try {
    const response = await axios.get(`https://logo.clearbit.com/${domain}`);
    return response.request.res.responseUrl; // Obtener URL del logo
  } catch (error) {
    throw new Error("Logo not found");
  }
};