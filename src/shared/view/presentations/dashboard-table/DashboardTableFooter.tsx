import type { Metadata } from "@/shared/models/generalInterfaces"

export default function DashboardTableFooter({metadata}: {metadata: Metadata}) {
    const { current_page, limit, total_items } = metadata;

    return <span>Showing {(current_page - 1) * limit + 1} to {current_page * limit < total_items ? current_page * limit : total_items} of {total_items} entries</span>
}
