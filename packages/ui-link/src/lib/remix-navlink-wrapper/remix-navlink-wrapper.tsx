import { NavLink } from "@remix-run/react";
import { RemixNavLinkProps } from "@remix-run/react/dist/components";
import { RefAttributes } from "react";

type RemixNavLinkWrapperProps = RemixNavLinkProps & RefAttributes<HTMLAnchorElement>;

export default function RemixNavLinkWrapper(props: RemixNavLinkWrapperProps) {
    return <NavLink {...props} />
}