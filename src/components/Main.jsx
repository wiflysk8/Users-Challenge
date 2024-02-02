import { useEffect, useState } from "react";
import { Flex, Loader, Table, Text, Title } from "@mantine/core";
import { fetchUsers } from "../services/userServices";
import InfiniteScroll from "react-infinite-scroll-component";

const pageSize = 12;
const Main = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newUsers = await fetchUsers(pageSize);
        setUsers(newUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = async () => {
    const newUsers = await fetchUsers(pageSize);
    setUsers([...users, ...newUsers]);
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td ta={"center"}>{user.first_name}</Table.Td>
      <Table.Td ta={"center"}>{user.email}</Table.Td>
      <Table.Td ta={"center"}>{user.phone_number}</Table.Td>
      <Table.Td ta={"center"} align="center">
        <img
          src={user.image}
          style={{ width: 48, height: 48 }}
          alt={user.first_name}
        />
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Flex
      m={"0 auto"}
      justify={"center"}
      align={"center"}
      p={48}
      gap={24}
      direction={"column"}
    >
      <Title order={2}>USERS</Title>
      <InfiniteScroll
        dataLength={users.length}
        next={() =>
          setTimeout(() => {
            handleLoadMore();
          }, 1000)
        }
        hasMore={users.length <= 100}
        loader={
          <Flex w="100%" align="center" justify="center" gap={12} m={"12 0"}>
            <Text>LOADING MORE USERS</Text>
            <Loader size="lg" type="dots" color="indigo" />
          </Flex>
        }
        endMessage={
          <Text w="100%" ta="center" mt={12}>
            NO MORE DATA TO LOAD.
          </Text>
        }
      >
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          verticalSpacing={"sm"}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={"center"}>Name</Table.Th>
              <Table.Th ta={"center"}>Email</Table.Th>
              <Table.Th ta={"center"}>Phone</Table.Th>
              <Table.Th ta={"center"}>Avatar</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </InfiniteScroll>
    </Flex>
  );
};

export default Main;
