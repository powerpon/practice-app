import { RemixNavLinkWrapper } from 'ui-link';
import { X_CLOSE_BUTTON_TEXT } from 'ui-shared';

export default function CloseButton() {
  return (
    <RemixNavLinkWrapper
      to=".."
      className="absolute top-2 right-2 px-3 cursor-pointer border-solid border-red-600 border rounded-full flex text-center bg-gray-200 text-red-600 text-lg"
    >
      {X_CLOSE_BUTTON_TEXT}
    </RemixNavLinkWrapper>
  );
}
