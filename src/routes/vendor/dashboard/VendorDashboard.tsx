import VendorInformation from './view/presentations/VendorInformation';
import VendorProfilePicture from './view/presentations/VendorProfilePicture';
import VendorBasicDetails from './view/presentations/VendorBasicDetails';
import VendorProfileHeader from './view/presentations/VendorProfileHeader';
import VendorAdditionalDetails from './view/presentations/VendorAdditionalDetails';
import VendorAlbum from './view/presentations/VendorAlbum';
import VendorProfileContainer from './view/container/VendorProfileContainer';
import { Divider } from 'antd';

const VendorDashboardContainer = () => {
	return (
		<VendorProfileContainer>
			<main className="flex flex-col gap-12 px-8 relative">
				<VendorInformation />
				<VendorProfileHeader />
				<Divider className="my-[10px]" />
				<VendorProfilePicture />
				<Divider className="my-[10px]" />
				<VendorBasicDetails />
				<Divider className="my-[10px]" />
				<VendorAdditionalDetails />
				<Divider className="my-[10px]" />

				<VendorAlbum />
			</main>
		</VendorProfileContainer>
	);
};

export default VendorDashboardContainer;
