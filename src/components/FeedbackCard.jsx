import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

export default function FeedbackCard({ insight }) {
	return (
		<div>
			<Card>
				<CardHeader title={insight.title} subheader={"Area: " + insight.area} />
				<CardContent>
					<Typography variant="body1">{insight.details}</Typography>
				</CardContent>
			</Card>
		</div>
	);
}
