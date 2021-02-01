import React , {useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
import {Auth} from 'aws-amplify';
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
		display: 'flex',
		justifyContent: "center",
		alignItems: "center"
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
		top: "calc(50% - 200px)",
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
	}
}));

export default function Resetpw() {

    const [email, setEmail] = useState("");
    const history = useHistory();

    const sendForgotPwRequest = (e) => {
        e.preventDefault();
        Auth.forgotPassword(email)
            .then((data)=>{
                console.log(data);
                history.push('/changepw/'+email);
            })
            .catch((err)=>{
                console.log(err)
            });
    }
	const classes = useStyles();
	return (
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={4} />
				<Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square style={{ height: "350px" }}>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<img src="./blueport_logoicon.svg" alt="" height="70" width="70" />
						</Avatar>
						<Typography component="h1" variant="h5">
							Forgot Password
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
                                onChange={(e)=>{setEmail(e.target.value)}}
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
                                onClick={sendForgotPwRequest}>
								Send Reset Email
						</Button>
							<Grid container style={{ display: "flex", justifyContent: "center" }}>
								<Grid item > Don't have an account?
								<Link to="signup" variant="body2">
										{"Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<Grid container style={{ display: "flex", justifyContent: "center" }}>
								<Grid item > Already have an account?
								<Link to="/" variant="body2">
										{" Login in here"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Grid>
				<Grid item xs={false} sm={4} md={5} />
			</Grid>
	
	);
}