export async function sendEmail(studentId: string) {
	try {
		const response = await fetch("/api/emails", {
			method: "POST",
			body: JSON.stringify({ studentId }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const error = await response.json();
			console.error("Failed to send email:", error);
			throw new Error(error.message || "Failed to send email");
		}

		const data = await response.json();

		console.log("Email sent successfully:", data);

		return { success: true, data };
		
	} catch (error) {
		console.error("Error sending email:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
