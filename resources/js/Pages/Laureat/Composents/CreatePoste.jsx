
// import React, { useState } from "react";
// import { Image, X, Smile } from "lucide-react";
// import InputLabel from "@/Components/InputLabel";
// import TextInput from "@/Components/TextInput";
// import TextArea from "@/Components/TextArea";
// import { useForm, usePage } from "@inertiajs/react";



// const CreatePostDialog = ({ Open, Close, onSubmit }) => {
//     const {auth} = usePage().props;
//     const { data, setData, processing, post, errors } = useForm({
//         "photo":null,
//         "content" : "",
//         "dateSouvenir" : new Date(),
//         "laureat_id" : auth.user.id
//     });


//     const [tagInput, setTagInput] = useState("");
//     const [tags, setTags] = useState(['dev', 'web', 'react']);

//     // const showToast = (title, description, variant = "default") => {
//     //     console.log(`Toast: ${title} - ${description} (${variant})`);
//     //     // This would be replaced with a custom toast implementation
//     // };

//     const handleAddTag = (e) => {
//         if (e.key === "Enter" && tagInput.trim() !== "") {
//             e.preventDefault();
//             if (!tags.includes(tagInput.trim())) {
//                 setTags([...tags, tagInput.trim()]);
//             }
//             setTagInput("");
//         }
//     };

//     const handleRemoveTag = (tagToRemove) => {
//         setTags(tags.filter((tag) => tag !== tagToRemove));
//     };

//     const handleAddTags = (tag) => {
//         setTagInput(
//             tagInput + ' ' + tag
//         );
//         handleRemoveTag(tag);
//     };

//     // const handleSubmit = () => {
//     //     if (title.trim() === "") {
//     //         showToast(
//     //             "Title required",
//     //             "Please enter a title for your publication",
//     //             "destructive"
//     //         );
//     //         return;
//     //     }

//     //     setIsLoading(true);

//     //     // Simulate API call
//     //     setTimeout(() => {
//     //         const newPost = {
//     //             id: Date.now().toString(),
//     //             title,
//     //             content,
//     //             tags,
//     //             images: ["/placeholder.svg"],
//     //             author: {
//     //                 name: "John Doe",
//     //                 avatar: "/placeholder.svg",
//     //             },
//     //             createdAt: new Date(),
//     //         };

//     //         onSubmit(newPost);
//     //         setIsLoading(false);

//     //         // Reset form
//     //         setTitle("");
//     //         setContent("");
//     //         setTags([]);

//     //         Close();

//     //         showToast(
//     //             "Publication created",
//     //             "Your publication has been successfully created."
//     //         );
//     //     }, 1000);
//     // };

//     if (!Open) return null;


//     return (
//         <>
//             <div
//                 className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-200"
//                 onClick={Close}
//             />
//             <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg animate-scale-in rounded-lg overflow-hidden">
//                 <button
//                     className="absolute right-4 top-4 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none"
//                     onClick={Close}
//                 >
//                     <X className="h-4 w-4" />
//                 </button>

//                 <div className="flex flex-col space-y-1.5 text-center sm:text-left">
//                     <h2 className="text-xl font-semibold leading-none tracking-tight font-display">
//                         Create New Publication
//                     </h2>
//                 </div>

//                 <div className="space-y-4 py-2">
//                     <div className="space-y-2">
//                         <InputLabel htmlFor='content' value="Content" />

//                         <TextInput
//                             id="content"
//                             name="content"
//                             placeholder="Enter a descriptive content"
//                             value={data.content}
//                             className="mt-1 block w-full"
//                             autoComplete="off"
//                             maxLength={150}
//                             onChange={(e) => setData('content', e.target.value)}
//                         />

//                         <p className="text-xs text-slate-500 text-right">
//                             {data.content.length}/150 characters
//                         </p>
//                     </div>

//                     <div className="space-y-2">
//                         <InputLabel htmlFor='Photo' value="Photo" />
//                     </div>

