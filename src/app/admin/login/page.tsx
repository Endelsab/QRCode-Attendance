"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, Loader2Icon } from "lucide-react";

import React, { useState } from "react";

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);

	return (
		<div className=" min-h-screen flex items-center justify-center">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-4xl">Admin Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="admin">email</Label>
								<Input
									id="admin"
									type="email"
									required={true}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">password</Label>
								<Input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type={showPassword ? "text" : "password"}
									required={true}
									id="password"
								/>
								<EyeClosedIcon
									onClick={() => setShowPassword(!showPassword)}
									size={20}
								/>
							</div>
						</div>
					</form>
				</CardContent>

				<CardFooter className="flex justify-center">
					{submitting ? (
						<Loader2Icon className="size-4 mr-2 animate-spin" />
					) : (
						<Button>Login</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}

export default Login;
