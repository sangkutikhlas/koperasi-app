export const detectOS = () => {
    const platform = navigator.platform;
    if (platform.indexOf('Win32') !== -1) return 'Win32';
    if (platform.indexOf('Mac') !== -1) return 'Mac';
    if (platform.indexOf('Linux') !== -1) return 'Linux';
    return 'Unknown';
}
