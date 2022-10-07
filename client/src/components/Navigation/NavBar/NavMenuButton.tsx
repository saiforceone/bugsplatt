import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {HiExclamation, HiMenu, HiUserGroup} from "react-icons/hi";
import {Link} from "react-router-dom";
import {GoReport, IoRocket} from "react-icons/all";
import {MdHelpCenter} from "react-icons/md";

export const NavMenuButton = () => {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button as="div" className="inline-flex w-full justify-center bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <HiMenu className="h-8 w-8 text-gray" />
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
          <div className="px-1 py-1 ">
            <div className="p-1">
              <Menu.Item>
                <Link className="flex items-center" to="/app/projects">
                  <IoRocket className="mr-2" />
                  Projects
                </Link>
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                <Link className="flex items-center" to="/app/issues">
                  <HiExclamation className="mr-2" />
                  Issues
                </Link>
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                <Link className="flex items-center" to="/app/teams">
                  <HiUserGroup className="mr-2"/>
                  Teams
                </Link>
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                <Link className="flex items-center" to="/app/help">
                  <MdHelpCenter className="mr-2"/>
                  Help & Support
                </Link>
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                <Link className="flex items-center" to="/app/reported-problems">
                  <GoReport className="mr-2"/>
                  Reported Problems
                </Link>
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}