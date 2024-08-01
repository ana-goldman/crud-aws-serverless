export const getItemById = async (url: string, id: string) => {
  const res = await fetch(`${url}/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = res.json();
  return await Promise.resolve(data);
};
