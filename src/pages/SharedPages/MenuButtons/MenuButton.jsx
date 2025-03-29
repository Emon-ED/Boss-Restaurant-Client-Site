import React from 'react';

const MenuButton = ({menuButton}) => {
    return (
        <div className='my-10 text-center'>
        <button className="uppercase btn btn-outline rounded-xl bg-black dark:text-black dark:bg-white text-white border-b-4 border-slate-700 dark:border-black">{menuButton}</button>
    </div>
    );
};

export default MenuButton;