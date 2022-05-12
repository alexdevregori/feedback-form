import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import FeedbackCard from "../components/FeedbackCard";
import { Link } from "react-router-dom";

export default function Insights() {
	const [insights, setInsights] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8001/insights")
			.then((res) => res.json())
			.then((data) => setInsights(data));
	}, []);
	return (
		<div>
			<Container>
				<Grid container>
					{insights.map((insight) => (
						<Grid item xs={12} sm={12} md={12} key={insight.id}>
							<Paper
								sx={{
									m: 1,
								}}
							>
								<a
									href={insight.pbLink}
									style={{ textDecoration: "none" }}
									target="_blank"
								>
									<FeedbackCard insight={insight} />
								</a>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}
