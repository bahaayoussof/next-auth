import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthForm from "../components/auth/auth-form";
import { useEffect, useState } from "react";

function AuthPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getSession().then(session => {
			if (session) {
				router.replace("/");
			} else {
				setIsLoading(false);
			}
		});
	}, [router]);

	if (isLoading) {
		return <p className="center">Loading...</p>;
	}

	return <AuthForm />;
}

export default AuthPage;
