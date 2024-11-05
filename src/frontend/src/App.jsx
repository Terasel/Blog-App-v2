import BlogList from "./components/BlogList"

function App() {
  return (
    <div>
      <button type="button">Show users</button>
      <button type="button">User page</button>
      <button type="button">My blogs</button>
      <BlogList />
    </div>
  )
}

export default App