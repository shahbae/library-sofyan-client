import { SidebarLayout } from "../components/fragments/sidebar";

export default function Dashboard() {
  return (
    <div>
        <SidebarLayout>
          <div className="">
            <h1 className="text-xl font-sans font-bold">Welcome to the Dashboard</h1>
            <p>This is the main content area.</p>
          </div>
        </SidebarLayout>
    </div>
  );
}
