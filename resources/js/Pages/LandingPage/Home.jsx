import { Link } from "@inertiajs/react";
import { CircleArrowRight } from "lucide-react";

export default function Home() {

    return (
        <>
            <section id="home" className="w-full pt-56 pb-32 p-4 bg-gray-100 sm:px-6 lg:px-8  ">
                <div className="grid grid-cols-4 gap-4  items-center">
                    <div className="w-full max-w-8xl mx-auto mb-8 col-span-2">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className=" bg-black bg-clip-text text-transparent">
                                    Retrouvez vos anciens camarades de l&apos;OFPPT
                                </span>
                            </h1>
                            <p className="text-gray-600 text-lg mb-8">
                                - Rejoignez la lus grande communauté des lauréats de l&apos;OFPPT.
                                <br />
                                - Partagez vos souvenirs, retrouvez vos amis et développez votre réseau professionnel.
                            </p>
                            <Link
                                href={route('login')}
                                className="flex gap-4"
                            >
                                <button
                                    className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                                >
                                    Commencer maintenant <CircleArrowRight className=" ms-2 inline" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className=" col-span-2">
                        <main className="w-full h-96 max-w-8xl mx-auto">
                            <img
                                className="w-full h-full object-cover rounded-lg mb-8"
                                src={'storage/OFPPT_Talk/Background.png'}
                                alt="Illustration de la communauté des lauréats de l'OFPPT"
                            />
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}
