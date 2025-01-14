export function getAvatarInitials(username) {
  if (!username) {
    return "";
  }

  const names = username.split(" ");
  let initials = names.map((name) => name.charAt(0).toUpperCase()).join("");

  return names.length > 1 ? initials : names[0].charAt(0).toUpperCase();
}
