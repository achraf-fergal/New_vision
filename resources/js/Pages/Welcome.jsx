import { Head, Link, usePage } from '@inertiajs/react';
import NavBar from './LandingPage/NavBar';
import Home from './LandingPage/Home';
import Footer from './LandingPage/Footer';
import Avis from './LandingPage/Avis';
import Contact from './LandingPage/Contact';

export default function Welcome({ auth , AvisLauraet }) {
    return (
        <>
            <Head>
                <title>Home</title>
                <link rel="icon" type="image/png" href="storage/OFPPT_Talk/logo_ofppt.png" />
            </Head>
            <NavBar auth={auth} />
            <Home/>
            <Avis Avis={AvisLauraet} auth={auth} />
            <Contact/>
            <Footer/>
        </>
    );
}
