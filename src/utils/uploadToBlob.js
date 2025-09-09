export const uploadToBlob = async (file) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload?filename=${file.name}`,
    {
      method: "POST",
      body: file,
    }
  ).then((res) => res.json());
};
