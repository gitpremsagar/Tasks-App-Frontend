export const metadata = {
  title: "Dashboard",
  description: "Task management dashboard ",
};

export default function DashboardLayout({ children }) {
  return <main className="min-h-screen">{children}</main>;
}
