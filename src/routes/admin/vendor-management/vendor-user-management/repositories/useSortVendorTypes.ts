import type { BaseOptionType } from 'antd/es/select';

export default function useSortVendorTypes(
  optionA: BaseOptionType,
  optionB: BaseOptionType
) {
  return (optionA?.label ?? '')
    .toLowerCase()
    .localeCompare((optionB?.label ?? '').toLowerCase());
}
