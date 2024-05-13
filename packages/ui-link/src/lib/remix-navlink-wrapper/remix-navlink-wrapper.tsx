import { NavLink } from "@remix-run/react";
import { RemixNavLinkProps } from "@remix-run/react/dist/components";
import { RefAttributes } from "react";

type Props = RemixNavLinkProps & RefAttributes<HTMLAnchorElement>;

export default function RemixNavLinkWrapper(props: Props) {
    return <NavLink {...props} />
}