import primaryLogo from '@/assets/primary-logo.svg';

export default function CustomLogoSidebar() {
	return (
		<div className="p-[16px] border-b-[1px] border-ny-gray-200 flex justify-center">
			<img src={primaryLogo} alt="primary-logo" />
		</div>
	);
}
