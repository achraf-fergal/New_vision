import { Head, Link, usePage } from '@inertiajs/react';
import NavBar from './LandingPage/NavBar';
import Home from './LandingPage/Home';
import Contact from './LandingPage/Contact';

export default function Welcome({ auth , AvisLaureat , LaureatActivity }) {
    console.log(AvisLaureat);
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <NavBar auth={auth} />
            <Home/>

        </>
    );
}
