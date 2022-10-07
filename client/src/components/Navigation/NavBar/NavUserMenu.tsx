import React, {FC, Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {HiLogout} from "react-icons/hi";
import {FECommonUserData} from "../../../interfaces";
import {UserCard} from "../../BaseComponents/UserCard/UserCard";

interface NavUserMenuProps {
  currentUser: FECommonUserData;
  logoutAction: () => void;
}

export const NavUserMenu: FC<NavUserMenuProps> = ({currentUser, logoutAction}) => {

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button as="div" className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <img alt="profile-image" src={currentUser.profilePicture} style={{height: '2rem', width: '2rem'}} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            <UserCard
              displayName={`${currentUser.firstName} ${currentUser.lastName}`}
              profileImage={currentUser.profilePicture}
              secondaryText={currentUser.emailAddress}
            />
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={logoutAction}
                >
                  <HiLogout className="h-6 w-6 text-gray mr-2" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
