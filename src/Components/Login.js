import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: "center"
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		width: theme.spacing(9),
		height: theme.spacing(9),
		position: "absolute",
		top: "calc(50% - 330px)",
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
	errormsg: {
		color: 'red'
	}
}));

export default function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [error,setError] = useState("");
	const history = useHistory();

	const signIn = (e) => {
		e.preventDefault();
		Auth.signIn({
			username: email,
			password,
		})
			.then((user) => {
				//console.log(user.signInUserSession.getIdToken().jwtToken);
				console.log(user)
				setError("");
				//Store token in sessionstorage
				//Redirect to home page
				history.push('/mainpage')
			})
			.catch((err) => {
				console.log(err);
				setError(err.message);
			});
	};

	const classes = useStyles();

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={4} />
			<Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square style={{ height: "600px" }}>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<img src="./blueport_logoicon.svg" alt="" height="70" width="70" />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in to Blueport

          </Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
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
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
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
							onClick={signIn}
						>
							Sign In
            </Button>
			{error && <p className={classes.errormsg}>{error}</p>}
						<Grid container>
							<Grid item xs style={{ display: "flex", justifyContent: "center" }}>
								Forgot your password?
								<Link to="resetpw" variant="body2">
									{" Reset your password"}
								</Link>
							</Grid>
						</Grid>
						<Grid container style={{ display: "flex", justifyContent: "center" }}>
							<Grid item > Don't have an account?
								<Link to="signup" variant="body2">
									{" Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
			<Grid item xs={false} sm={4} md={5} />
		</Grid>
	);
}