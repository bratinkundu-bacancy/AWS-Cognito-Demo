import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth } from 'aws-amplify';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		display: "flex",
		alignItems: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		width: theme.spacing(9),
		height: theme.spacing(9),
		position: "absolute",
		top: "calc(50% - 380px)",
		borderRadius: "100%",
		borderColor: "transparent #e4e7eb",
		borderStyle: "solid",
		borderWidth: "2px",
		backgroundColor: "#e4e7eb",
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	privacypolicy: {
		margin: theme.spacing(5, 0, 0)
	},
	errormsg: {
		color: 'red'
	}
}));



export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cnfpassword, setcnfPassword] = useState("");
	const [name, setName] = useState("");
	const history = useHistory();
	const [passwordError, setPasswordError] = useState(false)
	const [cnfpasswordError, setcnfPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)

	const [showToast, setShowToast] = useState(true);

	const signup = (e) => {
		e.preventDefault();
		const errors = handleValidation(email, password, cnfpassword);
		if(!errors){
			setShowToast(true);
			Auth.signUp({ username: email, password, attributes: { email } })
				.then((data) => {
					console.log(data);
					//Add user to db..
					//Redirect to Login page
	
					toast.success('User added successfully!', {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					setTimeout(() => {
						history.push('/login');
					}, 5000);
				})
				.catch((err) => {
					console.log(err);
				})
		}
		
	}

	const handleValidation = (email, password, cnfpassword) => {
		setEmailError(false);
		setPasswordError(false);
		setcnfPasswordError(false);
		if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
			setEmailError(true);
			return true;
		}
		else if (password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
			if(!password === cnfpassword){
				setcnfPasswordError(true);
				return true;
			}
		}
		else{
			setPasswordError(true)
			return true;
		}
		
		
	}

	const classes = useStyles();
	return (
		<Grid container component="main" className={classes.root} >
			<CssBaseline />
			<Grid item xs={false} sm={4} md={4} />
			<Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square style={{ height: "700px" }}>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<img src="src/logo.svg" alt="" height="70" width="70" />
					</Avatar>
					<Typography component="h1" variant="h5">
						SignUp to BluePort
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="fullname"
							label="Full Name"
							name="fullname"
							autoComplete="fullname"
							autoFocus
							onChange={(e) => { setName(e.target.value) }}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							onChange={(e) => { setEmail(e.target.value) }}
						/>
						{emailError && <p className={classes.errormsg}>Invalid Email</p>}						
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => { setPassword(e.target.value) }}
						/>
						{passwordError && <p className={classes.errormsg}>Invalid Password</p>}
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="confirmpassword"
							label="Confirm Password"
							type="password"
							id="confirmpassword"
							autoComplete="confirm-password"
							onChange={(e) => { setcnfPassword(e.target.value) }}
						/>
						{cnfpasswordError && <p className={classes.errormsg}>Password Mismatch</p>}
						<Button
							type="submit"
							fullWidth
							style={{
								backgroundColor: "#106ab8",
								color: "white"
							}}
							variant="contained"
							className={classes.submit}
							onClick={signup} >
							Sign Up
            			</Button>
						<Grid container style={{ display: "flex", justifyContent: "center" }}>
							<Grid item > Already have an account?
								{/* <Link to="/" variant="body2">
									{" Login here"}
								</Link> */}
								<Link to="/" variant="body2">Login Here</Link>
							</Grid>
						</Grid>
						<Typography variant="body2" color="textSecondary" align="center" className={classes.privacypolicy}>
							By clicking on "Sign Up" you agree to <Link href="#">Privacy Policy</Link> and <Link href="#">Terms & Condition</Link>
						</Typography>
					</form>
				</div>
			</Grid>
			<Grid item xs={false} sm={4} md={5} />
			{showToast && <ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>}
		</Grid>
	);
}