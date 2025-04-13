import { BsArrowLeftCircle } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { Head, Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import { CgDanger } from "react-icons/cg";

function SignUpSTEP2({ InitialData }) {
    const { data, setData, errors, processing, post, reset } = useForm({
        nom: InitialData.nom,
        prenom: InitialData.prenom,
        password: InitialData.password,
        email: InitialData.email,
        promotion: "",
        filiere: "",
        etablissement: "",
        telephone: "",
        fonction: "",
        employeur: "",
    });


    const GoBack = () => {
        if (window.confirm(
            "Vous êtes sûr de retournez à l'étape 1 ?"
            +
            "\nQuand tu reviendras à l'étape 1, toutes les données que tu as saisies dans cette étape seront perdues."
        )) {
            window.history.back();
        }
    };









    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route("FinalRegister"), {
            onSuccess: () => {
                toast.success("Your account has been created successfully.");
            },
        });

        console.log(data);

    };

    const handleReset = () => {
        reset();
    };



    return (
        <div className=" bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <Head title={"Register 2"} />
            <div className="w-11/12">
                <button onClick={GoBack}>
                    <BsArrowLeftCircle size={35} color="black" />
                </button>
                <h1 className="mt-4 mb-6 font-bold text-4xl">Sign Up Now</h1>
                <p className="mb-4 font-bold text-black/50">Step Two of Two</p>
                <div className="bg-green-200 text-green-800 w-12 h-12 rounded-lg text-center py-2">
                    <span className="font-bold text-xl">2</span>
                </div>
                <form onSubmit={handleSubmit} method="post" className="mt-14">
                    <div className="flex flex-row space-x-5">
                        <div className="mb-4 w-1/2">

                            <InputLabel htmlFor="promotion" value="Promotion *" />
                            <TextInput
                                id="promotion"
                                type="text"
                                name="promotion"
                                placeholder="Enter your promotion"
                                value={data.promotion}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="promotion"
                                isFocused={true}
                            />
                            {(errors.promotion) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline " />
                                    <InputError message={errors.promotion} className="mt-2" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4 w-1/2" style={{ marginLeft: "5%" }}>
                            <InputLabel htmlFor="filiere" value="Filière *" />
                            <SelectInput
                                id="filiere"
                                name="filiere"
                                value={data.filiere}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                            >
                                <option value="" disabled={(data.filiere) ? true : false} >
                                    Choose Your Branche
                                </option>
                                <option value="Dev">Development Digital</option>
                                <option value="ID">Infrastructure Digital</option>
                                <option value="GEC">Gestion and Ecommerce</option>
                                <option value="AI">Artificial Intelligence</option>
                            </SelectInput>
                            {(errors.filiere) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline " />
                                    <InputError message={errors.filiere} className="mt-2" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div className="mb-4 w-1/2">
                            <InputLabel htmlFor="etablissement" value="Etablissement *" />
                            <TextInput
                                id="etablissement"
                                type="text"
                                name="etablissement"
                                placeholder="Enter your etablissement"
                                value={data.etablissement}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="etablissement"
                            />
                            {(errors.etablissement) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline " />
                                    <InputError message={errors.etablissement} className="mt-2" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4 w-1/2" style={{ marginLeft: "5%" }}>
                            <InputLabel htmlFor="telephone" value="Phone Number *" />
                            <TextInput
                                id="telephone"
                                type="text"
                                name="telephone"
                                placeholder="06 11-222-333"
                                value={data.telephone}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="telephone"
                            />
                            {(errors.telephone) && (
                                <div className="mt-2">
                                    <CgDanger className="text-red-600 inline " />
                                    <InputError message={errors.telephone} className="mt-2" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div className="mb-4 w-1/2">
                            <InputLabel htmlFor="fonction" value="Current Position (optionnelle)" />
                            <TextInput
                                id="fonction"
                                type="text"
                                name="fonction"
                                placeholder="Enter your Post Actuel"
                                value={data.fonction}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4 w-1/2" style={{ marginLeft: "5%" }}>
                            <InputLabel htmlFor="employeur" value="Entreprise (optionnelle)" />
                            <TextInput
                                id="employeur"
                                type="text"
                                name="employeur"
                                placeholder="Enter your Entreprise"
                                value={data.employeur}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between items-center mt-5">
                        <p className="text-gray-600">
                            Any Questions?{" "}
                            <Link
                                to={"/"}
                                className="text-gray-600 hover:underline"
                            >
                                Contact Us
                            </Link>
                        </p>
                        <div className="flex gap-3">
                            <button type="reset" className="px-4 py-2 bg-gray-300 text-[#1c150d] font-bold rounded-lg border border-gray-300 hover:opacity-80" onClick={handleReset} >Reset</button>
                            <button type="submit" className="px-4 py-2 bg-[black] text-[white] font-bold rounded-lg border border-[black] hover:opacity-80 disabled:cursor-not-allowed " disabled={processing} onClick={handleSubmit} >Continue</button>
                        </div>
                    </div>
                </form>
            </div>
            <button>
                <Toaster />
            </button>
        </div>
    );
};

export default SignUpSTEP2;
