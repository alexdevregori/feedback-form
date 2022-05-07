import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

const useStyles = makeStyles({
	btn: {
		fontSize: 60,
		backgroundColor: "violet",
	},
});

export default function Create() {
	const classes = useStyles();

	return (
		<div>
			<Container>
				<Typography
					variant="h6"
					component="h2"
					gutterBottom
					color="textSecondary"
				>
					Create a new note
				</Typography>
				<Button
					className={classes.btn}
					onClick={() => {
						console.log("Button clicked");
					}}
					type="submit"
					color="primary"
					variant="contained"
					endIcon={<AddCircleOutlinedIcon />}
				>
					Submit
				</Button>
			</Container>
		</div>
	);
}
