import { Form, FormProps } from "@remix-run/react";

type Props = FormProps & React.RefAttributes<HTMLFormElement>;

export default function RemixFormWrapper(props: Props) {
    return <Form {...props} >{props.children}</Form>;
}