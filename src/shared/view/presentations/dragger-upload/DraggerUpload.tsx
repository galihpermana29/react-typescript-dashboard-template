import type { FormInstance, UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import { useState } from 'react';

import docIcon from '@/assets/icon/document-upload.png';

interface DraggerUploadI {
	data?: any;
	formItemName: string;
	form: FormInstance<any>;
}

const DraggerUpload = ({ data, form, formItemName }: DraggerUploadI) => {
	const [fileList, setFileList] = useState<UploadFile[]>(
		data
			? [
					{
						uid: '-1',
						name: 'image.png',
						status: 'done',
						url: data.photo,
					},
			  ]
			: []
	);

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	const uploadButton = (
		<button
			type="button"
			className="flex flex-col justify-center items-center px-[20px] gap-[10px] text-caption-2 text-ny-gray-300">
			<img src={docIcon} alt="icon" />
			<h1>Drop profile picture here or click here to browse file</h1>
		</button>
	);

	return (
		<div>
			<Upload
				className="dragger-upload !bg-white"
				beforeUpload={async (file) => {
					const value = await form.getFieldsValue();
					const newValue = { ...value, [formItemName]: file };

					form.setFieldValue(formItemName, newValue);
					return false;
				}}
				listType="picture-card"
				fileList={fileList}
				onChange={handleChange}>
				{fileList.length === 1 ? null : uploadButton}
			</Upload>
			<div className="text-caption-2 text-ny-gray-300 text-center mt-[10px]">
				Supported: JPEG, JPG, PNG, Max size: 2 MB
			</div>
		</div>
	);
};

export default DraggerUpload;