//                     <div className="space-y-2">
//                         <InputLabel htmlFor='tags' value="Tags" />
//                         <div>
//                             <TextInput
//                                 id="tags"
//                                 placeholder="Add tags and press Enter"
//                                 value={tagInput}
//                                 onChange={(e) => setTagInput(e.target.value)}
//                                 onKeyDown={handleAddTag}
//                                 className="mt-1 block w-full"
//                             />
//                             {tags.length > 0 && (
//                                 <div className="flex flex-wrap gap-2 mt-2">
//                                     {tags.map((tag) => (
//                                         <>
//                                             <span key={tag} className={`inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-800 gap-1 cursor-pointer`} onClick={() => handleAddTags(tag)} >
//                                                 {tag}
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleRemoveTag(tag)}
//                                                     className="ml-1 rounded-full hover:bg-slate-200 p-0.5"
//                                                 >
//                                                     <X className="h-3 w-3" />
//                                                 </button>
//                                             </span>
//                                         </>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
//                     <button
//                         disabled={processing || data.content.trim() === ""}
//                         className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                     >
//                         {processing ? (
//                             <>
//                                 <div className="w-5 h-5 border-2 mx-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                 <span className="text-sm">Publishing...</span>
//                             </>

//                         ) : (
//                             "Publish"
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CreatePostDialog;




import React, { useState, useRef } from "react";
import { Image, X, Smile, Upload } from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";

const CreatePostDialog = ({ Open, Close, onSubmit }) => {
    const { auth } = usePage().props;
    const fileInputRef = useRef(null);
    const { data, setData, processing, post, errors } = useForm({
        "photo": null,
        "content": "",
        "dateSouvenir": new Date().toISOString(),
        "laureat_id": auth.user.id
    });

    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState(['dev', 'web', 'react']);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleAddTag = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleAddTags = (tag) => {
        setTagInput(
            tagInput + ' ' + tag
        );
        handleRemoveTag(tag);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setData('photo', file);
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    const handleRemovePhoto = () => {
        setData('photo', null);
        setPreviewUrl(null);
    };


    const handleSubmit = () => {
        post(route('poste.store'), {
            preserveScroll: true,
            onSuccess: () => {
                Close();
            }
        })
    }

    console.log(errors);



    if (!Open) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-200"
                onClick={Close}
            />
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg animate-scale-in rounded-lg overflow-hidden">
                <button
                    className="absolute right-4 top-4 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none"
                    onClick={Close}
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 className="text-xl font-semibold leading-none tracking-tight font-display">
                        Create New Publication
                    </h2>
                </div>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <InputLabel htmlFor='content' value="Content" />

                        <TextArea
                            id="content"
                            name="content"
                            placeholder="Enter a descriptive content"
                            value={data.content}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            maxLength={150}
                            onChange={(e) => setData('content', e.target.value)}
                        />

                        <p className="text-xs text-slate-500 text-right">
                            {data.content.length}/150 characters
                        </p>

                        {
                            errors.content && (
                                <InputError message={errors.content} />
                            )
                        }
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor='photo' value="Photo" />

                        <div className="mt-1">
                            <input
                                type="file"
                                id="photo"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            {!previewUrl ? (
                                <div
                                    onClick={handleClickUpload}
                                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors ${errors.photo ? 'border-red-500' : 'border-slate-300'}`}
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Upload className="h-8 w-8 text-slate-400" />
                                        <p className="text-sm font-medium">Click to upload photo</p>
                                        <p className="text-xs text-slate-500">JPEG, PNG, JPG or SVG (max. 2MB)</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative border border-slate-300 rounded-lg overflow-hidden m-1">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        className="absolute top-2 right-2 bg-black/70 rounded-full p-1 text-white hover:bg-black transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {errors.photo && (
                                <InputError message={errors.photo} />
                            )}

                        </div>
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor='tags' value="Tags" />
                        <div>
                            <TextInput
                                id="tags"
                                placeholder="Add tags and press Enter"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                className="mt-1 block w-full"
                            />
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold bg-slate-100 text-slate-800 gap-1 cursor-pointer" onClick={() => handleAddTags(tag)}>
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-1 rounded-full hover:bg-slate-200 p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    <button
                        disabled={processing || (data.content.trim() === "" && !data.photo)}
                        className="w-full h-12 bg-black text-white rounded-lg font-semibold hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        onClick={handleSubmit}
                    >
                        {processing ? (
                            <>
                                <div className="w-5 h-5 border-2 mx-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm">Publishing...</span>
                            </>
                        ) : (
                            "Publish"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreatePostDialog;
