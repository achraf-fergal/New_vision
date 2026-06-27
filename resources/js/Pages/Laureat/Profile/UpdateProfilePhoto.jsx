import { useEffect, useState } from "react";
import { Camera, User, Save, X, Edit2, Settings2, ImageUp } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useForm, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

function PhotoProfile() {
    const { user } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({ ...user });
    const [PreviewImage, setPreviewImage] = useState(
        data.imageSRC ? `/storage/${data.imageSRC}` : null
    );
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setData('imageSRC', user.imageSRC);
        setPreviewImage(user.imageSRC ? `/storage/${user.imageSRC}` : null);
    }, [user]);

    const handleDeletePhoto = async (e) => {
        e.preventDefault();
        post(
            route("laureat.profile.update", { deleteImage: true }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(t('profile_photo.success_delete'));
                    setPreviewImage(null);
                },
            }
        );
    };

    console.log(errors)

    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setData('imageSRC', file);
        }
    };

    const handleSubmitPhoto = async (e) => {
        e.preventDefault();
        post(route("laureat.profile.upload"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('profile_photo.success_update'));
                reset();
            },
            onError: (errors) => {
                if (errors.imageSRC) {
                    toast.error(t('profile_photo.error_format'));
                }
            },
        });
    };

    const handleCancel = () => {
        setPreviewImage(user.imageSRC ? `/storage/${user.imageSRC}` : null);
        setData('imageSRC', user.imageSRC);
    };

    return (
        <div
            className={`mb-6 mt-6 bg-white shadow sm:rounded-lg sm:p-8 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
            <h2 className="text-xl font-semibold mb-4">
                {t('profile_photo.title')}
            </h2>
            <div className="flex items-end gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-400">
                    {PreviewImage ? (
                        <img
                            src={PreviewImage}
                            alt={`${data.nom} ${data.prenom}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex justify-center items-center bg-gray-100">
                            <User className="h-16 w-16 text-gray-400" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    {PreviewImage && PreviewImage !== `/storage/${data.imageSRC}` && (
                        <button
                            onClick={handleSubmitPhoto}
                            className={`px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                            <Save className="h-4 w-4" />
                            {t('profile_photo.save_button')}
                        </button>
                    )}

                    <label
                        htmlFor="upload-photo"
                        className={`px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-950 cursor-pointer flex items-center gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                        {PreviewImage ? (
                            <>
                                <Settings2 className="h-4 w-4" />
                                {t('profile_photo.change_button')}
                            </>
                        ) : (
                            <>
                                <ImageUp className="h-4 w-4" />
                                {t('profile_photo.upload_button')}
                            </>
                        )}
                        <input
                            id="upload-photo"
                            type="file"
                            className="hidden"
                            onChange={handleChangePhoto}
                            accept="image/jpeg,image/jpg,image/png"
                        />
                    </label>

                    {data.imageSRC && PreviewImage === `/storage/${data.imageSRC}` && (
                        <button
                            onClick={handleDeletePhoto}
                            className={`px-4 py-2 text-sm font-semibold border border-red-600 rounded-lg text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                            <X className="h-4 w-4" />
                            {t('profile_photo.delete_button')}
                        </button>
                    )}

                    {PreviewImage && PreviewImage !== `/storage/${data.imageSRC}` && (
                        <button
                            onClick={handleCancel}
                            className={`px-4 py-2 text-sm font-semibold border border-red-600 rounded-lg text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                            <X className="h-4 w-4" />
                            {t('profile_photo.cancel_button')}
                        </button>
                    )}
                </div>
            </div>
            <Toaster position={i18n.language === 'ar' ? 'top-left' : 'top-right'} />
        </div>
    );
}

export default PhotoProfile;
