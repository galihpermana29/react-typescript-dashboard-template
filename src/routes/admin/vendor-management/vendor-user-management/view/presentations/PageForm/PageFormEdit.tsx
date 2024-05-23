import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { DatePicker, Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { FormRow } from './FormRow';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';

interface IFormCreate {
	form: FormInstance;
	onSave: any;
	onCancel: () => void;
	id: string;
	disabled: boolean;
	showEditButton?: boolean;
}

export const PageFormEdit = ({
	form,
	onSave,
	onCancel,
	disabled = false,
	showEditButton = false,
	id,
}: IFormCreate) => {
	return (
		<Form
			form={form}
			onFinish={(val) => onSave({ payload: val, type: 'edit', id })}
			layout="vertical"
			disabled={disabled}
			className="flex flex-col gap-5">
			<PageHeader
				title="Profile Details"
				onCancel={onCancel}
				id={id}
				showEditButton={showEditButton}
			/>

			<FormRow
				title="Profile Picture"
				description="This will be displayed on your profile">
				<Form.Item noStyle name={'profile_image_uri'}>
					<DraggerUpload
						form={form}
						formItemName="profile_image_uri"
						profileImageURL={form.getFieldValue('profile_image_uri')}
					/>
				</Form.Item>
			</FormRow>

			<FormRow
				title="Basic Details"
				description="Set your basic profile details">
				<Form.Item
					className="my-[8px]"
					name={'email'}
					label="Email"
					rules={[
						{
							required: true,
							message: 'Please input your email!',
						},
						{
							type: 'email',
							message: 'The input is not valid email',
						},
					]}>
					<Input
						placeholder="Enter your detail here!"
						className="text-caption-1"
					/>
				</Form.Item>
				<Form.Item
					className="my-[8px]"
					name={'name'}
					label="Name"
					rules={[
						{
							required: true,
							message: 'Please input your name!',
						},
					]}>
					<Input
						placeholder="Enter your detail here!"
						className="text-caption-1"
					/>
				</Form.Item>
				<Form.Item
					className="my-[8px]"
					name={'date_of_birth'}
					label="Date of Birth"
					rules={[
						{
							required: true,
							message: 'Please input your date of birth!',
						},
					]}>
					<DatePicker
						placeholder="Enter your detail here!"
						className="text-caption-1 w-full"
					/>
				</Form.Item>
			</FormRow>

			<FormRow
				title="Additional Details"
				description="Set your additional details to your profile">
				<div className="flex flex-col w-full">
					<Form.Item
						className="my-[8px]"
						name={'vendor_description'}
						label="Vendor Description"
						rules={[
							{
								required: true,
								message: 'Please input vendor description!',
							},
						]}>
						<TextArea
							placeholder="Enter a description ..."
							className="text-caption-1"
							style={{ height: 120, resize: 'none' }}
						/>
					</Form.Item>
					<div className="flex w-full gap-2">
						<Form.Item
							className="my-[8px] w-full"
							name={'vendor_location'}
							label="Vendor Location"
							rules={[
								{
									required: true,
									message: 'Please select vendor location!',
								},
							]}>
							<Select
								options={[
									{ label: 'Bali', value: 'bali' },
									{ label: 'Jakarta', value: 'jakarta' },
								]}
								placeholder="Enter your detail here!"
								className="text-caption-1"
							/>
						</Form.Item>
						<Form.Item
							className="my-[8px] w-full"
							name={'vendor_type'}
							label="Vendor Type"
							rules={[
								{
									required: true,
									message: 'Please select vendor type!',
								},
							]}>
							<Select
								options={[
									{ label: 'Wedding', value: 'wedding' },
									{ label: 'Catering', value: 'catering' },
								]}
								placeholder="Enter your detail here!"
								className="text-caption-1"
							/>
						</Form.Item>
					</div>
				</div>
			</FormRow>

			<FormRow
				title="Album"
				description="Set your additional photo to your album">
				<Form.Item noStyle name={'vendor_album'}>
					<DraggerUpload
						form={form}
						formItemName="vendor_album"
						limit={10}
						profileImageURL={form.getFieldValue('vendor_album')}
					/>
				</Form.Item>
			</FormRow>
		</Form>
	);
};