"use client";

import { Button } from "@/components/ui/Button";

type NavigationButtonsProps = {
  onPrevious?: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
  showPrevious?: boolean;
  nextDisabled?: boolean;
};

export function NavigationButtons({
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  showPrevious = true,
  nextDisabled = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-3">
      {showPrevious && onPrevious ? (
        <>
          <Button variant="secondary" onClick={onPrevious} className="flex-1">
            {previousLabel}
          </Button>
          <Button
            variant="primary"
            onClick={onNext}
            disabled={nextDisabled}
            className="flex-[1.4]"
          >
            {nextLabel}
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          fullWidth
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
