import VendorInformation from './view/presentations/VendorInformation';
import VendorProfilePicture from './view/presentations/VendorProfilePicture';
import VendorBasicDetails from './view/presentations/VendorBasicDetails';
import VendorProfileHeader from './view/presentations/VendorProfileHeader';
import VendorAdditionalDetails from './view/presentations/VendorAdditionalDetails';
import VendorAlbum from './view/presentations/VendorAlbum';
import VendorProfileContainer from './view/container/VendorProfileContainer';

const VendorDashboardContainer = () => {
	return (
		<VendorProfileContainer>
			<main className="flex flex-col gap-12 px-8 relative">
				<VendorInformation />

				<VendorProfileHeader />

				<hr className="w-full" />

				<VendorProfilePicture />

				<hr className="w-full" />

				<VendorBasicDetails />

				<hr className="w-full" />

				<VendorAdditionalDetails />

				<hr className="w-full" />

				<VendorAlbum />
			</main>
		</VendorProfileContainer>
	);
};

export default VendorDashboardContainer;
