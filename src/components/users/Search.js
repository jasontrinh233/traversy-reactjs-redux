import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
   // Context hooks
   const githubContext = useContext(GithubContext);
   const alertContext = useContext(AlertContext);

   // State hooks
   const [text, setText] = useState("");

   // onChange handler
   const onChange = e => setText(e.target.value);

   // onSubmit handler
   const onSubmit = e => {
      e.preventDefault();
      if (text === "") {
         alertContext.setAlert("Please enter something", "light");
      } else {
         githubContext.searchUsers(text);

         if (githubContext.users !== []) {
            alertContext.removeAlert();
            setText("");
         }
      }
   };

   return (
      <div>
         <form className="form" onSubmit={onSubmit}>
            <input
               type="text"
               name="text"
               placeholder="Search users..."
               value={text}
               onChange={onChange}
            />
            <input
               type="submit"
               value="Search"
               className="btn btn-dark btn-block"
            />
         </form>
         {githubContext.users.length > 0 && (
            <button
               className="btn btn-light btn-block"
               onClick={githubContext.clearUsers}
            >
               Clear
            </button>
         )}
      </div>
   );
};

export default Search;
