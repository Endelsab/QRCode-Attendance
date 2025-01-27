import QRCode from "react-qr-code";

export default function GenerateQRCode() {
	return (
		<div className="min-h-screen flex justify-center items-center">
			<div style={{ background: "white", padding: "16px" }}>
				<QRCode value="wendel sabayo" />
			</div>
		</div>
	);
}
