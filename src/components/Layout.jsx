import {
	AppBar,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	ThemeProvider,
	Toolbar,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import IosShareIcon from "@mui/icons-material/IosShare";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";

const useStyles = makeStyles((theme) => {
	return {
		page: {},
		toolbar: theme.mixins.toolbar,
	};
});

export default function Layout({ children }) {
	const classes = useStyles();
	const history = useHistory();

	const menuItems = [
		{
			text: "My feedback",
			path: "/",
		},
		{
			text: "Drafts",
			path: "/drafts",
		},
	];

	return (
		<div>
			<AppBar>
				<Toolbar>
					<AppRegistrationRoundedIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						onClick={() => history.push("/")}
						sx={{
							mr: 2,
							display: {
								cursor: "pointer",
								xs: "none",
								md: "flex",
								fontWeight: 700,
								letterSpacing: ".05rem",
								color: "inherit",
								textDecoration: "none",
							},
						}}
					>
						Feedback Hub
					</Typography>
					<List
						sx={{
							display: "flex",
							flexDirection: "row",
							padding: 0,
							fontFamily: "Lato",
							whiteSpace: "nowrap",
						}}
					>
						{menuItems.map((item) => (
							<ListItem key={item.text} onClick={() => history.push(item.path)}>
								<ListItemButton sx={{ borderRadius: 2 }}>
									{item.text}
								</ListItemButton>
							</ListItem>
						))}
						<ListItem>
							<ListItemButton
								key={"sendInsight"}
								sx={{ borderRadius: 2 }}
								onClick={() => history.push("/create")}
							>
								<IosShareIcon />
								Send insight
							</ListItemButton>
						</ListItem>
					</List>
				</Toolbar>
			</AppBar>
			<div>
				<div className={classes.toolbar}></div>
				<div className={classes.page}>{children}</div>
			</div>
		</div>
	);
}
