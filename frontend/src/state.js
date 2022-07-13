export const get_pic_url = async (id) => {
  const response = await fetch(
    "/api/picture/get?" + new URLSearchParams({ id }),
    {
      method: "GET",
    }
  );
  const url = await response.text();
  return url;
};

export const set_pic_url = async (id, url) => {
  await fetch("/api/picture/set?" + new URLSearchParams({ id, url }), {
    method: "PUT",
  });
};
