import { getAuthToken } from './utils';

const API_URL = 'https://student-json-api.lidemy.me';

export const getPosts = async (page) => {
  const pageNumber = page || 1;
  const fetchAPI = await fetch(
    `${API_URL}/posts?_page=${pageNumber}&_sort=createdAt&_order=desc&_limit=10`,
  );
  const jsonData = await fetchAPI.json();
  jsonData.push({
    totalPage: parseInt(fetchAPI.headers.get('x-total-count'), 10),
    currentPage: pageNumber,
  });
  return jsonData;
};

export const getSinglePost = async (id) => {
  const fetchAPI = await fetch(`${API_URL}/posts?id=${id}`);
  const jsonData = await fetchAPI.json();
  return jsonData;
};

export const login = async (username, password) => {
  const fetchAPI = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const jsonData = await fetchAPI.json();
  return jsonData;
};

export const register = async (username, nickname, password) => {
  const fetchAPI = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      nickname,
      password,
    }),
  });
  const jsonData = await fetchAPI.json();
  return jsonData;
};

export const getMe = async () => {
  const token = getAuthToken();
  const fetchAPI = await fetch(`${API_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const jsonData = await fetchAPI.json();
  return jsonData;
};

export const addNewPost = async (title, body) => {
  const token = getAuthToken();
  const fetchAPI = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  const jsonData = await fetchAPI.json();
  return jsonData;
};
