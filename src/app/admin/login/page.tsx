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
import { EyeClosedIcon } from "lucide-react";

import React, { useState } from "react";

function login() {
	const [showPassword, setShowPassword] = useState(false);
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
								<Input id="admin" type="email" required={true} />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">password</Label>
								<Input
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
					<Button className="w-full">Login</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default login;
