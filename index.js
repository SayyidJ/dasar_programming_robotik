const path = window.location.pathname;
if (path === "/") {
  window.location.href = "/build/";
} else {
  window.location.href = `/build${path}`;
}
