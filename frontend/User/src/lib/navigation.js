let navigateRef = null;

export const setNavigate = (navigate) => {
    navigateRef = navigate;
};

export const navigateTo = (path) => {
    if (navigateRef) {
        navigateRef(path);
    } else {
        console.warn("Navigate function is not set. Make sure to call setNavigate in your app.");
    }
};