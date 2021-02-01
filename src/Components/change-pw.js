import React , {useState} from 'react';
import { useHistory, useParams ,Link } from 'react-router-dom';
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
		top: "calc(50% - 300px)",
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

export default function Resetpw() {

    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [cnfpassword, setcnfPassword] = useState("");
    const history = useHistory();
    const email = useParams().email;
    const [validerror, setValidError] = useState(false);
    const submitForgotPwRequest = (e) => {
        e.preventDefault();
        const error = (password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) && password === cnfpassword)
        if(error == false){
            Auth.forgotPasswordSubmit(email,code,password)
            .then((data)=>{
                console.log(data);
                history.push('/login');
            })
            .catch((err=>{
                console.log(err)
            }));
        }
    }
	const classes = useStyles();
	return (
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={4} />
				<Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square style={{ height: "500px" }}>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<img src="./blueport_logoicon.svg" alt="" height="70" width="70" />
						</Avatar>
						<Typography component="h1" variant="h5">
							Change Password
					</Typography>
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="verifycode"
								label="Verification Code"
								name="verifycode"
								autoComplete="verifycode"
                                autoFocus
                                onChange={(e)=>{setCode(e.target.value)}}
							/>
                            <TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="password"
								label="New Password"
                                name="password"
                                type="password"
								autoComplete="password"
                                onChange={(e)=>{setPassword(e.target.value)}}
							/>
                            <TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="cnfpassword"
								label="Confirm Password"
                                name="cnfpassword"
                                type="password"
								autoComplete="cnfpassword"
                                onChange={(e)=>{setcnfPassword(e.target.value)}}
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
                                onClick={submitForgotPwRequest}>
								Change Password
						</Button>
                        {validerror && <p className={classes.errormsg}>Invalid password!</p>}
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