import { useEffect, useState } from "react";
import {
    User,
    Camera,
    Save,
    X,
    Edit2,
    Settings2,
    ImageUp,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "@inertiajs/react";

function PhotoProfile({ Admin }) {
    const { data, setData, post, processing, reset } = useForm({
        ...Admin
    });

    const [PreviewImage, setPreviewImage] = useState(
        Admin.imageSRC ? `/storage/${Admin.imageSRC}` : null
    );

    useEffect(() => {
        setData({ ...Admin });
        setPreviewImage(Admin.imageSRC ? `/storage/${Admin.imageSRC}` : null);
    }, [Admin]);

    const handleDeletePhoto = async (e) => {
        e.preventDefault();
        post(
            route("gestionnaire.profile", { deleteImage: true }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Votre Photo de Profile supprimée avec succès");
                    setPreviewImage(null);
                },
            }
        );
    };


    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);


            setData({ ...data, imageSRC: file });
        }
    };

    const handleSubmitPhoto = async (e) => {
        e.preventDefault();

        post(route("gestionnaire.profile.upload"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Votre Photo de Profile ajoutée avec succès");
                reset();
            },
            onError: (errors) => {
                if (errors.imageSRC) {
                    toast.error("La photo de profile doit être Image au format jpg, jpeg, ou png ");
                }
            },
        });
    };


    const handleCancel = () => {
        setPreviewImage(Admin.imageSRC ? `/storage/${Admin.imageSRC}` : null);
        setData({ ...Admin });
    };

    return (
        <div className="mb-6 bg-white shadow sm:rounded-lg sm:p-8">
            <h2 className="text-xl font-semibold mb-4">Photo de profil</h2>
            <div className="flex items-end gap-6">
                <div className="relative">
                    {PreviewImage ? (
                        <img
                            src={PreviewImage}
                            alt={`${Admin.nom} ${Admin.prenom}`}
                            className="w-32 h-32 rounded-full border-2 border-gray-400"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full border-2 border-gray-400 flex justify-center items-center">
                            <User className="h-16 w-16 text-gray-400" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    {PreviewImage && PreviewImage !== `/storage/${Admin.imageSRC}` && (
                        <button
                            onClick={handleSubmitPhoto}
                            className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Enregistrer
                        </button>
                    )}

                    <label
                        htmlFor="upload-photo"
                        className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-950 cursor-pointer flex items-center gap-2"
                    >
                        {PreviewImage ? (
                            <>
                                <Settings2 className="h-4 w-4" />
                                Changer la photo
                            </>
                        ) : (
                            <>
                                <ImageUp className="h-4 w-4" />
                                Upload Photo
                            </>
                        )}
                        <input
                            id="upload-photo"
                            type="file"
                            className="hidden"
                            onChange={handleChangePhoto}
                        />
                    </label>

                    {Admin.imageSRC && PreviewImage === `/storage/${Admin.imageSRC}` && (
                        <button
                            onClick={handleDeletePhoto}
                            className="px-4 py-2 text-sm font-semibold border border-red-600 rounded-lg text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            Supprimer
                        </button>
                    )}

                    {PreviewImage && PreviewImage !== `/storage/${Admin.imageSRC}` && (
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-semibold border border-red-600 rounded-lg text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2"
                        >
                            <X className="h-4 w-4" />
                            Annuler
                        </button>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default PhotoProfile;
