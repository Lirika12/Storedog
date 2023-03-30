export const signinFetch = (values) => {
  return fetch("https://api.react-learning.ru/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const signupFetch = (values) => {
  return fetch("https://api.react-learning.ru/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const getUserInfo = (token) => {
  return fetch("https://api.react-learning.ru/v2/9-gr/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
