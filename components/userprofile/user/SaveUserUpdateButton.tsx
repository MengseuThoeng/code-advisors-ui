"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface SaveUserUpdateButtonProps {
  onSave?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  disabled?: boolean;
  disabledEdit?: boolean;
  disabledCancel?: boolean;
  disabledSave?: boolean;
}

export default function SaveUserUpdateButton({
  onSave,
  onCancel,
  onEdit,
  disabledEdit = false,
  disabledCancel = false,
  disabledSave = false,
}: SaveUserUpdateButtonProps) {
  return (
    <div className="flex justify-end">
      {/* Edit */}
      {disabledEdit && ( // Conditionally render the Edit button
        <button
          onClick={onEdit}
          className="bg-primary text-white px-4 py-2  rounded-sm"
        >
          <div className="w-full flex items-center justify-center gap-2">
            <p>កែប្រែ</p>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </button>
      )}
    </div>
  );
}
