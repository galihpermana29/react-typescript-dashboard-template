import type { FormInstance, UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import { useState } from 'react';

import docIcon from '@/assets/icon/document-upload.png';

interface DraggerUploadI {
	profileImageURL?: string;
	formItemName?: string;
	form?: FormInstance<any>;
	limit?: number;
	className?: string;
}

const DraggerUpload = ({
	profileImageURL,
	form,
	formItemName,
	limit = 1,
	className,
}: DraggerUploadI) => {
	const [fileList, setFileList] = useState<UploadFile[]>(
		profileImageURL
			? [
					{
						uid: '-1',
						name: 'image.png',
						status: 'done',
						url: profileImageURL,
					},
			  ]
			: []
	);

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	const uploadButton = (
		<button
			type="button"
			className="flex flex-col justify-center items-center flex-grow px-[20px] gap-[10px] text-caption-2 text-ny-gray-300">
			<img src={docIcon} alt="icon" />
			<h1>Drop profile picture here or click here to browse file</h1>
		</button>
	);

	return (
		<div className={className}>
			<Upload
				className="dragger-upload !bg-white"
				beforeUpload={async (file) => {
					// const value = await form.getFieldsValue();
					// console.log(value, 'formmm?');
					// const newValue = { ...value, [formItemName]: file };
					form?.setFieldValue(formItemName, file);
					return false;
				}}
				listType="picture-card"
				fileList={fileList}
				onChange={handleChange}>
				{fileList.length === limit ? null : uploadButton}
			</Upload>
			<div className="text-caption-2 text-ny-gray-300 text-center mt-[10px]">
				Supported: JPEG, JPG, PNG, Max size: 2 MB
			</div>
		</div>
	);
};

export default DraggerUpload;
