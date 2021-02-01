import { React, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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
	}
}));



export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signup = (e) => {
		e.preventDefault();

		Auth.signUp({ username: email, password, attributes: { email } })
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			})
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
						/>
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
								<Link href="/" variant="body2">
									{" Login here"}
								</Link>
							</Grid>
						</Grid>
						<Typography variant="body2" color="textSecondary" align="center" className={classes.privacypolicy}>
							By clicking on "Sign Up" you agree to <Link href="#">Privacy Policy</Link> and <Link href="#">Terms & Condition</Link>
						</Typography>
					</form>
				</div>
			</Grid>
			<Grid item xs={false} sm={4} md={5} />
		</Grid>
	);
}