import type { Metadata } from "@/shared/models/generalInterfaces"
import { Pagination, Row, type PaginationProps } from "antd";

export default function DashboardTableFooter({ metadata, paginationProps }: { metadata: Metadata | undefined, paginationProps: PaginationProps }) {
    if (!metadata) return (
        <Row justify="end">
            <Pagination {...paginationProps} />
        </Row>
    );

    const { current_page, limit, total_items } = metadata;

    return (
        <Row justify="space-between">
            <span>Showing {(current_page - 1) * limit + 1} to {current_page * limit < total_items ? current_page * limit : total_items} of {total_items} entries</span>
            <Pagination {...paginationProps} />
        </Row>
    );
}
