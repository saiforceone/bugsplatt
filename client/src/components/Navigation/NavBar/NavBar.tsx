import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {Menu, Transition} from "@headlessui/react";
import {useCurrentUser} from "../../../hooks/useCurrentUser";
import {HiLogout, HiUserCircle} from "react-icons/hi";
import {DefaultButton} from "../../BaseComponents/DefaultButton/DefaultButton";
import {NavUserMenu} from "./NavUserMenu";
import {NavMenuButton} from "./NavMenuButton";
import {ActionDialogModal} from "../../Modals/ActionDialogModal/ActionDialogModal";

export const NavBar = () => {
  const currentUser = useCurrentUser();

  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const {logout} = useAuth0();

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">🐞 BugSplatt!</span>
        </Link>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto" id="mobile-menu-2">
          <ul
            className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              <Link to="/app">Dashboard</Link>
            </li>
            <li>
              <Link to="/app/projects">Projects</Link>
            </li>
            <li>
              <Link to="/app/issues">Issues</Link>
            </li>
            <li>
              <Link to="/app/teams">Teams</Link>
            </li>
            <li>
              <Link to="/app/help">Help & Support</Link>
            </li>
            <li>
              <Link to="/app/reported-problems">Reported Problems</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <div className="md:hidden mr-4">
            <NavMenuButton />
          </div>
          {currentUser.currentUser && (
            <NavUserMenu currentUser={currentUser.currentUser} logoutAction={() => setShowLogoutPrompt(true)} />
          )}
        </div>
        <ActionDialogModal
          actionInProgress={false}
          dialogActions={<>
            <DefaultButton active extraCss="mr-2 bg-slate-600" label="No" onClick={() => setShowLogoutPrompt(false)} />
            <DefaultButton active onClick={() => logout()} label="Yes" />
          </>}
          dialogContent="You are about to logout. Would you like to continue?"
          modalHeaderProps={{
            title: 'Logout?',
            onClose: () => setShowLogoutPrompt(false),
          }}
          visible={showLogoutPrompt}
        />
      </div>
    </nav>
  );
}