const baseUrl = process.env.BASE_URL;

export const getData = async (url: string, token?: string, ext?: boolean) => {
  const link = ext ? `${baseUrl}/api/${url}` : `/api/${url}`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

export const postData = async (
  url: string,
  post: any,
  token?: string,
  ext?: boolean
) => {
  const link = ext ? `${baseUrl}/api/${url}` : `/api/${url}`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const putData = async (url: string, put: any, token: string) => {
  const res = await fetch(`/api/${url}`, {
    method: "PUT",
    body: JSON.stringify(put),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

export const patchData = async (url: string, patch: any, token: string) => {
  const res = await fetch(`/api/${url}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (url: string, token: string) => {
  const res = await fetch(`/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
