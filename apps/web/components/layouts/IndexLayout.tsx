import Footer from "@components/common/footer";
import * as React from "react";
import { Seo as SeoMeta } from "types/sanity.objects";
// import Header from "../common/header";
import Seo from "../common/seo";
import { DEFAULT_SETTINGS } from "constants/siteSettings";
import { ScrollHeader } from "@components/common/ScrollHeader";
import { useState } from "react";
import { MobileMenuToggleButton } from "@components/common/navigation/MobileMenuToggle";
import MobileNav from "@components/common/navigation/MobileNav";
import { useFullscreenNavContext } from "@lib/providers/GlobalNavigationContext";
import { useDevice } from "lib/hooks/use-device";
interface Props {
  children?: React.ReactNode | React.ReactNode[];
  seo?: SeoMeta;
  isMobile?: any;
}

const IndexLayout = ({ seo, children, isMobile }: Props) => {
  const { seo: defaultSeo, mainNav, footerNav, socials } = DEFAULT_SETTINGS;
  const { isOpen, toggle, close } = useFullscreenNavContext();
  const { isTouchDevice, isDesktop } = useDevice();
  return (
    <>
      <Seo seo={seo} defaultSeo={defaultSeo} />
      <ScrollHeader navigation={mainNav} />
      {isTouchDevice && (
        <MobileMenuToggleButton open={isOpen} handleClick={toggle} />
      )}
      {children}
      <MobileNav navigation={mainNav} />
      <Footer footerNav={footerNav} socials={socials} />
    </>
  );
};

export default IndexLayout;
