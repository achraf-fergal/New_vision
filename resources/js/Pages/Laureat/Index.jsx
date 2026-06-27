import { useState, useEffect } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Dashboard from "@/Layouts/DashboardLayout";
import UserInfoCard from "./Composents/UserCard";
import PostFeed from "./Composents/Postes";
import CreatePostDialog from "./Composents/CreatePoste";

function Index({ User, isScrolled, createPostOpen, setCreatePostOpen, searchQuery, ActiveFilter }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { Postes, Categorie } = usePage().props;

    return (
        <div className={`py-8 ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="mb-8 flex items-end">
                <h1 className="text-2xl font-bold text-gray-800">
                    {t('all_posts')}
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                    <PostFeed
                        Postes={Postes}
                        ActiveFilter={ActiveFilter ? ActiveFilter : null}
                    />
                </div>

                <div className="hidden lg:block lg:col-span-4">
                    <UserInfoCard
                        isScrolled={isScrolled}
                        User={User}
                    />
                </div>
            </div>

            {createPostOpen && (
                <CreatePostDialog
                    Open={createPostOpen}
                    Close={() => setCreatePostOpen(false)}
                />
            )}
        </div>
    );
}

Index.layout = page => <Dashboard children={page} title={'Postes'} />;

export default Index;
