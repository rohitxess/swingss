import Main from "@/components/Main";
import Loading from "@/components/Loading";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export const metadata =  {
    title: 'Swingss . Dashboard'
}
export default function DashboardPage() {
    
    const isAuthenticated = false;

    let children = (
        <Login />
    )

    if(isAuthenticated){
        let children =(
            <Dashboard />
        )
    }


    
    return (
        <Main>
           {children}
        </Main>
    )
}