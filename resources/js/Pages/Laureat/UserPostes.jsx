import React from "react";
import Dashboard from "@/Layouts/DashboardLayout";
import MyPostDetail from "./Composents/MyPoste";

const MyPostes = ({ Postes }) => {

    return (
        <div className="pt-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className='text-2xl font-bold text-gray-800'>My Postes</h1>
                </div>
            </div>
            {
                Postes.map((poste, index) => (
                    <MyPostDetail key={index} Poste={poste} />
                ))
            }
        </div>
    );
};

MyPostes.layout = page => <Dashboard children={page} title={'MyPostes'} />;

export default MyPostes;
