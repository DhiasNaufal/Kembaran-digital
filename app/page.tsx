"use client";
// import MapCesium from '@/components/MapCesium';
import dynamic from "next/dynamic";

// Gunakan dynamic import untuk menghindari masalah SSR
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
import { useRef } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const drawerRef = useRef(null);

  return (
    <div className="flex min-h-screen">
      <div className="absolute inset-0 z-0 h-full">
        <MapCesium />
      </div>
      <div className="inset-0 z-10 p-4">
        <Button onPress={onOpen}>Open </Button>
        <Drawer
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          disableAnimation={true}
          onOpenChange={onOpenChange}
          backdrop="transparent"
          placement="left"
          size="xs"
        >
          <DrawerContent className="pointer-events-auto">
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1"></DrawerHeader>
                <DrawerBody>
                  <SideNavbar />
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
