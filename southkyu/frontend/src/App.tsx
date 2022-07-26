import Container from "./Components/Container";
import Filters from "./Components/Filters";
import Header from "./Components/Header";
import Input from "./Components/Input";
import Item from "./Components/Item";
import Layout from "./Components/Layout";
import useFetch from "./hooks/useFetch";
import useMutation from "./hooks/useMutation";

function App() {
  const { data, loading, setState } = useFetch("/todo");
  const [add, { isLoading }] = useMutation<MutationResponse>("/todo", "POST");

  const addTodo = (newTodo: Todo) => {
    const newData = { id: data.length + 1, title: newTodo, isCompleted: false };
    !isLoading && add(newData);
    setState((prev) => ({
      ...prev,
      data: data ? [...data, newData] : [newData],
    }));
  };

  if (loading) return <>Loading</>;

  return (
    <Layout>
      <Header>TODOS</Header>
      <Input addTodo={addTodo} />
      <Container>
        {data?.map((item, idx) => (
          <Item key={idx} item={item} setState={setState} data={data} />
        ))}
      </Container>
      <Filters />
    </Layout>
  );
}

export default App;
