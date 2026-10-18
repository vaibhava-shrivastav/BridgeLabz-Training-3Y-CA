function checkHomeSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Either open entry point makes the home unsafe.
  const hasOpenEntryPoint = !isDoorLocked || !isWindowClosed;
  const isSecure = isAlarmOn && isOwnerInside && !hasOpenEntryPoint;

  console.log(isSecure ? "Secure" : "Unsafe");
}

// Try a fully secured home and then a home with an unlocked door.
checkHomeSecurity(true, true, true, true);
checkHomeSecurity(false, true, true, true);
