import {
    Permission,
    PermissionsAndroid,
    Platform,
} from 'react-native';

export default async function getAudioPermissions() {
    if (Platform.OS !== 'android') {
        // For iOS and other platforms, no change is needed
        return true;
    }

    try {
        const permissionsToRequest: Permission[] = [];

        if (Platform.Version >= 33) {
            permissionsToRequest.push(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            );
        } else {
            permissionsToRequest.push(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            if (Platform.Version < 29) {
                permissionsToRequest.push(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );
            }
        }

        // Add RECORD_AUDIO to the list of permissions to request
        permissionsToRequest.push(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );

        const grantedPermissions = await PermissionsAndroid.requestMultiple(
            permissionsToRequest,
        );

        // Check if all requested permissions were granted
        const allPermissionsGranted = permissionsToRequest.every(
            (permission) => grantedPermissions[permission] === PermissionsAndroid.RESULTS.GRANTED,
        );

        console.log('All permissions granted:', allPermissionsGranted);
        return allPermissionsGranted;

    } catch (err) {
        console.warn('Permission request error:', err);
        return false;
    }
}