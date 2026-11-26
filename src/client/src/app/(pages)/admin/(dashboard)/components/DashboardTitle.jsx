export const DashboardTitle = ({ title }) => {
  if (!title) return null;

  return (
    <>
      <h1 className="text-[32px] font-bold text-[var(--main-color)]">{title}</h1>
    </>
  )
}
