
export function getInitialUser() {
    if (window.lightdm.lock_hint) {
        let user = window.lightdm.users.find((user) => user.logged_in);
        if (user != undefined) {return user;}
    }

    if (this.settings.getSetting("defaultUser")) {
        let user = window.lightdm.users.find((user) => user.name === this.settings.getSetting("defaultUser"));    
        if (user != undefined) {return user;}
    }

    if (window.lightdm.select_user_hint !== undefined && window.lightdm.select_user_hint !== null) {
        let user = window.lightdm.users.find((user) => user.name === window.lightdm.select_user_hint);    
        if (user != undefined) {return user;}
    }

    return window.lightdm.users[0];
}

export function getInitalSession() {
    return (
        this.findSession(this.user.session) ||
        this.findSession(window.lightdm.default_session) ||
        window.lightdm.sessions[0]
    );
}

export function findSession(name) {
    if (name === undefined || name === null) {return false;}
    return window.lightdm.sessions.find((session) => (session.name.toLowerCase() === name.toLowerCase()) || (session.key.toLowerCase() === name.toLowerCase()));
}

export function getHostname() {
    return window.lightdm.hostname;
}

export function getWallpaperDir() {
    return "";
}

export function getWallpapers() {
    return "";
}

export function getLogos() {
    return "";
}