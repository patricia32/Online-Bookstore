import './App.css';


function App() {
  return (
      <div className="App">
         dedd
      </div>
  );
}
export default App;





// import React from 'react';
// import {Button, Container, TextField} from "@mui/material";
// import axiosInstance from 'axios';
// import {Grid} from '@mui/material';
// import history from 'history';
//
// class LoginPage extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       username: "",
//       password: "",
//     };
//   }
//
//   handleInput = event => {
//     const {value, name} = event.target;
//     this.setState({
//       [name]: value
//     });
//     console.log(value);
//   };
//
//   onSubmitFun = event => {
//     event.preventDefault();
//     let credentials = {
//       username: this.state.username,
//       password: this.state.password
//     }
//
//     axiosInstance.post("/login", credentials)
//         .then(
//             res => {
//               const val = res.data;
//               console.log("Success");
//               console.log(val);
//               if (val.id !== 0 ) {
//                 alert("Logged in!");
//
//                 //history.push("/home");
//                 //window.location.reload();
//               }
//             }
//         )
//         .catch(error => {
//           console.log(error)
//         })
//   }
//
//
//   render() {
//     return (
//         <Container maxWidth="sm">
//           <div>
//             <Grid>
//               <form onSubmit={this.onSubmitFun}>
//                 <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="username"
//                     label="Username"
//                     name="username"
//                     autoComplete="string"
//                     onChange={this.handleInput}
//                     autoFocus
//                 />
//                 <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     onChange={this.handleInput}
//                     autoComplete="current-password"
//                 />
//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                 >
//                   Sign In
//                 </Button>
//               </form>
//             </Grid>
//           </div>
//         </Container>
//     );
//   }
//
// }
//
// export default LoginPage;