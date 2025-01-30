import { Html, Heading } from "@react-email/components";
import * as React from "react";

export const EmailTemplate = (firstName: string) => (
	<Html>
		<Heading>Your children, {firstName} has entered in campus.</Heading>
	</Html>
);
