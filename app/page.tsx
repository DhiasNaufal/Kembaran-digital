"use client";
import dynamic from "next/dynamic";

const MapCesium = dynamic(() => import("@/components/MapCesium"), {
  ssr: false,
});
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  cn,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import SideNavbar from "@/components/SideBar/side";
import { useRef, useState } from "react";

export default function Home() {
  const drawerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-screen">
      <div className="absolute inset-0 z-0 h-full">
        <MapCesium />
      </div>
      <div className="inset-0 z-10 p-4">
        <button onClick={toggleDrawer}>Open</button>
        <div
          className={`fixed top-0 left-0 h-full w-72 p-5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={toggleDrawer}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <SideNavbar />
        </div>
      </div>
    </div>
  );
}
