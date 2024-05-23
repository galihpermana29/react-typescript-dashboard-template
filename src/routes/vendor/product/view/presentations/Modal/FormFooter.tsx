import { Divider } from "antd";

interface IFormFooter {
    primaryText: string;
    primaryProps: any;
    secondaryText: string;
    secondaryProps: any;
}

const FormFooter = ({
    primaryText,
    primaryProps,
    secondaryText,
    secondaryProps
}: IFormFooter) => {
    return (
        <>
            <Divider className="my-[20px]" />
            <div className="flex gap-[20px] w-full">
                <button
                    type="button"
                    {...secondaryProps}
                    className="flex-1 rounded-[8px] h-[40px] bg-ny-primary-100 text-ny-primary-500 text-body-2 font-[400]">
                    {secondaryText}
                </button>
                <button
                    {...primaryProps}
                    className="flex-1 rounded-[8px] h-[40px] bg-ny-primary-500 text-white text-body-2 font-[400]">
                    {primaryText}
                </button>
            </div>
        </>
    )
}

export default FormFooter