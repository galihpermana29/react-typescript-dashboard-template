export default function VendorProfileContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative">
			<div className="bg-ny-primary-500 h-44 w-full absolute top-0 rounded-xl" />

			{children}
		</div>
	);
}
