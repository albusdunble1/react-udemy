import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';


export default function RootLayout() {

    const navigation = useNavigation();

    return (
        <>
            <MainNavigation />
            {/* use Fast 3G under Network in Chrome to see it clearly */}
            {navigation.state === "loading" && <h1>Loading LOL!</h1>}
            {navigation.state !== "loading" && <Outlet />}
            
        </>
    )
}