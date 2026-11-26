import { AdminPagination } from "../../components/AdminPagination";

export default function PetPagination({
  currentPage,
  totalPages,
  onFilterChange
}) {
  return (
    <AdminPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => onFilterChange?.((prev) => ({ ...prev, page }))}
    />
  )
}
