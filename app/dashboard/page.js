
import Main from "@/components/Main";
import Loading from "@/components/Loading";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export const metadata =  {
    title: 'Swingss . Dashboard'
}
export default function DashboardPage() {
       
    return (
        <Main>
            <Dashboard />
        </Main>
    )
}