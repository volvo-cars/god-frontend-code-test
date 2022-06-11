import React from "react";
import { LinkProps } from "vcc-ui/dist/components/link";
import { Link } from "vcc-ui";
import NextJsLink from "next/link";

interface NextLinkProps extends LinkProps {
  href: string;
}

/**
 * The purpose of this component is to utilize NextJsLink, speed up the client-side transitions between routes.
 * Instead of hard-refreshing the entire html.
 */
export default function NextLink({ children, href, ...rest }: NextLinkProps) {
  return (
    <NextJsLink href={href} passHref={true}>
      <Link {...rest}>{children}</Link>
    </NextJsLink>
  );
}
