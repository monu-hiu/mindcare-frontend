import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div style={{padding:"15px",background:"#eee"}}>

      <Link to="/">Home</Link> | 

      <Link to="/login">Login</Link> | 

      <Link to="/signup">Signup</Link> | 

      <Link to="/dashboard">Dashboard</Link> | 

      <Link to="/mindfulness">Mindfulness</Link> | 

      <Link to="/suggestions">Suggestions</Link> | 

      <Link to="/goal">Goal</Link>
      <Link to="/challenges">Challenges</Link>
      <Link to="/selfcare">Self Care</Link>
      <Link to="/reflection">Reflection</Link>
      <Link to="/cognitive-distortions">Cognitive Distortions</Link>

    </div>

  )

}

export default Navbar;