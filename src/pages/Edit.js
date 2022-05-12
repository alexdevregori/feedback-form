import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Typography,
	Button,
	Container,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SnoozeRoundedIcon from "@mui/icons-material/SnoozeRounded";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles({
	field: {
		marginTop: 10,
		marginBottom: 30,
		display: "block",
	},
});

export default function Edit() {
	const [data, setData] = useState({});
	const { id } = useParams();
	const { setValue, handleSubmit } = useForm();
	const classes = useStyles();
	const history = useHistory();
	const bearerToken =
		"Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJlY2IzMmI3MjdiNGY5NWFiOTkzNWNlMjhjYWViZGQ0MGRhYzIzMDk2YTJhZjliMDU1ZmJkZGEwOGM0ZmZiMzNmIiwiYWxnIjoiUlM1MTIifQ.eyJpc3MiOiJjNjU2YjMyNC04NmRjLTQ0ZWQtOWViNy1mMGYwMDEzMDhlMGEiLCJzdWIiOiI5NzEwMyIsInJvbGUiOiJhZG1pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLnByb2R1Y3Rib2FyZC5jb20iLCJ1c2VyX2lkIjo5NzEwMywic3BhY2VfaWQiOiI1Nzc4MSIsImlhdCI6MTYzODIwNTEzN30.H4K0MNtRUeNLyClaEuHMp1UY8lUTgrR8QBfaVD8uyuEAtk9U-y9uuWb0m0CpJuLUm9bc3fSanFc8_-by9OgT2WERJT0UjgmH2RbXxN-te8tptsw2kdgbUqFNIMP2wqpXkIvwamdIwxtJP3Tj07BV0NpuoSGBLoppSNelg2yOWgOM9vtnrjHZx1V94lAJde9-bXo092wFaRMk8QcdTu-AyY-4Ao_x4h6p5d1Yzf1_L7qb7Royk7YhpAKySUK0B2noShlFzLu9roPnYwO8GT7EEFE5OtKco4sURYDXDULZbtyJE1Ztr_dY6W4PI9D2kssDo6cIYVK_AsoT51CWzvhKWw";
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState("");
	const [areaSelect, setAreaSelect] = useState("");

	useEffect(async () => {
		await fetch("http://localhost:8001/drafts/" + id)
			.then(function (result) {
				console.log(result);
				return result.json();
			})
			.then(function (result) {
				setData(result);
				console.log(data);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		setTitle(data.title);
		setDetails(data.details);
		setAreaSelect(data.area);
	}, [loading]);

	const handleChange = (event) => {
		setAreaSelect(event.target.value);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Container>
				<Typography
					variant="h6"
					component="h2"
					gutterBottom
					color="textSecondary"
				>
					Create a new insight
				</Typography>
				<form noValidate autoComplete="off">
					<TextField
						onChange={(e) => setTitle(e.target.value)}
						sx={{
							mt: 1,
							mb: 1,
						}}
						value={title}
						name="title"
						className={classes.field}
						id="outlined-basic margin-normal"
						label="Title"
						helperText="Please enter a request title"
						color="secondary"
						fullWidth
						required
					/>
					<TextField
						onChange={(e) => setDetails(e.target.value)}
						sx={{
							mt: 1,
							mb: 1,
						}}
						value={details}
						className={classes.field}
						id="outlined-basic margin-normal"
						label="Details"
						color="secondary"
						helperText="Please enter in your request details"
						multiline
						rows={5}
						fullWidth
						required
					/>

					<FormControl
						fullWidth
						onChange={(e) => setAreaSelect(e.target.value)}
					>
						<InputLabel id="demo-simple-select-label">Area</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={areaSelect ? areaSelect : ""}
							label="Age"
							onChange={handleChange}
						>
							<MenuItem value="iOS">iOS</MenuItem>
							<MenuItem value="Android">Android</MenuItem>
							<MenuItem value="Web">Web</MenuItem>
						</Select>
					</FormControl>
				</form>
				<Button
					onClick={handleSubmit((e) => {
						fetch("http://localhost:8001/insights", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								title: title,
								details: details,
								area: areaSelect,
							}),
						}).then(
							fetch("http://localhost:8001/insights")
								.then((res) => res.json())
								.then((data) => {
									const insightId = data.slice(-1)[0].id;
									console.log(insightId);
									fetch(
										"https://cors-anywhere.herokuapp.com/https://api.productboard.com/notes",
										{
											method: "POST",
											headers: {
												"Content-Type": "application/json",
												"X-Version": 1,
												Authorization: bearerToken,
											},
											body: JSON.stringify({
												title: title,
												content: details,
												customer_email: "alexdegregori@gmail.com",
												display_url: "http://localhost:3000/",
												source: {
													origin: "Feedback form",
													record_id: insightId.toString(),
												},
												tags: [areaSelect],
											}),
										}
									)
										.then((response) => response.json())
										.then((data) => {
											const pbLink = data.links.html;
											fetch("http://localhost:8001/insights/" + insightId, {
												method: "PUT",
												headers: { "Content-Type": "application/json" },
												body: JSON.stringify({
													title,
													details,
													area: areaSelect,
													pbLink: pbLink,
												}),
											});
										})
										.then(
											fetch("http://localhost:8001/drafts/" + id, {
												method: "DELETE",
											})
										)
										.then(() => {
											history.push("/");
										});
								})
						);
					})}
					sx={{
						mt: 1,
						mb: 1,
					}}
					type="submit"
					color="primary"
					variant="contained"
					endIcon={<AddCircleOutlinedIcon />}
				>
					Submit
				</Button>
				<Button
					onClick={handleSubmit((e) => {
						fetch("http://localhost:8001/drafts/" + id, {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								title: title,
								details: details,
								area: areaSelect,
							}),
						}).then(() => history.push("/drafts"));
					})}
					sx={{
						mt: 1,
						mb: 1,
						ml: 1,
					}}
					type="submit"
					color="secondary"
					variant="contained"
					endIcon={<SnoozeRoundedIcon />}
				>
					Save Draft
				</Button>
			</Container>
		</div>
	);
}
