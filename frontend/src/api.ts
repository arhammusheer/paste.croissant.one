import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.paste.croissant.one/";

const api = axios.create({
  baseURL: BASE_URL,
});

const get = async (id: string) => {
  const response = await api.get(id);
  const { key, value } = response.data;

  return { key, value };
};

const set = async (id: string, content: string) => {
  const response = await api.post(id, { value: content });
  const { key, value } = response.data;
  return { key, value };
};

export const paste = {
  get,
  set,
};
