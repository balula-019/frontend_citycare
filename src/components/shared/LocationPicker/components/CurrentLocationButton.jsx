import { memo } from 'react';
import { Loader2, Navigation } from 'lucide-react';

/**
 * "Use my current location" button.
 * Props: onClick, isLocating, disabled
 */
const CurrentLocationButton = memo(function CurrentLocationButton({
  onClick,
  isLocating,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLocating || disabled}
      aria-label="Use my current location"
      className="lp-locate-btn"
    >
      {isLocating ? (
        <Loader2 size={13} className="animate-spin" />
      ) : (
        <Navigation size={13} />
      )}
      {isLocating ? 'Locating…' : 'Use My Location'}
    </button>
  );
});

export default CurrentLocationButton;