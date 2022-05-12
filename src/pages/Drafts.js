import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Paper, Typography } from "@mui/material";
import FeedbackCard from "../components/FeedbackCard";
import { Link } from "react-router-dom";

export default function Insights() {
	const [insights, setInsights] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		fetch("http://localhost:8001/drafts")
			.then((res) => res.json())
			.then((data) => setInsights(data));
	}, []);

	useEffect(() => {
		if (insights.length > 0) {
			setDataLoaded(true);
		}
	});

	return (
		<div>
			<Container>
				{dataLoaded ? (
					<Grid container>
						{insights.map((insight) => (
							<Grid item xs={12} sm={12} md={12} key={insight.id}>
								<Paper
									sx={{
										m: 1,
									}}
								>
									<Link
										to={"/edit/" + insight.id}
										style={{ textDecoration: "none" }}
									>
										<FeedbackCard insight={insight} />
									</Link>
								</Paper>
							</Grid>
						))}
					</Grid>
				) : (
					<Typography variant="h4" align="center" sx={{ m: 10 }}>
						No drafts..
					</Typography>
				)}
			</Container>
		</div>
	);
}
