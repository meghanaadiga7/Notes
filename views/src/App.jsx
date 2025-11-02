import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Signup/Login";
import Welcome from "./components/Welcome/Welcome";
import ForgotPassword from "./components/Signup/ForgotPassword";
import ResetPassword from "./components/Signup/ResetPassword";
import NoteSetPage from "./components/NoteSetPage/NoteSetPage";
import Account from "./components/Account/Account";
import NoteList from "./components/NoteList/NoteList";
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>
      <Route path="/noteset/id" element={<NoteSetPage/>}/>
      <Route path="/notelist" element={<NoteList/>}/>
    </Routes>
   </Router>
  );
}
export default App;
