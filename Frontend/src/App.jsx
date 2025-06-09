import './App.css'
import Header from './components/Header.jsx'
import Post from './components/Post.jsx'

function App() {

  return (
    <>
      <div>
        <Header showPostButton={true} />
        <Post />
      </div>
      
    </>
  )
}

export default App
