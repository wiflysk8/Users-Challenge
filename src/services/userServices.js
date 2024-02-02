export const fetchUsers = async (size) => {
  const response = await fetch(
    `https://random-data-api.com/api/v2/users?size=${size}`
  );
  const data = await response.json();
  const newData = data.map((user) => ({
    ...user,
    image: `https://robohash.org/${user.first_name}.png,`,
  }));
  return newData;
};
