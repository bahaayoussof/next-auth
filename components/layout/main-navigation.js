import Link from "next/link";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";

function MainNavigation() {
	const { data: session, status } = useSession();
	console.log(
		"file: main-navigation.js:7 ~ MainNavigation ~ session, status:",
		session,
		status
	);

	const logoutHandler = () => {
		signOut();
	};

	return (
		<header className={classes.header}>
			<Link href="/">
				<div className={classes.logo}>Next Auth</div>
			</Link>
			<nav>
				<ul>
					{!session && status === "unauthenticated" && (
						<li>
							<Link href="/auth">Login</Link>
						</li>
					)}
					{session && (
						<li>
							<Link href="/profile">Profile</Link>
						</li>
					)}
					<li>
						<button onClick={logoutHandler}>Logout</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
