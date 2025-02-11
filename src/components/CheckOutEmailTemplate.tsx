import { Html, Heading } from "@react-email/components";
import * as React from "react";

export const CheckOutEmailTemplate = (firstName: string) => (
	<Html>
		<Heading>Your children, {firstName} has left in campus.</Heading>
	</Html>
);
