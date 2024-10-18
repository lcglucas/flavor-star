import { useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import Logo from "../../assets/logo.png";
import { UserContext } from "../../context/UserContext";
import { classNames } from "../../utils/classNames";

const navigation = [
  { name: "Restaurants", href: "#", current: true },
  { name: "Owners", href: "#", current: false },
];

const Header = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(UserContext);

  const profileOptions = [
    { name: "Your Profile", href: "#", action: () => null },
    { name: "Sign out", href: "#", action: () => onLogout() },
  ];

  const onLogout = () => {
    logout();
    navigate("/signin");
  };

  const getUserInitials = () => {
    if (user?.full_name) {
      const nameArray = user.full_name.split(" ");
      if (nameArray.length > 0) {
        return (
          nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
        );
      } else {
        return nameArray[0].charAt(0) + nameArray[0].charAt(1);
      }
    }

    return "";
  };

  const UserInitials = () => {
    return (
      <div className="bg-gray-600 text-white font-semibold rounded-full p-1 w-8 h-8 flex justify-center items-center">
        {getUserInitials()}
      </div>
    );
  };

  const UserName = () => {
    return (
      <>
        <div className="text-base font-medium text-gray-800">
          {user?.full_name}
        </div>
        <div className="text-sm font-medium text-gray-500">{user?.email}</div>
      </>
    );
  };

  return (
    <Disclosure as="nav" className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src={Logo}
                className="block h-16 w-auto"
              />
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <UserInitials />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="px-4 py-2 text-sm border-b">
                  <UserName expanded />
                </div>
                {profileOptions.map((item) => (
                  <MenuItem key={item.name}>
                    <button
                      onClick={item.action}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-left"
                    >
                      {item.name}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <UserInitials />
            </div>
            <div className="ml-3">
              <UserName />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            {profileOptions.map((item) => (
              <DisclosureButton
                key={item.name}
                as="button"
                onClick={item.action}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full text-left"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
