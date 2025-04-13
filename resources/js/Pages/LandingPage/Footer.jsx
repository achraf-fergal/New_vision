import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
    const handleNavigation = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }

    };

    return (
        <div className="bg-gray-100">
            <footer className="w-full bg-gray-900 text-white py-16 rounded-t-3xl">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div>
                            <div className="flex items-center mb-6 cursor-pointer" onClick={(e) => handleNavigation(e, "home")}>
                                <img src={"storage/OFPPT_Talk/logo.png"} alt="OFPPT Logo" className="h-8 w-auto" />
                                <span className="ml-2 text-xl font-bold">Copains d&apos;avant</span>
                            </div>
                            <p className="text-gray-400">
                                La plateforme de networking des lauréats de l&apos;OFPPT
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Navigation</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a

                                        className="text-gray-400 hover:text-white transition-colors"
                                        onClick={(e) => handleNavigation(e, "home")}
                                        href="#home"
                                    >Accueil</a>
                                </li>
                                <li>
                                    <a
                                        className="text-gray-400 hover:text-white transition-colors"
                                        onClick={(e) => handleNavigation(e, "avis")}
                                        href="#avis"
                                    >Avis</a>
                                </li>
                                <li>
                                    <a
                                        className="text-gray-400 hover:text-white transition-colors"
                                        onClick={(e) => handleNavigation(e, "contact")}
                                        href="#contact"
                                    >Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Légal</h3>
                            <ul className="space-y-4">
                                <li><a href="Confiden" className="text-gray-400 hover:text-white transition-colors">Confidentialité</a></li>
                                <li><a href="Conditions" className="text-gray-400 hover:text-white transition-colors">Conditions</a></li>
                                <li><a href="Cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-6">Suivez-nous</h3>
                            <ul className="space-y-4">
                                <li><Facebook size={20} strokeWidth={2} className="inline mr-2 text-gray-400" /><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                                <li><Instagram size={20} strokeWidth={2} className="inline mr-2 text-gray-400" /><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                                <li><Twitter size={20} strokeWidth={2} className="inline mr-2 text-gray-400" /><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer >
        </div>
    );
}

export default Footer;
